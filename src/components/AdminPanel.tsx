
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Database, 
  Activity, 
  Shield, 
  BarChart3, 
  Settings2,
  Server,
  FileText
} from 'lucide-react';

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ open, onOpenChange }) => {
  const [activeUsers] = useState(12);
  const [totalSales] = useState(45670);
  const [systemHealth] = useState(98);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-white/20 text-white animate-scale-in max-h-[80vh] overflow-y-auto">
        <DialogHeader className="animate-fade-in">
          <DialogTitle className="flex items-center text-xl font-bold">
            <div className="mr-3 p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg animate-glow">
              <Shield className="w-5 h-5 animate-pulse" />
            </div>
            🔐 Admin Control Panel
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full animate-fade-in-up">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-pink-500/30">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-pink-500/30">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-pink-500/30">
              <Database className="w-4 h-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-pink-500/30">
              <Server className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 animate-slide-in-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-400/30 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-white">{activeUsers}</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-400 animate-pulse" />
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Total Sales</p>
                    <p className="text-2xl font-bold text-white">₹{totalSales.toLocaleString()}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-400 animate-bounce" />
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm">System Health</p>
                    <p className="text-2xl font-bold text-white">{systemHealth}%</p>
                  </div>
                  <Shield className="w-8 h-8 text-purple-400 animate-spin-slow" />
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-400" />
                Recent Activity
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-white/80">New sale recorded</span>
                  <Badge className="bg-green-500/20 text-green-300">2 min ago</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-white/80">Product inventory updated</span>
                  <Badge className="bg-blue-500/20 text-blue-300">5 min ago</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-white/80">User login detected</span>
                  <Badge className="bg-purple-500/20 text-purple-300">10 min ago</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4 animate-slide-in-right">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-3">User Management</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">A</span>
                    </div>
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-white/60">admin@mkshopping.com</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="database" className="space-y-4 animate-fade-in">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-green-400" />
                Database Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                  <p className="text-green-300 font-medium">Products Table</p>
                  <p className="text-white/80 text-sm">Connected & Healthy</p>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                  <p className="text-green-300 font-medium">Sales Table</p>
                  <p className="text-white/80 text-sm">Connected & Healthy</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4 animate-slide-in-top">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Settings2 className="w-5 h-5 mr-2 text-orange-400 animate-spin-slow" />
                System Configuration
              </h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="apiKey" className="text-white/80">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value="sk-****************************"
                    readOnly
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
                  🔄 Restart System
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4 animate-slide-in-top">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
