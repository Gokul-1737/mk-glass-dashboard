
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, TrendingUp, Package } from 'lucide-react';

const MonthlySales = () => {
  const monthlyData = [
    { week: 'Week 1', sales: 45, revenue: 12500 },
    { week: 'Week 2', sales: 52, revenue: 14800 },
    { week: 'Week 3', sales: 38, revenue: 10200 },
    { week: 'Week 4', sales: 61, revenue: 16900 },
  ];

  const productSales = [
    { product: 'iPhone 15 Pro', sold: 45, revenue: 44955, trend: '+12%' },
    { product: 'Nike Air Max', sold: 52, revenue: 6708, trend: '+8%' },
    { product: 'Samsung Galaxy Book', sold: 28, revenue: 36372, trend: '-3%' },
    { product: 'MacBook Pro', sold: 15, revenue: 37485, trend: '+25%' },
    { product: 'Adidas Ultraboost', sold: 41, revenue: 7380, trend: '+15%' },
  ];

  const totalMonthlySales = productSales.reduce((sum, item) => sum + item.sold, 0);
  const totalMonthlyRevenue = productSales.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Monthly Sales</h1>
        <div className="flex items-center space-x-4">
          <Select defaultValue="current">
            <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="last">Last Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center text-white/70">
            <Calendar className="w-5 h-5 mr-2" />
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Monthly Units Sold</p>
              <p className="text-2xl font-bold text-white mt-1">{totalMonthlySales}</p>
              <p className="text-green-400 text-sm mt-1">+18% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">${totalMonthlyRevenue.toLocaleString()}</p>
              <p className="text-green-400 text-sm mt-1">+22% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-600">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Avg Weekly Sales</p>
              <p className="text-2xl font-bold text-white mt-1">{Math.round(totalMonthlySales / 4)}</p>
              <p className="text-green-400 text-sm mt-1">+12% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#8B5CF6" 
                fill="url(#monthlyGradient)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
        
        {/* Product Performance */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Product Performance</h3>
          <div className="space-y-4">
            {productSales.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{item.product}</h4>
                  <p className="text-white/70 text-sm">{item.sold} units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${item.revenue.toLocaleString()}</p>
                  <Badge 
                    variant="secondary" 
                    className={`mt-1 ${
                      item.trend.startsWith('+') 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {item.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default MonthlySales;
