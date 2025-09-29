import React, { useState, useEffect } from 'react';
import { MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Question {
  id: string;
  question: string;
  created_at: string;
  profiles: {
    display_name?: string;
    avatar_url?: string;
  };
  product_answers: Array<{
    id: string;
    answer: string;
    is_admin: boolean;
    created_at: string;
    profiles: {
      display_name?: string;
      avatar_url?: string;
    };
  }>;
}

interface QAProps {
  productId: string;
}

const ProductQA: React.FC<QAProps> = ({ productId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [answerText, setAnswerText] = useState<{ [key: string]: string }>({});
  const { user } = useAuth();

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('product_questions')
        .select(`
          *,
          profiles!product_questions_user_id_fkey(display_name, avatar_url),
          product_answers(
            id,
            answer,
            is_admin,
            created_at,
            profiles!product_answers_user_id_fkey(display_name, avatar_url)
          )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestions(data as any || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [productId]);

  const submitQuestion = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to ask a question",
        variant: "destructive"
      });
      return;
    }

    if (!newQuestion.trim()) return;

    try {
      const { error } = await supabase
        .from('product_questions')
        .insert({
          product_id: productId,
          user_id: user.id,
          question: newQuestion.trim()
        });

      if (error) throw error;

      toast({
        title: "Question submitted",
        description: "Your question has been posted!"
      });

      setShowAskQuestion(false);
      setNewQuestion('');
      fetchQuestions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const submitAnswer = async (questionId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to answer",
        variant: "destructive"
      });
      return;
    }

    const answer = answerText[questionId]?.trim();
    if (!answer) return;

    try {
      const { error } = await supabase
        .from('product_answers')
        .insert({
          question_id: questionId,
          user_id: user.id,
          answer: answer,
          is_admin: false // Would need admin role checking logic
        });

      if (error) throw error;

      toast({
        title: "Answer submitted",
        description: "Your answer has been posted!"
      });

      setAnswerText(prev => ({ ...prev, [questionId]: '' }));
      fetchQuestions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-muted h-24 rounded-lg"></div>
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Questions & Answers
            </CardTitle>
            <Dialog open={showAskQuestion} onOpenChange={setShowAskQuestion}>
              <DialogTrigger asChild>
                <Button>Ask a Question</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ask a Question</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="What would you like to know about this product?"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={submitQuestion} className="w-full">
                    Submit Question
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No questions yet. Be the first to ask!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((question) => (
                <div key={question.id} className="space-y-4">
                  {/* Question */}
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">
                          {question.profiles?.display_name || 'Anonymous'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          asked {new Date(question.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{question.question}</p>
                    </div>
                  </div>

                  {/* Answers */}
                  {question.product_answers.length > 0 && (
                    <div className="ml-8 space-y-3">
                      {question.product_answers.map((answer) => (
                        <div key={answer.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={answer.profiles?.avatar_url} />
                            <AvatarFallback className="text-xs">
                              {answer.profiles?.display_name?.[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">
                                {answer.profiles?.display_name || 'Anonymous'}
                              </span>
                              {answer.is_admin && (
                                <Badge variant="secondary" className="text-xs">
                                  Handora Team
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {new Date(answer.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm">{answer.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Answer Input */}
                  <div className="ml-8">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Answer this question..."
                        value={answerText[question.id] || ''}
                        onChange={(e) => setAnswerText(prev => ({ 
                          ...prev, 
                          [question.id]: e.target.value 
                        }))}
                        rows={2}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => submitAnswer(question.id)}
                        disabled={!answerText[question.id]?.trim()}
                      >
                        Answer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductQA;