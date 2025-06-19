
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, TrendingUp, ShoppingCart, Edit, Plus } from 'lucide-react';
import { useTodaySales } from '@/hooks/useSales';
import { useSalesAnalytics } from '@/hooks/useProducts';
import AddSaleModal from '@/components/AddSaleModal';
import EditSaleModal from '@/components/EditSaleModal';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const TodaySales = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: todaySalesData, isLoading: salesLoading } = useTodaySales();
  const { data: analytics, isLoading: analyticsLoading } = useSalesAnalytics();

  if (salesLoading || analyticsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Filter sales data based on selected date
  const filteredSalesData = todaySalesData?.filter(sale => {
    const saleDate = new Date(sale.sale_date);
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    const saleDateStr = format(saleDate, 'yyyy-MM-dd');
    return saleDateStr === selectedDateStr;
  }) || [];

  const totalSales = analytics?.reduce((sum, item) => sum + item.today_sales, 0) || 0;
  const totalRevenue = filteredSalesData?.reduce((sum, item) => sum + (item.quantity * item.sale_price), 0) || 0;
  const selectedDateSales = filteredSalesData.length;

  const chartData = analytics?.map(item => ({
    name: item.name.split(' ').slice(0, 2).join(' '),
    sales: item.today_sales
  })).filter(item => item.sales > 0) || [];

  return (
    <div className="space-y-4 sm:space-y-8 animate-fade-in p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between animate-slide-in-top gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Sales Data</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Sale
          </Button>
          
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[240px] justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                  !selectedDate && "text-white/50"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white/10 backdrop-blur-md border-white/20" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className="pointer-events-auto text-white"
                classNames={{
                  day_selected: "bg-blue-500 text-white hover:bg-blue-600",
                  day_today: "bg-white/20 text-white font-bold",
                  day: "text-white hover:bg-white/10"
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Selected Date Sales</p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">{selectedDateSales}</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-600">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Selected Date Revenue</p>
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
                ${selectedDateSales > 0 ? Math.round(totalRevenue / selectedDateSales) : 0}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600">
              <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Sales for {format(selectedDate, "MMM dd, yyyy")}
          </h3>
          <div className="space-y-3 max-h-60 sm:max-h-80 overflow-y-auto">
            {filteredSalesData?.map((sale, index) => (
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
            {(!filteredSalesData || filteredSalesData.length === 0) && (
              <div className="text-center py-8 text-white/60">
                No sales recorded for {format(selectedDate, "MMM dd, yyyy")}.
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
