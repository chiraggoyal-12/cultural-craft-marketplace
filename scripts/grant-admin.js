// Script to grant admin privileges to a user
// Run this in your browser console while logged in

import { supabase } from "../src/integrations/supabase/client.js";

async function grantAdminAccess() {
  try {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error getting user:", userError);
      return;
    }

    if (!user) {
      console.error("No user logged in");
      return;
    }

    console.log("Current user:", user.id, user.email);

    // Insert admin role
    const { data, error } = await supabase
      .from("user_roles")
      .insert([{ user_id: user.id, role: "admin" }])
      .select();

    if (error) {
      console.error("Error granting admin access:", error);
    } else {
      console.log("Admin access granted successfully!", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// Run the function
grantAdminAccess();
