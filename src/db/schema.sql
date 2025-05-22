
-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  amount DECIMAL(15, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Successful', 'Pending', 'Failed')),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('M-PESA', 'Card', 'Bank Transfer', 'Wallet')),
  customer TEXT NOT NULL,
  date TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  description TEXT,
  reference TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_id TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  payment_link TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Completed', 'Pending', 'Failed')),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status TEXT NOT NULL CHECK (status IN ('New', 'Read')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bank', 'card', 'wallet', 'mpesa')),
  details JSONB NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  invoice_date TEXT NOT NULL,
  due_date TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Paid', 'Pending', 'Overdue')),
  items JSONB,
  notes TEXT,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create stored procedures
CREATE OR REPLACE FUNCTION get_total_inflow()
RETURNS DECIMAL AS $$
DECLARE
    total DECIMAL;
BEGIN
    SELECT COALESCE(SUM(amount), 0) INTO total FROM transactions WHERE status = 'Successful';
    RETURN total;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_payment_method_stats()
RETURNS TABLE (
    payment_method TEXT,
    count BIGINT,
    percentage NUMERIC
) AS $$
DECLARE
    total_count BIGINT;
BEGIN
    -- Get total count of successful transactions
    SELECT COUNT(*) INTO total_count FROM transactions WHERE status = 'Successful';
    
    -- Calculate percentage for each payment method
    RETURN QUERY
    SELECT 
        t.payment_method,
        COUNT(*) as count,
        ROUND((COUNT(*) * 100.0 / NULLIF(total_count, 0))::numeric, 0) as percentage
    FROM 
        transactions t
    WHERE 
        t.status = 'Successful'
    GROUP BY 
        t.payment_method
    ORDER BY 
        count DESC;
END;
$$ LANGUAGE plpgsql;

-- Set up RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profiles" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profiles" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can view their own transactions" 
ON public.transactions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" 
ON public.transactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own bills" 
ON public.bills FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bills" 
ON public.bills FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own payment methods" 
ON public.payment_methods FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment methods" 
ON public.payment_methods FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment methods" 
ON public.payment_methods FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payment methods" 
ON public.payment_methods FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own invoices" 
ON public.invoices FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own invoices" 
ON public.invoices FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices" 
ON public.invoices FOR UPDATE 
USING (auth.uid() = user_id);

-- Create Supabase edge function for processing Quikk API STK push
-- Note: This would be done in the Supabase dashboard
