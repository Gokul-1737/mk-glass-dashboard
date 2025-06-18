
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Sale {
  id: string;
  product_id: string;
  quantity: number;
  sale_date: string;
  sale_price: number;
  created_at: string;
}

export const useTodaySales = () => {
  return useQuery({
    queryKey: ['today-sales'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          products!inner(name, category)
        `)
        .eq('sale_date', today)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useMonthlySales = () => {
  return useQuery({
    queryKey: ['monthly-sales'],
    queryFn: async () => {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const startDate = startOfMonth.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          products!inner(name, category)
        `)
        .gte('sale_date', startDate)
        .order('sale_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useYearlySales = () => {
  return useQuery({
    queryKey: ['yearly-sales'],
    queryFn: async () => {
      const startOfYear = new Date();
      startOfYear.setMonth(0, 1);
      const startDate = startOfYear.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          products!inner(name, category)
        `)
        .gte('sale_date', startDate)
        .order('sale_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useAddSale = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sale: Omit<Sale, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('sales')
        .insert([sale])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['today-sales'] });
      queryClient.invalidateQueries({ queryKey: ['monthly-sales'] });
      queryClient.invalidateQueries({ queryKey: ['yearly-sales'] });
      queryClient.invalidateQueries({ queryKey: ['sales-analytics'] });
      toast.success('Sale recorded successfully!');
    },
    onError: (error) => {
      toast.error('Failed to record sale: ' + error.message);
    }
  });
};
