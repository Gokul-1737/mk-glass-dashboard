
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/GlassCard';
import { TrendingUp, Package, ShoppingCart, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Products', value: '156', icon: Package, color: 'from-blue-500 to-purple-600' },
    { title: "Today's Sales", value: '47', icon: ShoppingCart, color: 'from-green-500 to-teal-600' },
    { title: 'Monthly Sales', value: '1,234', icon: TrendingUp, color: 'from-orange-500 to-red-600' },
    { title: 'Revenue', value: '$12,450', icon: DollarSign, color: 'from-purple-500 to-pink-600' },
  ];

  const salesData = [
    { name: 'Mon', sales: 24 },
    { name: 'Tue', sales: 31 },
    { name: 'Wed', sales: 45 },
    { name: 'Thu', sales: 28 },
    { name: 'Fri', sales: 52 },
    { name: 'Sat', sales: 67 },
    { name: 'Sun', sales: 39 },
  ];

  const pieData = [
    { name: 'Electronics', value: 35, color: '#8B5CF6' },
    { name: 'Clothing', value: 28, color: '#06B6D4' },
    { name: 'Books', value: 20, color: '#10B981' },
    { name: 'Home & Garden', value: 17, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white/70">Welcome to MK Shopping Portal</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <GlassCard key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
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
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
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
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  <span className="text-white/70 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
