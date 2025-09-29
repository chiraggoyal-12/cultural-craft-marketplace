import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products, Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface SearchResult extends Product {
  relevanceScore: number;
}

interface PredictiveSearchProps {
  onProductSelect?: (product: Product) => void;
  className?: string;
}

const PredictiveSearch: React.FC<PredictiveSearchProps> = ({ 
  onProductSelect, 
  className 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Search function
  const searchProducts = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const lowercaseQuery = searchQuery.toLowerCase();
    
    return products
      .map(product => {
        let score = 0;
        
        // Exact name match gets highest score
        if (product.name.toLowerCase().includes(lowercaseQuery)) {
          score += 10;
        }
        
        // Category match
        if (product.category.toLowerCase().includes(lowercaseQuery)) {
          score += 8;
        }
        
        // Description match
        if (product.description.toLowerCase().includes(lowercaseQuery)) {
          score += 6;
        }
        
        // Material match
        if (product.material.toLowerCase().includes(lowercaseQuery)) {
          score += 5;
        }
        
        // Region match
        if (product.region.toLowerCase().includes(lowercaseQuery)) {
          score += 4;
        }
        
        // Tags match (if we had tags)
        const searchTerms = lowercaseQuery.split(' ');
        searchTerms.forEach(term => {
          if (product.name.toLowerCase().includes(term)) score += 2;
          if (product.description.toLowerCase().includes(term)) score += 1;
        });

        return { ...product, relevanceScore: score };
      })
      .filter(product => product.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 6); // Limit to 6 results
  };

  // Update results when query changes
  useEffect(() => {
    const searchResults = searchProducts(query);
    setResults(searchResults);
    setShowResults(query.length > 0 && searchResults.length > 0);
  }, [query]);

  const handleVoiceSearch = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleProductSelect = (product: Product) => {
    setQuery('');
    setShowResults(false);
    onProductSelect?.(product);
  };

  const handleInputFocus = () => {
    if (query.length > 0 && results.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-10 pr-12"
        />
        
        {/* Voice Search Button */}
        {recognition && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8",
              isListening && "text-red-500 animate-pulse"
            )}
            onClick={handleVoiceSearch}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            <div className="py-2">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{product.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-primary">
                        ${product.price}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {product.material} • {product.region}
                    </p>
                  </div>
                  
                  {/* Relevance indicator */}
                  <div className="flex-shrink-0">
                    <div className="flex gap-1">
                      {[...Array(Math.min(5, Math.ceil(product.relevanceScore / 2)))].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-4 bg-primary/30 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
              
              {/* View All Results */}
              {results.length > 0 && (
                <div className="border-t mt-2 pt-2">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      // In a real app, navigate to search results page
                    }}
                    className="w-full px-4 py-2 text-sm text-primary hover:bg-muted transition-colors"
                  >
                    View all results for "{query}" ({results.length})
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredictiveSearch;