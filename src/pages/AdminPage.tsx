import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Mail, Clock, CheckCircle2, User, Shield, Image } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductMediaImporter } from '@/components/ProductMediaImporter';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}

export const AdminPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  const checkAdminStatus = async () => {
    try {
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user?.id)
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      const hasAdminRole = roles && roles.length > 0;
      setIsAdmin(hasAdminRole);

      if (hasAdminRole) {
        await fetchAdminData();
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
      setError('Failed to verify admin permissions');
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchAdminData = async () => {
    try {
      // Fetch contact messages
      const { data: messages, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;
      setContactMessages(messages || []);

      // Fetch user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (rolesError) throw rolesError;
      setUserRoles(roles || []);

    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError('Failed to load admin data');
    }
  };

  const updateMessageStatus = async (messageId: string, status: 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', messageId);

      if (error) throw error;

      // Update local state
      setContactMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status } : msg
        )
      );
    } catch (err) {
      console.error('Error updating message status:', err);
      setError('Failed to update message status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Unread</Badge>;
      case 'read':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Read</Badge>;
      case 'replied':
        return <Badge variant="default"><CheckCircle2 className="w-3 h-3 mr-1" />Replied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to access the admin area.
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Access denied. You do not have administrator privileges.
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website and customer communications</p>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Messages ({contactMessages.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              User Roles ({userRoles.length})
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Product Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            <div className="grid gap-4">
              {contactMessages.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No contact messages found.</p>
                  </CardContent>
                </Card>
              ) : (
                contactMessages.map((message) => (
                  <Card key={message.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{message.subject}</CardTitle>
                          <CardDescription>
                            From: {message.name} ({message.email})
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(message.status)}
                          <Badge variant="outline">
                            {new Date(message.created_at).toLocaleDateString()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 whitespace-pre-wrap">{message.message}</p>
                      <div className="flex gap-2">
                        {message.status === 'unread' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateMessageStatus(message.id, 'read')}
                          >
                            Mark as Read
                          </Button>
                        )}
                        {message.status !== 'replied' && (
                          <Button
                            size="sm"
                            onClick={() => updateMessageStatus(message.id, 'replied')}
                          >
                            Mark as Replied
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="grid gap-4">
              {userRoles.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No user roles found.</p>
                  </CardContent>
                </Card>
              ) : (
                userRoles.map((userRole) => (
                  <Card key={userRole.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">User ID: {userRole.user_id}</p>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(userRole.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={userRole.role === 'admin' ? 'default' : 'secondary'}>
                          {userRole.role}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <ProductMediaImporter />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};