import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, ArrowLeft, Upload, Edit, Save, X } from 'lucide-react';
import { Product, useProducts } from '@/hooks/useProducts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ProductMedia {
  id: string;
  product_id: string;
  media_url: string;
  media_type: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
}

const categories = [
  { id: 'culinary', name: 'Culinary Delights' },
  { id: 'divine', name: 'Divine Creations' },
  { id: 'home', name: 'Home Elegance' },
  { id: 'sip-smoke', name: 'Sip & Smoke' },
];

export default function ProductMediaAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { products, loading: productsLoading, refetch: refetchProducts } = useProducts();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productMedia, setProductMedia] = useState<ProductMedia[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
  const [mediaFormData, setMediaFormData] = useState({
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
      setEditedProduct(selectedProduct);
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
      .eq('product_id', selectedProduct.id)
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

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editedProduct.name || !editedProduct.price || !editedProduct.description || 
        !editedProduct.category || !editedProduct.material) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const productId = editedProduct.name!.toLowerCase().replace(/\s+/g, '-');
      
      const { error } = await supabase
        .from('products')
        .insert([{
          id: productId,
          name: editedProduct.name!,
          price: editedProduct.price!,
          description: editedProduct.description!,
          category: editedProduct.category!,
          material: editedProduct.material!,
          dimensions: editedProduct.dimensions,
          weight: editedProduct.weight,
          care_instructions: editedProduct.care_instructions,
          in_stock: editedProduct.in_stock ?? true,
          featured: editedProduct.featured ?? false,
          bestseller: editedProduct.bestseller ?? false,
          new_arrival: editedProduct.new_arrival ?? false,
          published: editedProduct.published ?? true,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product created successfully",
      });

      setIsCreating(false);
      setEditedProduct({});
      refetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .update(editedProduct)
        .eq('id', selectedProduct.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product updated successfully",
      });

      setIsEditing(false);
      setSelectedProduct({ ...selectedProduct, ...editedProduct } as Product);
      refetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    
    if (!confirm(`Are you sure you want to delete "${selectedProduct.name}"? This will also delete all associated media.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedProduct.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      setSelectedProduct(null);
      refetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || !mediaFormData.media_url) {
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
          product_id: selectedProduct.id,
          ...mediaFormData
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Media added successfully",
      });

      resetMediaForm();
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
      await supabase
        .from('product_media')
        .update({ is_primary: false })
        .eq('product_id', selectedProduct.id);

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

  const resetMediaForm = () => {
    setShowMediaForm(false);
    setMediaFormData({
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

  if (loading || productsLoading) {
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

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Product Management Console</h1>
            <p className="text-muted-foreground">Create, edit, and manage all product details</p>
          </div>
          <Button onClick={() => {
            setIsCreating(true);
            setEditedProduct({
              in_stock: true,
              featured: false,
              bestseller: false,
              new_arrival: false,
              published: true,
            });
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Product
          </Button>
        </div>

        {/* Create/Edit Product Dialog */}
        <Dialog open={isCreating || isEditing} onOpenChange={(open) => {
          if (!open) {
            setIsCreating(false);
            setIsEditing(false);
            setEditedProduct({});
          }
        }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isCreating ? 'Create New Product' : 'Edit Product'}</DialogTitle>
              <DialogDescription>
                {isCreating ? 'Add a new product to your catalog' : 'Update product information'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={isCreating ? handleCreateProduct : handleUpdateProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={editedProduct.name || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={editedProduct.price || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={editedProduct.category}
                    onValueChange={(value) => setEditedProduct({ ...editedProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="material">Material *</Label>
                  <Input
                    id="material"
                    value={editedProduct.material || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, material: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={editedProduct.dimensions || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, dimensions: e.target.value })}
                    placeholder="e.g., 10 x 5 x 3 inches"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={editedProduct.weight || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, weight: e.target.value })}
                    placeholder="e.g., 500g"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={editedProduct.description || ''}
                  onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="care_instructions">Care Instructions</Label>
                <Textarea
                  id="care_instructions"
                  value={editedProduct.care_instructions || ''}
                  onChange={(e) => setEditedProduct({ ...editedProduct, care_instructions: e.target.value })}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in_stock"
                    checked={editedProduct.in_stock}
                    onCheckedChange={(checked) => setEditedProduct({ ...editedProduct, in_stock: checked as boolean })}
                  />
                  <Label htmlFor="in_stock">In Stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={editedProduct.published}
                    onCheckedChange={(checked) => setEditedProduct({ ...editedProduct, published: checked as boolean })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={editedProduct.featured}
                    onCheckedChange={(checked) => setEditedProduct({ ...editedProduct, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bestseller"
                    checked={editedProduct.bestseller}
                    onCheckedChange={(checked) => setEditedProduct({ ...editedProduct, bestseller: checked as boolean })}
                  />
                  <Label htmlFor="bestseller">Bestseller</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new_arrival"
                    checked={editedProduct.new_arrival}
                    onCheckedChange={(checked) => setEditedProduct({ ...editedProduct, new_arrival: checked as boolean })}
                  />
                  <Label htmlFor="new_arrival">New Arrival</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsCreating(false);
                  setIsEditing(false);
                  setEditedProduct({});
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {isCreating ? 'Create Product' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Product Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Product</CardTitle>
            <CardDescription>Choose a product to view and manage its details and media</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedProduct?.id}
              onValueChange={(value) => {
                const product = products.find(p => p.id === value);
                setSelectedProduct(product || null);
                setShowMediaForm(false);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} {!product.published && '(Unpublished)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Product Details & Media */}
        {selectedProduct && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Manage all product information</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Product
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteProduct}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
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
                  {selectedProduct.dimensions && (
                    <div>
                      <Label className="text-muted-foreground">Dimensions</Label>
                      <p className="font-medium">{selectedProduct.dimensions}</p>
                    </div>
                  )}
                  {selectedProduct.weight && (
                    <div>
                      <Label className="text-muted-foreground">Weight</Label>
                      <p className="font-medium">{selectedProduct.weight}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Description</Label>
                    <p className="text-sm">{selectedProduct.description}</p>
                  </div>
                  {selectedProduct.care_instructions && (
                    <div className="md:col-span-2">
                      <Label className="text-muted-foreground">Care Instructions</Label>
                      <p className="text-sm">{selectedProduct.care_instructions}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <Badge variant={selectedProduct.in_stock ? "default" : "destructive"}>
                        {selectedProduct.in_stock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                      <Badge variant={selectedProduct.published ? "default" : "secondary"}>
                        {selectedProduct.published ? 'Published' : 'Unpublished'}
                      </Badge>
                      {selectedProduct.featured && <Badge variant="secondary">Featured</Badge>}
                      {selectedProduct.bestseller && <Badge variant="secondary">Bestseller</Badge>}
                      {selectedProduct.new_arrival && <Badge variant="secondary">New Arrival</Badge>}
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
                  <Button onClick={() => setShowMediaForm(!showMediaForm)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Media
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showMediaForm && (
                  <form onSubmit={handleAddMedia} className="mb-6 p-4 border rounded-lg space-y-4">
                    <div>
                      <Label htmlFor="media_url">Drive Link *</Label>
                      <Input
                        id="media_url"
                        value={mediaFormData.media_url}
                        onChange={(e) => setMediaFormData({ ...mediaFormData, media_url: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="media_type">Media Type</Label>
                        <Select
                          value={mediaFormData.media_type}
                          onValueChange={(value) => setMediaFormData({ ...mediaFormData, media_type: value })}
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
                          value={mediaFormData.sort_order}
                          onChange={(e) => setMediaFormData({ ...mediaFormData, sort_order: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="alt_text">Alt Text (Optional)</Label>
                      <Input
                        id="alt_text"
                        value={mediaFormData.alt_text}
                        onChange={(e) => setMediaFormData({ ...mediaFormData, alt_text: e.target.value })}
                        placeholder="Description for accessibility"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_primary"
                        checked={mediaFormData.is_primary}
                        onCheckedChange={(checked) => setMediaFormData({ ...mediaFormData, is_primary: checked as boolean })}
                      />
                      <Label htmlFor="is_primary">Set as primary image</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        <Upload className="mr-2 h-4 w-4" />
                        Add Media
                      </Button>
                      <Button type="button" variant="outline" onClick={resetMediaForm}>
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
