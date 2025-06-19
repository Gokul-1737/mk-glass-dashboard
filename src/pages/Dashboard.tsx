
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/GlassCard';
import { TrendingUp, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { useSalesAnalytics } from '@/hooks/useProducts';
import { useTodaySales, useMonthlySales, useYearlySales } from '@/hooks/useSales';

const Dashboard = () => {
  const { data: analytics } = useSalesAnalytics();
  const { data: todaySales } = useTodaySales();
  const { data: monthlySales } = useMonthlySales();
  const { data: yearlySales } = useYearlySales();

  const totalProducts = analytics?.length || 0;
  const todayUnits = analytics?.reduce((sum, item) => sum + item.today_sales, 0) || 0;
  const monthlyUnits = analytics?.reduce((sum, item) => sum + item.monthly_sales, 0) || 0;
  const todayRevenue = todaySales?.reduce((sum, sale) => sum + (sale.quantity * sale.sale_price), 0) || 0;

  const stats = [
    { title: 'Total Products', value: totalProducts.toString(), icon: Package, color: 'from-blue-500 to-purple-600' },
    { title: "Today's Sales", value: todayUnits.toString(), icon: ShoppingCart, color: 'from-green-500 to-teal-600' },
    { title: 'Monthly Sales', value: monthlyUnits.toString(), icon: TrendingUp, color: 'from-orange-500 to-red-600' },
    { title: 'Today Revenue', value: `$${todayRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-purple-500 to-pink-600' },
  ];

  // Weekly sales data (mock data for demo)
  const salesData = [
    { name: 'Mon', sales: 24 },
    { name: 'Tue', sales: 31 },
    { name: 'Wed', sales: 45 },
    { name: 'Thu', sales: 28 },
    { name: 'Fri', sales: 52 },
    { name: 'Sat', sales: 67 },
    { name: 'Sun', sales: 39 },
  ];

  // Category distribution from analytics
  const categoryData = analytics?.reduce((acc, product) => {
    const existing = acc.find(item => item.name === product.category);
    if (existing) {
      existing.value += product.monthly_sales;
    } else {
      acc.push({ name: product.category, value: product.monthly_sales });
    }
    return acc;
  }, [] as { name: string; value: number }[]) || [];

  const pieColors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-4 sm:space-y-8 animate-fade-in p-4 sm:p-0">
      <div className="flex items-center justify-between animate-slide-in-top">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white/70 hidden sm:block">Welcome to MK Shopping Portal</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <GlassCard 
            key={index} 
            className="p-4 sm:p-6 hover:scale-105 transition-all duration-300 animate-fade-in-up hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs sm:text-sm">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${stat.color} animate-glow`}>
                <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales Chart */}
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up hover-lift" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Weekly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
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
              <Bar dataKey="sales" fill="url(#colorGradient)" />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        
        {/* Category Distribution */}
        <GlassCard className="p-4 sm:p-6 animate-fade-in-up hover-lift" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: pieColors[index % pieColors.length] }} 
                  />
                  <span className="text-white/70 text-xs sm:text-sm">{item.name}</span>
                </div>
                <span className="text-white font-medium text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
