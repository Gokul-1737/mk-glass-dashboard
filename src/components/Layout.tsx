
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Package, TrendingUp, Calendar, FileDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import TopMenuBar from './TopMenuBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: "Today's Sales", href: '/today-sales', icon: TrendingUp },
    { name: 'Monthly Sales', href: '/monthly-sales', icon: Calendar },
    { name: 'Yearly Sales', href: '/yearly-sales', icon: Calendar },
    { name: 'Export Data', href: '/export', icon: FileDown },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Online Shopping Background */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center animate-pulse-slow"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`
        }}
      />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Top Menu Bar */}
      <div className="relative z-20">
        <TopMenuBar 
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-500 hover:scale-110 hover:rotate-90 hover:bg-white/20 animate-glow"
      >
        <div className={`transition-all duration-300 ${sidebarOpen ? 'rotate-180' : ''}`}>
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </div>
      </button>
      
      {/* Collapsible Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-white/10 backdrop-blur-md border-r border-white/20 z-40 mt-16 transform transition-all duration-500 ease-out ${
        sidebarOpen ? 'translate-x-0 scale-100' : '-translate-x-full scale-95'
      } lg:translate-x-0 lg:scale-100 animate-slide-in-left ${
        sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
      } w-64`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-white/20 animate-bounce-in">
            <div className="relative group cursor-pointer" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              {sidebarCollapsed ? (
                <div className="text-2xl animate-glow">🏪</div>
              ) : (
                <h1 className="text-xl sm:text-2xl font-bold text-white transform transition-all duration-300 hover:scale-110 hover:rotate-3 animate-glow">
                  🏪 MK Shopping
                </h1>
              )}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-fade-in ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border border-white/30 shadow-lg animate-glow'
                      : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-lg'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    perspective: '1000px'
                  }}
                  title={sidebarCollapsed ? item.name : ''}
                >
                  <div className={`transition-all duration-300 transform group-hover:scale-110 ${
                    isActive ? 'animate-bounce' : 'group-hover:rotate-12'
                  } ${sidebarCollapsed ? 'mr-0' : 'mr-3'}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  {!sidebarCollapsed && (
                    <>
                      <span className="transform transition-all duration-300 group-hover:translate-x-1">
                        {item.name}
                      </span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-white/20 animate-slide-in-top">
            <div className="text-center text-white/50 text-xs transform hover:scale-105 transition-all duration-300 cursor-pointer">
              {sidebarCollapsed ? (
                <div className="animate-pulse">✨</div>
              ) : (
                <div className="animate-pulse">✨ Portal v2.0</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30 mt-16 backdrop-blur-sm animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className={`mt-16 min-h-screen relative z-10 transition-all duration-500 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <main className="p-4 sm:p-8">
          <div className="animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
