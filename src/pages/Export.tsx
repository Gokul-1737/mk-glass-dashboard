
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, Calendar, Package } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useSalesAnalytics } from '@/hooks/useProducts';
import { useTodaySales, useMonthlySales, useYearlySales } from '@/hooks/useSales';
import { toast } from 'sonner';

const Export = () => {
  const { data: analytics } = useSalesAnalytics();
  const { data: todaySales } = useTodaySales();
  const { data: monthlySales } = useMonthlySales();
  const { data: yearlySales } = useYearlySales();

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      toast.error('No data available to export');
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const csv = [
      headers,
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success(`${filename} exported successfully!`);
  };

  const exportProducts = () => {
    if (!analytics) return;
    
    const productData = analytics.map(product => ({
      ID: product.id,
      Name: product.name,
      Category: product.category,
      Price: product.price,
      'Total Stock': product.total_stock,
      'Today Sales': product.today_sales,
      'Monthly Sales': product.monthly_sales,
      'Yearly Sales': product.yearly_sales,
      'Remaining Stock': product.remaining_stock
    }));
    
    exportToCSV(productData, 'products_analytics');
  };

  const exportTodaySales = () => {
    if (!todaySales) return;
    
    const salesData = todaySales.map(sale => ({
      'Sale ID': sale.id,
      'Product Name': sale.products.name,
      Category: sale.products.category,
      Quantity: sale.quantity,
      'Sale Price': sale.sale_price,
      'Sale Date': sale.sale_date,
      'Created At': sale.created_at
    }));
    
    exportToCSV(salesData, 'today_sales');
  };

  const exportMonthlySales = () => {
    if (!monthlySales) return;
    
    const salesData = monthlySales.map(sale => ({
      'Sale ID': sale.id,
      'Product Name': sale.products.name,
      Category: sale.products.category,
      Quantity: sale.quantity,
      'Sale Price': sale.sale_price,
      'Sale Date': sale.sale_date,
      'Created At': sale.created_at
    }));
    
    exportToCSV(salesData, 'monthly_sales');
  };

  const exportYearlySales = () => {
    if (!yearlySales) return;
    
    const salesData = yearlySales.map(sale => ({
      'Sale ID': sale.id,
      'Product Name': sale.products.name,
      Category: sale.products.category,
      Quantity: sale.quantity,
      'Sale Price': sale.sale_price,
      'Sale Date': sale.sale_date,
      'Created At': sale.created_at
    }));
    
    exportToCSV(salesData, 'yearly_sales');
  };

  const exportOptions = [
    {
      title: 'Products Analytics',
      description: 'Export complete product data with sales analytics',
      icon: Package,
      onClick: exportProducts,
      data: analytics,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: "Today's Sales",
      description: 'Export all sales transactions from today',
      icon: Calendar,
      onClick: exportTodaySales,
      data: todaySales,
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Monthly Sales',
      description: 'Export all sales from current month',
      icon: FileSpreadsheet,
      onClick: exportMonthlySales,
      data: monthlySales,
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Yearly Sales',
      description: 'Export all sales from current year',
      icon: Download,
      onClick: exportYearlySales,
      data: yearlySales,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="animate-slide-in-top">
        <h1 className="text-3xl font-bold text-white mb-2">Export Data</h1>
        <p className="text-white/70">Download your data in CSV format for external analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exportOptions.map((option, index) => (
          <GlassCard 
            key={option.title}
            className="p-6 hover:scale-105 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color}`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-white/60 text-sm">
                  {option.data?.length || 0} records
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
            <p className="text-white/70 text-sm mb-4">{option.description}</p>
            
            <Button
              onClick={option.onClick}
              disabled={!option.data || option.data.length === 0}
              className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </GlassCard>
        ))}
      </div>

      {/* Export Summary */}
      <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-xl font-semibold text-white mb-4">Export Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{analytics?.length || 0}</p>
            <p className="text-white/70 text-sm">Products</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{todaySales?.length || 0}</p>
            <p className="text-white/70 text-sm">Today's Sales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-400">{monthlySales?.length || 0}</p>
            <p className="text-white/70 text-sm">Monthly Sales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{yearlySales?.length || 0}</p>
            <p className="text-white/70 text-sm">Yearly Sales</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Export;
