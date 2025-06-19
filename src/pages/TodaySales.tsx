
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, ShoppingCart, Edit, Plus } from 'lucide-react';
import { useTodaySales } from '@/hooks/useSales';
import { useSalesAnalytics } from '@/hooks/useProducts';
import AddSaleModal from '@/components/AddSaleModal';
import EditSaleModal from '@/components/EditSaleModal';

const TodaySales = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const { data: todaySalesData, isLoading: salesLoading } = useTodaySales();
  const { data: analytics, isLoading: analyticsLoading } = useSalesAnalytics();

  if (salesLoading || analyticsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const totalSales = analytics?.reduce((sum, item) => sum + item.today_sales, 0) || 0;
  const totalRevenue = todaySalesData?.reduce((sum, item) => sum + (item.quantity * item.sale_price), 0) || 0;

  const chartData = analytics?.map(item => ({
    name: item.name.split(' ').slice(0, 2).join(' '),
    sales: item.today_sales
  })).filter(item => item.sales > 0) || [];

  return (
    <div className="space-y-4 sm:space-y-8 animate-fade-in p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between animate-slide-in-top gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Today's Sales</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Sale
          </Button>
          <div className="flex items-center text-white/70">
            <Calendar className="w-5 h-5 mr-2" />
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Units Sold</p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">{totalSales}</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-600">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Average Order Value</p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                ${totalSales > 0 ? Math.round(totalRevenue / totalSales) : 0}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Chart */}
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Sales by Product</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Bar dataKey="sales" fill="url(#todayGradient)" />
              <defs>
                <linearGradient id="todayGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        
        {/* Sales List */}
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Today's Sales Details</h3>
          <div className="space-y-3 max-h-60 sm:max-h-80 overflow-y-auto">
            {todaySalesData?.map((sale, index) => (
              <div 
                key={sale.id} 
                className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white text-sm sm:text-base truncate">{sale.products.name}</h4>
                  <Badge variant="secondary" className="mt-1 bg-white/10 text-white/70 text-xs">
                    {sale.products.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-white font-semibold text-sm">{sale.quantity} units</p>
                    <p className="text-green-400 text-xs">${sale.sale_price}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingSale(sale)}
                    className="text-white/70 hover:text-white hover:bg-white/10 p-2"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
            {(!todaySalesData || todaySalesData.length === 0) && (
              <div className="text-center py-8 text-white/60">
                No sales recorded today yet.
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Modals */}
      <AddSaleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      
      <EditSaleModal
        isOpen={!!editingSale}
        onClose={() => setEditingSale(null)}
        sale={editingSale}
      />
    </div>
  );
};

export default TodaySales;
