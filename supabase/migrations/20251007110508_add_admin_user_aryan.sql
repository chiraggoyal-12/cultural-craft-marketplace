-- Grant admin privileges to user bs22b009@smail.iitm.ac.in
-- User ID: 7311af33-c4f5-4fc4-96ed-1e80eac54868

-- Insert admin role for the user
INSERT INTO public.user_roles (user_id, role)
VALUES ('7311af33-c4f5-4fc4-96ed-1e80eac54868', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify the admin role was added
SELECT 
    ur.user_id,
    ur.role,
    ur.created_at,
    au.email
FROM public.user_roles ur
LEFT JOIN auth.users au ON ur.user_id = au.id
WHERE ur.user_id = '7311af33-c4f5-4fc4-96ed-1e80eac54868';
