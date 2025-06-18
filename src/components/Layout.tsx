
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Package, TrendingUp, Calendar, FileDown } from 'lucide-react';
import TopMenuBar from './TopMenuBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: "Today's Sales", href: '/today-sales', icon: TrendingUp },
    { name: 'Monthly Sales', href: '/monthly-sales', icon: Calendar },
    { name: 'Yearly Sales', href: '/yearly-sales', icon: Calendar },
    { name: 'Export Data', href: '/export', icon: FileDown },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Top Menu Bar */}
      <TopMenuBar />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white/10 backdrop-blur-md border-r border-white/20 z-40 mt-16 animate-slide-in-left">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-white/20">
            <h1 className="text-2xl font-bold text-white">MK Shopping</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 animate-fade-in ${
                    isActive
                      ? 'bg-white/20 text-white border border-white/30 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-64 mt-16 min-h-screen">
        <main className="p-8 relative z-10">
          <div className="animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
