import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Eye, X, Play } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface QuickViewProps {
  product: Product;
  trigger: React.ReactNode;
}

const QuickView: React.FC<QuickViewProps> = ({ product, trigger }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Mock media - in real app this would come from database
  const media = [
    { id: '1', url: product.image, type: 'image' as const },
    { id: '2', url: product.image, type: 'image' as const },
    { id: '3', url: '/video-placeholder.mp4', type: 'video' as const },
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setOpen(false);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  const getBadges = () => {
    const badges = [];
    if (product.featured) badges.push({ text: 'Featured', variant: 'default' as const });
    if (product.bestseller) badges.push({ text: 'Bestseller', variant: 'secondary' as const });
    if (product.newArrival) badges.push({ text: 'New', variant: 'destructive' as const });
    return badges;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              {media[selectedImage]?.type === 'video' ? (
                <div className="relative w-full h-full bg-black">
                  <video 
                    src={media[selectedImage].url}
                    className="w-full h-full object-cover"
                    controls
                    poster={product.image}
                  />
                </div>
              ) : (
                <img
                  src={media[selectedImage]?.url || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Video Badge */}
              {media[selectedImage]?.type === 'video' && (
                <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  Video
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {media.length > 1 && (
              <div className="flex gap-2">
                {media.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative w-16 h-16 rounded border-2 overflow-hidden transition-all",
                      selectedImage === index 
                        ? "border-primary" 
                        : "border-transparent hover:border-gray-300"
                    )}
                  >
                    {item.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <img
                          src={product.image}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Badges */}
              {getBadges().length > 0 && (
                <div className="flex gap-2 mb-3">
                  {getBadges().map((badge, index) => (
                    <Badge key={index} variant={badge.variant}>
                      {badge.text}
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
            </div>

            {/* Product Info */}
            <div className="space-y-2 text-sm">
              <div><strong>Material:</strong> {product.material}</div>
              <div><strong>Region:</strong> {product.region}</div>
              <div><strong>In Stock:</strong> {product.inStock ? 'Yes' : 'No'}</div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground text-sm">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-1 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                  className="flex-1"
                >
                  <Heart 
                    className={cn(
                      "h-4 w-4 mr-2",
                      isInWishlist(product.id) && "fill-current text-red-500"
                    )} 
                  />
                  Wishlist
                </Button>
                
                <Button variant="outline" onClick={() => setOpen(false)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Details
                </Button>
              </div>
            </div>

            {/* Key Features */}
            <div className="pt-4 border-t">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Handcrafted with authentic materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;