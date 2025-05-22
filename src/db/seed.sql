
-- Seed data for demo purposes
-- Note: This assumes the auth.users table already has users

-- Add a test user if not exists
INSERT INTO auth.users (id, email)
VALUES 
    ('00000000-0000-0000-0000-000000000000', 'test@example.com')
ON CONFLICT (id) DO NOTHING;

-- Add profile for test user
INSERT INTO public.profiles (id, first_name, last_name, email, phone)
VALUES 
    ('00000000-0000-0000-0000-000000000000', 'Johnathan', 'Doe', 'test@example.com', '+254 712 345 678')
ON CONFLICT (id) DO NOTHING;

-- Add sample transactions
INSERT INTO public.transactions (id, amount, status, payment_method, customer, date, user_id)
VALUES
    ('TR-3699XXXX', 8000.00, 'Successful', 'M-PESA', 'Maria Wanjiru', 'Jan 25, 2025', '00000000-0000-0000-0000-000000000000'),
    ('TR-5456XXXX', 30000.00, 'Successful', 'Card', 'Anne W.', 'Jan 26, 2025', '00000000-0000-0000-0000-000000000000'),
    ('TR-7823XXXX', 10000.00, 'Successful', 'Bank Transfer', 'Kimani Ndegwa', 'Feb 12, 2025', '00000000-0000-0000-0000-000000000000'),
    ('TR-9012XXXX', 40000.00, 'Successful', 'Wallet', 'Kaiya Stanton', 'Mar 24, 2025', '00000000-0000-0000-0000-000000000000'),
    ('TR-1234XXXX', 15000.00, 'Pending', 'M-PESA', 'John Doe', 'Apr 5, 2025', '00000000-0000-0000-0000-000000000000'),
    ('TR-5678XXXX', 25000.00, 'Failed', 'Card', 'Jane Smith', 'Apr 10, 2025', '00000000-0000-0000-0000-000000000000'),
    ('TR-9101XXXX', 5000.00, 'Pending', 'Bank Transfer', 'Robert Johnson', 'Apr 15, 2025', '00000000-0000-0000-0000-000000000000'),
    ('TR-1121XXXX', 12000.00, 'Successful', 'Wallet', 'Sarah Williams', 'Apr 20, 2025', '00000000-0000-0000-0000-000000000000')
ON CONFLICT (id) DO NOTHING;

-- Add sample bills
INSERT INTO public.bills (bill_id, date, customer_name, amount, payment_link, status, user_id)
VALUES
    ('BI-79116801', '4/03/2025', 'John Smith', 30000.00, 'https://Mulaflow/payment/bi-79116801', 'Completed', '00000000-0000-0000-0000-000000000000'),
    ('BI-79122083', '8/03/2025', 'Ben Otieno', 50000.00, 'https://Mulaflow/payment/bi-79122083', 'Completed', '00000000-0000-0000-0000-000000000000'),
    ('BI-79214079', '24/03/2025', 'Corey Press', 70000.00, 'https://Mulaflow/payment/bi-79214079', 'Completed', '00000000-0000-0000-0000-000000000000')
ON CONFLICT (bill_id) DO NOTHING;

-- Add sample notifications
INSERT INTO public.notifications (status, title, message, date, user_id)
VALUES
    ('New', 'New transaction received', 'You have received a new transaction of ksh50,000', 'May 14, 2025 - 10:30 AM', '00000000-0000-0000-0000-000000000000'),
    ('New', 'Payout successful', 'Your payout of ksh20,000 to Faith Jordan was successful', 'May 13, 2025 - 2:45 PM', '00000000-0000-0000-0000-000000000000'),
    ('Read', 'Failed transaction', 'A transaction of ksh15,000 has failed. Please check the details.', 'May 12, 2025 - 1:35 PM', '00000000-0000-0000-0000-000000000000');

-- Add sample payment methods
INSERT INTO public.payment_methods (name, type, details, is_default, user_id)
VALUES
    ('Equity Bank', 'bank', '{"account_number": "9912345678", "bank_name": "Equity Bank", "account_type": "Checking"}', true, '00000000-0000-0000-0000-000000000000'),
    ('Visa Card', 'card', '{"last4": "4242", "expiry": "12/26", "brand": "visa"}', false, '00000000-0000-0000-0000-000000000000'),
    ('M-PESA', 'mpesa', '{"phone_number": "+254712345678", "name": "John Doe"}', false, '00000000-0000-0000-0000-000000000000');

-- Add sample invoices
INSERT INTO public.invoices (invoice_number, customer_name, invoice_date, due_date, amount, status, user_id)
VALUES
    ('INV-001', 'Acme Corporation', 'May 15, 2025', 'Jun 15, 2025', 25000.00, 'Paid', '00000000-0000-0000-0000-000000000000'),
    ('INV-002', 'Tech Solutions Ltd', 'May 10, 2025', 'Jun 10, 2025', 15500.00, 'Pending', '00000000-0000-0000-0000-000000000000'),
    ('INV-003', 'Global Traders', 'May 5, 2025', 'Jun 5, 2025', 32800.00, 'Overdue', '00000000-0000-0000-0000-000000000000');
