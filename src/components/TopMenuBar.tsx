
import React from 'react';
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

const TopMenuBar = () => {
  const handleLogout = () => {
    localStorage.removeItem('mk_shopping_auth');
    window.location.href = '/';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-3 flex items-center justify-between animate-fade-in">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-white">MK Shopping Portal</h1>
        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
          Live
        </Badge>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative text-white/70 hover:text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-3">
              <h3 className="font-medium text-white mb-2">Notifications</h3>
              <div className="space-y-2">
                <div className="p-2 bg-white/5 rounded text-sm text-white/80">
                  Low stock alert: iPhone 15 Pro (5 remaining)
                </div>
                <div className="p-2 bg-white/5 rounded text-sm text-white/80">
                  New sale recorded: Nike Air Max
                </div>
                <div className="p-2 bg-white/5 rounded text-sm text-white/80">
                  Monthly report available for download
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
          <Settings className="w-5 h-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
              <User className="w-5 h-5" />
              <span className="ml-2">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/10 backdrop-blur-md border-white/20">
            <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/10">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-300 hover:text-red-200 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopMenuBar;
