
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  total_stock: number;
  created_at: string;
  updated_at: string;
}

export interface SalesAnalytics {
  id: string;
  name: string;
  category: string;
  price: number;
  total_stock: number;
  today_sales: number;
  monthly_sales: number;
  yearly_sales: number;
  remaining_stock: number;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Product[];
    }
  });
};

export const useSalesAnalytics = () => {
  return useQuery({
    queryKey: ['sales-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_analytics')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as SalesAnalytics[];
    }
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['sales-analytics'] });
      toast.success('Product added successfully!');
    },
    onError: (error) => {
      toast.error('Failed to add product: ' + error.message);
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Product> & { id: string }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['sales-analytics'] });
      toast.success('Product updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update product: ' + error.message);
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['sales-analytics'] });
      toast.success('Product deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete product: ' + error.message);
    }
  });
};
