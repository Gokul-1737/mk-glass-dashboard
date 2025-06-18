
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

const YearlySales = () => {
  const yearlyData = [
    { month: 'Jan', sales: 234, revenue: 52000, target: 45000 },
    { month: 'Feb', sales: 189, revenue: 43000, target: 48000 },
    { month: 'Mar', sales: 267, revenue: 58000, target: 52000 },
    { month: 'Apr', sales: 298, revenue: 64000, target: 55000 },
    { month: 'May', sales: 245, revenue: 51000, target: 58000 },
    { month: 'Jun', sales: 312, revenue: 71000, target: 62000 },
    { month: 'Jul', sales: 278, revenue: 67000, target: 65000 },
    { month: 'Aug', sales: 334, revenue: 78000, target: 68000 },
    { month: 'Sep', sales: 289, revenue: 69000, target: 70000 },
    { month: 'Oct', sales: 356, revenue: 82000, target: 72000 },
    { month: 'Nov', sales: 321, revenue: 75000, target: 75000 },
    { month: 'Dec', sales: 389, revenue: 89000, target: 80000 },
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', yearlySales: 456, revenue: 455544, growth: '+34%' },
    { name: 'MacBook Pro', yearlySales: 234, revenue: 584766, growth: '+28%' },
    { name: 'Nike Air Max', yearlySales: 678, revenue: 87414, growth: '+45%' },
    { name: 'Samsung Galaxy Book', yearlySales: 345, revenue: 448155, growth: '+12%' },
    { name: 'Adidas Ultraboost', yearlySales: 567, revenue: 102060, growth: '+38%' },
  ];

  const totalYearlySales = yearlyData.reduce((sum, item) => sum + item.sales, 0);
  const totalYearlyRevenue = yearlyData.reduce((sum, item) => sum + item.revenue, 0);

  const handleExportData = () => {
    toast.success('Excel export started! File will download shortly.');
    console.log('Exporting yearly sales data...');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Yearly Sales</h1>
        <div className="flex items-center space-x-4">
          <Select defaultValue="2024">
            <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleExportData}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Units Sold</p>
              <p className="text-2xl font-bold text-white mt-1">{totalYearlySales.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">${(totalYearlyRevenue / 1000).toFixed(0)}K</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Avg Monthly Sales</p>
              <p className="text-2xl font-bold text-white mt-1">{Math.round(totalYearlySales / 12)}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-400" />
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Growth Rate</p>
              <p className="text-2xl font-bold text-green-400 mt-1">+28.5%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-400" />
          </div>
        </GlassCard>
      </div>
      
      {/* Yearly Trend Chart */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Yearly Sales & Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
            <YAxis yAxisId="left" stroke="rgba(255,255,255,0.7)" />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.7)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }} 
            />
            <Bar yAxisId="left" dataKey="sales" fill="url(#salesGradient)" />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2 }}
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="target" 
              stroke="#F59E0B" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#F59E0B', strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </GlassCard>
      
      {/* Top Products */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Top Performing Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topProducts.map((product, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">{product.name}</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm">Units Sold:</span>
                  <span className="text-white font-medium">{product.yearlySales}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm">Revenue:</span>
                  <span className="text-green-400 font-medium">${product.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm">Growth:</span>
                  <span className="text-blue-400 font-medium">{product.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default YearlySales;
