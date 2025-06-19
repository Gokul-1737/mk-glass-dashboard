
import React, { useState } from 'react';
import { User, Settings, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import SettingsModal from './SettingsModal';
import AdminPanel from './AdminPanel';

const TopMenuBar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('mk_shopping_auth');
    window.location.href = '/';
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-3 flex items-center justify-between animate-slide-in-top relative overflow-hidden">
        {/* 3D Background Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="flex items-center space-x-4 relative z-10">
          {/* 3D Animated Portal Title */}
          <div className="relative group">
            <h1 className="text-xl font-bold text-white transform transition-all duration-500 hover:scale-110 animate-glow perspective-1000">
              🌟 MK Shopping Portal
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
          
          {/* 3D Animated Live Badge */}
          <div className="relative">
            <Badge variant="secondary" className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-300 border border-green-400/30 animate-pulse transform hover:scale-110 transition-all duration-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping" />
              Live Portal
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 relative z-10">
          {/* 3D Animated Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-white/70 hover:text-white hover:bg-white/10 transform transition-all duration-300 hover:scale-110 hover:rotate-12 animate-float">
                <div className="transform transition-all duration-300 hover:animate-bounce">
                  <Bell className="w-5 h-5" />
                </div>
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse border-2 border-white/20">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white/10 backdrop-blur-md border-white/20 animate-slide-in-right">
              <div className="p-3">
                <h3 className="font-medium text-white mb-2 flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2 animate-pulse" />
                  Smart Notifications
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg text-sm text-white/80 transform hover:scale-105 transition-all duration-300 border border-white/10">
                    📱 Low stock alert: iPhone 15 Pro (5 remaining)
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg text-sm text-white/80 transform hover:scale-105 transition-all duration-300 border border-white/10">
                    💰 New sale recorded: Nike Air Max
                  </div>
                  <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg text-sm text-white/80 transform hover:scale-105 transition-all duration-300 border border-white/10">
                    📊 Monthly report available for download
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 3D Animated Settings Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSettingsOpen(true)}
            className="text-white/70 hover:text-white hover:bg-white/10 transform transition-all duration-300 hover:scale-110 hover:rotate-90 animate-glow"
          >
            <Settings className="w-5 h-5 transform transition-all duration-500 hover:animate-spin" />
          </Button>

          {/* 3D Animated User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 transform transition-all duration-300 hover:scale-110 group">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <User className="w-5 h-5 transform transition-all duration-300 group-hover:scale-110" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                  </div>
                  <span className="transform transition-all duration-300 group-hover:translate-x-1">Admin</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/10 backdrop-blur-md border-white/20 animate-slide-in-right">
              <DropdownMenuItem 
                onClick={() => setAdminPanelOpen(true)}
                className="text-white/80 hover:text-white hover:bg-white/10 transform transition-all duration-300 hover:scale-105"
              >
                <User className="w-4 h-4 mr-2 transform hover:rotate-12 transition-all duration-300" />
                Admin Panel
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSettingsOpen(true)}
                className="text-white/80 hover:text-white hover:bg-white/10 transform transition-all duration-300 hover:scale-105"
              >
                <Settings className="w-4 h-4 mr-2 transform hover:rotate-90 transition-all duration-300" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-300 hover:text-red-200 hover:bg-red-500/10 transform transition-all duration-300 hover:scale-105"
              >
                <LogOut className="w-4 h-4 mr-2 transform hover:-rotate-12 transition-all duration-300" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      
      {/* Admin Panel Modal */}
      <AdminPanel open={adminPanelOpen} onOpenChange={setAdminPanelOpen} />
    </>
  );
};

export default TopMenuBar;
