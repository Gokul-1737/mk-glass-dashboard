
-- Create products table
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total_stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sales table to track individual sales
CREATE TABLE public.sales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    sale_date DATE DEFAULT CURRENT_DATE,
    sale_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_sales_product_id ON public.sales(product_id);
CREATE INDEX idx_sales_date ON public.sales(sale_date);
CREATE INDEX idx_products_name ON public.products(name);

-- Insert sample products
INSERT INTO public.products (name, category, price, total_stock) VALUES
('iPhone 15 Pro', 'Electronics', 999.00, 100),
('Samsung Galaxy Book', 'Electronics', 1299.00, 75),
('Nike Air Max', 'Footwear', 129.00, 150),
('MacBook Pro', 'Electronics', 2499.00, 50),
('Adidas Ultraboost', 'Footwear', 180.00, 120);

-- Insert sample sales data
INSERT INTO public.sales (product_id, quantity, sale_date, sale_price) 
SELECT 
    p.id,
    FLOOR(RANDOM() * 10 + 1)::INTEGER,
    CURRENT_DATE - INTERVAL '1 day' * FLOOR(RANDOM() * 30),
    p.price
FROM public.products p, generate_series(1, 50) g;

-- Create a view for sales analytics
CREATE OR REPLACE VIEW public.sales_analytics AS
SELECT 
    p.id,
    p.name,
    p.category,
    p.price,
    p.total_stock,
    COALESCE(today_sales.quantity, 0) as today_sales,
    COALESCE(monthly_sales.quantity, 0) as monthly_sales,
    COALESCE(yearly_sales.quantity, 0) as yearly_sales,
    (p.total_stock - COALESCE(yearly_sales.quantity, 0)) as remaining_stock
FROM public.products p
LEFT JOIN (
    SELECT product_id, SUM(quantity) as quantity
    FROM public.sales 
    WHERE sale_date = CURRENT_DATE
    GROUP BY product_id
) today_sales ON p.id = today_sales.product_id
LEFT JOIN (
    SELECT product_id, SUM(quantity) as quantity
    FROM public.sales 
    WHERE DATE_TRUNC('month', sale_date) = DATE_TRUNC('month', CURRENT_DATE)
    GROUP BY product_id
) monthly_sales ON p.id = monthly_sales.product_id
LEFT JOIN (
    SELECT product_id, SUM(quantity) as quantity
    FROM public.sales 
    WHERE DATE_TRUNC('year', sale_date) = DATE_TRUNC('year', CURRENT_DATE)
    GROUP BY product_id
) yearly_sales ON p.id = yearly_sales.product_id;

-- Enable Row Level Security (optional - can be disabled for admin access)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is an admin dashboard)
CREATE POLICY "Allow all operations on products" ON public.products
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on sales" ON public.sales
FOR ALL USING (true) WITH CHECK (true);
