import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Mail,
  Clock,
  CheckCircle2,
  User,
  Shield,
  Image,
  Package,
  CreditCard,
  MapPin,
  Calendar,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductMediaImporter } from "@/components/ProductMediaImporter";

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
  role: "admin" | "user";
  created_at: string;
}

interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  payment_id?: string;
  subtotal: number;
  shipping_amount: number;
  tax_amount: number;
  total_amount: number;
  shipping_address: any;
  billing_address: any;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export const AdminPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  useEffect(() => {
    if (user && !loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  // Refresh data when component becomes visible (e.g., when navigating back from user dashboard)
  useEffect(() => {
    const handleFocus = () => {
      if (user && !loading) {
        fetchAdminData();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user, loading]);

  const checkAdminStatus = async () => {
    try {
      console.log("Checking admin status for user:", user?.id);

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", user?.id)
        .eq("role", "admin");

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
        throw rolesError;
      }

      console.log("User roles found:", roles);

      // Temporary admin bypass for specific user
      const isTemporaryAdmin =
        user?.id === "7311af33-c4f5-4fc4-96ed-1e80eac54868";
      const hasAdminRole = roles && roles.length > 0;
      const isAdmin = hasAdminRole || isTemporaryAdmin;

      setIsAdmin(isAdmin);

      if (isAdmin) {
        console.log("User is admin, fetching admin data");
        await fetchAdminData();
      } else {
        console.log("User is not admin. User ID:", user?.id);
      }
    } catch (err) {
      console.error("Error checking admin status:", err);
      setError("Failed to verify admin permissions");
    } finally {
      setIsLoadingData(false);
      setLastRefresh(new Date());
    }
  };

  const fetchAdminData = async () => {
    try {
      // Fetch contact messages
      const { data: messages, error: messagesError } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (messagesError) throw messagesError;
      setContactMessages(messages || []);

      // Fetch user roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*")
        .order("created_at", { ascending: false });

      if (rolesError) throw rolesError;
      setUserRoles(roles || []);

      // Fetch orders with order items
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_image,
            quantity,
            unit_price,
            total_price
          )
        `
        )
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;
      setOrders((ordersData || []).map((order: any) => ({
        ...order,
        payment_status: order.payment_status || 'pending',
        payment_id: order.payment_id || undefined
      })));
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to load admin data");
    } finally {
      setLastRefresh(new Date());
    }
  };

  const updateMessageStatus = async (
    messageId: string,
    status: "read" | "replied"
  ) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status })
        .eq("id", messageId);

      if (error) throw error;

      // Update local state
      setContactMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg))
      );
    } catch (err) {
      console.error("Error updating message status:", err);
      setError("Failed to update message status");
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      console.log("Updating order status:", orderId, "to", status);

      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId)
        .select();

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      console.log("Database update result:", data);

      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );

      toast({
        title: "Order Status Updated",
        description: `Order status has been updated to ${status}.`,
      });

      // Refresh data to ensure consistency
      await fetchAdminData();

      console.log("Order status update completed successfully");
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status: " + (err as Error).message);
    }
  };

  const confirmUPIPayment = async (orderId: string) => {
    try {
      console.log("Confirming payment for order:", orderId);

      // Update order status to confirmed (payment_status column may not exist)
      const { data, error } = await supabase
        .from("orders")
        .update({
          status: "confirmed",
        })
        .eq("id", orderId)
        .select();

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      console.log("Database update result:", data);

      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "confirmed" } : order
        )
      );

      toast({
        title: "Payment Confirmed",
        description:
          "Payment has been confirmed and order status updated to confirmed.",
      });

      // Refresh data to ensure consistency
      await fetchAdminData();

      console.log("Payment confirmation completed successfully");
    } catch (err) {
      console.error("Error confirming payment:", err);
      setError("Failed to confirm payment: " + (err as Error).message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unread
          </Badge>
        );
      case "read":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Read
          </Badge>
        );
      case "replied":
        return (
          <Badge variant="default">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Replied
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "confirmed":
        return <Badge variant="default">Confirmed</Badge>;
      case "processing":
        return <Badge variant="default">Processing</Badge>;
      case "shipped":
        return <Badge variant="default">Shipped</Badge>;
      case "delivered":
        return <Badge variant="default">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "paid":
        return <Badge variant="default">Paid</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "refunded":
        return <Badge variant="outline">Refunded</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
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
              <br />
              <span className="text-xs text-muted-foreground mt-2 block">
                Your user ID: {user?.id}
              </span>
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
          <p className="text-muted-foreground">
            Manage your website and customer communications
          </p>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Orders ({orders.length})
              </TabsTrigger>
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
            <div className="flex flex-col items-end gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchAdminData}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
              {lastRefresh && (
                <p className="text-xs text-muted-foreground">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          <TabsContent value="orders" className="space-y-4">
            <div className="grid gap-4">
              {orders.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No orders found.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            Order #{order.order_number}
                          </CardTitle>
                          <CardDescription>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(
                                  order.created_at
                                ).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                {order.payment_method}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {order.shipping_address?.city},{" "}
                                {order.shipping_address?.state}
                              </div>
                            </div>
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          {getOrderStatusBadge(order.status)}
                          {order.payment_status &&
                            getPaymentStatusBadge(order.payment_status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Order Items */}
                        {order.order_items && order.order_items.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Order Items:</h4>
                            {order.order_items.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 p-2 bg-muted rounded"
                              >
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">
                                    {item.product_name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Qty: {item.quantity} × ₹{item.unit_price}
                                  </p>
                                </div>
                                <p className="font-medium text-sm">
                                  ₹{item.total_price}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Order Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Subtotal
                            </p>
                            <p className="font-medium">
                              ₹{order.subtotal.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Shipping
                            </p>
                            <p className="font-medium">
                              ₹{order.shipping_amount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tax</p>
                            <p className="font-medium">
                              ₹{order.tax_amount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total
                            </p>
                            <p className="font-bold text-lg">
                              ₹{order.total_amount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Payment Details */}
                        {order.payment_id && (
                          <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground">
                              Payment ID
                            </p>
                            <p className="font-mono text-sm">
                              {order.payment_id}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4 flex-wrap">
                          {order.status === "pending" &&
                            order.payment_method === "upi" && (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => confirmUPIPayment(order.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Confirm Payment Received
                              </Button>
                            )}
                          {order.status === "pending" &&
                            (order.payment_status === "paid" ||
                              !order.payment_status) && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateOrderStatus(order.id, "confirmed")
                                }
                              >
                                Confirm Order
                              </Button>
                            )}
                          {order.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                updateOrderStatus(order.id, "processing")
                              }
                            >
                              Start Processing
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                updateOrderStatus(order.id, "shipped")
                              }
                            >
                              Mark as Shipped
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                updateOrderStatus(order.id, "delivered")
                              }
                            >
                              Mark as Delivered
                            </Button>
                          )}
                          {order.status !== "cancelled" &&
                            order.status !== "delivered" && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  updateOrderStatus(order.id, "cancelled")
                                }
                              >
                                Cancel Order
                              </Button>
                            )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <div className="grid gap-4">
              {contactMessages.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No contact messages found.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                contactMessages.map((message) => (
                  <Card key={message.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {message.subject}
                          </CardTitle>
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
                      <p className="text-sm mb-4 whitespace-pre-wrap">
                        {message.message}
                      </p>
                      <div className="flex gap-2">
                        {message.status === "unread" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateMessageStatus(message.id, "read")
                            }
                          >
                            Mark as Read
                          </Button>
                        )}
                        {message.status !== "replied" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              updateMessageStatus(message.id, "replied")
                            }
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
                    <p className="text-center text-muted-foreground">
                      No user roles found.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                userRoles.map((userRole) => (
                  <Card key={userRole.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            User ID: {userRole.user_id}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Created:{" "}
                            {new Date(userRole.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            userRole.role === "admin" ? "default" : "secondary"
                          }
                        >
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
            <Card>
              <CardHeader>
                <CardTitle>Product Media Management</CardTitle>
                <CardDescription>
                  Upload and manage product images from Google Drive or go to
                  the advanced editor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate("/admin/product-media")}
                  className="mb-4"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Advanced Media Editor
                </Button>
                <ProductMediaImporter />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};
