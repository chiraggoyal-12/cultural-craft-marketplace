import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, ArrowLeft, Upload } from 'lucide-react';
import { products, Product } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

interface ProductMedia {
  id: string;
  product_id: string;
  media_url: string;
  media_type: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
}

export default function ProductMediaAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productMedia, setProductMedia] = useState<ProductMedia[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [formData, setFormData] = useState({
    media_url: '',
    media_type: 'image',
    alt_text: '',
    sort_order: 0,
    is_primary: false,
  });

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (selectedProduct) {
      fetchProductMedia();
    }
  }, [selectedProduct]);

  const checkAdminStatus = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (error || !data) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const fetchProductMedia = async () => {
    if (!selectedProduct) return;

    const { data, error } = await supabase
      .from('product_media')
      .select('*')
      .eq('product_id', selectedProduct.name)
      .order('sort_order', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch media",
        variant: "destructive",
      });
      return;
    }

    setProductMedia(data || []);
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || !formData.media_url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('product_media')
        .insert([{
          product_id: selectedProduct.name,
          ...formData
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Media added successfully",
      });

      resetForm();
      fetchProductMedia();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    const { error } = await supabase
      .from('product_media')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete media",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Media deleted successfully",
    });
    fetchProductMedia();
  };

  const handleSetPrimary = async (id: string) => {
    if (!selectedProduct) return;

    try {
      // First, unset all primary flags for this product
      await supabase
        .from('product_media')
        .update({ is_primary: false })
        .eq('product_id', selectedProduct.name);

      // Then set the selected one as primary
      const { error } = await supabase
        .from('product_media')
        .update({ is_primary: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Primary image updated",
      });
      fetchProductMedia();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setFormData({
      media_url: '',
      media_type: 'image',
      alt_text: '',
      sort_order: productMedia.length,
      is_primary: false,
    });
  };

  const convertGoogleDriveUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const match = url.match(/[?&]id=([^&]+)/);
      if (match) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
      }
    }
    return url;
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => navigate('/admin')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin
        </Button>

        <h1 className="text-3xl font-bold mb-6">Product Media Manager</h1>

        {/* Product Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Product</CardTitle>
            <CardDescription>Choose a product to view and manage its media</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedProduct?.id}
              onValueChange={(value) => {
                const product = products.find(p => p.id === value);
                setSelectedProduct(product || null);
                setShowAddForm(false);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Product Details */}
        {selectedProduct && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Current product information (edit in src/data/products.ts)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Product Name</Label>
                    <p className="font-medium">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Price</Label>
                    <p className="font-medium">₹{selectedProduct.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Category</Label>
                    <p className="font-medium">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Material</Label>
                    <p className="font-medium">{selectedProduct.material}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Description</Label>
                    <p className="text-sm">{selectedProduct.description}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="flex gap-2 mt-1">
                      {selectedProduct.inStock && <Badge>In Stock</Badge>}
                      {selectedProduct.featured && <Badge variant="secondary">Featured</Badge>}
                      {selectedProduct.bestseller && <Badge variant="secondary">Bestseller</Badge>}
                      {selectedProduct.newArrival && <Badge variant="secondary">New</Badge>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Media */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Media ({productMedia.length})</CardTitle>
                    <CardDescription>Manage photos and videos for this product</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddForm(!showAddForm)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Media
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Add Media Form */}
                {showAddForm && (
                  <form onSubmit={handleAddMedia} className="mb-6 p-4 border rounded-lg space-y-4">
                    <div>
                      <Label htmlFor="media_url">Drive Link *</Label>
                      <Input
                        id="media_url"
                        value={formData.media_url}
                        onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="media_type">Media Type</Label>
                        <Select
                          value={formData.media_type}
                          onValueChange={(value) => setFormData({ ...formData, media_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="sort_order">Sort Order</Label>
                        <Input
                          id="sort_order"
                          type="number"
                          value={formData.sort_order}
                          onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="alt_text">Alt Text (Optional)</Label>
                      <Input
                        id="alt_text"
                        value={formData.alt_text}
                        onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                        placeholder="Description for accessibility"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_primary"
                        checked={formData.is_primary}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_primary: checked as boolean })}
                      />
                      <Label htmlFor="is_primary">Set as primary image</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        <Upload className="mr-2 h-4 w-4" />
                        Add Media
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}

                {/* Media Grid */}
                {productMedia.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No media found for this product. Click "Add Media" to get started.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productMedia.map((media) => (
                      <Card key={media.id} className={media.is_primary ? 'ring-2 ring-primary' : ''}>
                        <CardContent className="p-4">
                          <div className="relative aspect-square mb-3 bg-muted rounded-lg overflow-hidden">
                            {media.media_type === 'image' ? (
                              <img 
                                src={convertGoogleDriveUrl(media.media_url)}
                                alt={media.alt_text || 'Product media'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm text-muted-foreground">Video</p>
                              </div>
                            )}
                            {media.is_primary && (
                              <Badge className="absolute top-2 right-2">Primary</Badge>
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Type:</span> {media.media_type}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Order:</span> {media.sort_order}
                            </div>
                            {media.alt_text && (
                              <div>
                                <span className="text-muted-foreground">Alt:</span> {media.alt_text}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 mt-4">
                            {!media.is_primary && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSetPrimary(media.id)}
                                className="flex-1"
                              >
                                Set Primary
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteMedia(media.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
