
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, User, Bell, Palette, Shield } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onOpenChange }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    emailAlerts: true,
    companyName: 'MK Shopping',
    userEmail: 'admin@mkshopping.com'
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-white/20 text-white animate-scale-in">
        <DialogHeader className="animate-fade-in">
          <DialogTitle className="flex items-center text-xl font-bold">
            <div className="mr-3 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-glow">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            Smart Portal Settings
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full animate-fade-in-up">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md">
            <TabsTrigger value="general" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/30 data-[state=active]:to-purple-500/30">
              <User className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/30 data-[state=active]:to-purple-500/30">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/30 data-[state=active]:to-purple-500/30">
              <Palette className="w-4 h-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/30 data-[state=active]:to-purple-500/30">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 animate-slide-in-left">
            <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div>
                <Label htmlFor="company" className="text-white/80">Company Name</Label>
                <Input
                  id="company"
                  value={settings.companyName}
                  onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-300"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white/80">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.userEmail}
                  onChange={(e) => setSettings({...settings, userEmail: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-300"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 animate-slide-in-right">
            <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-white/80">Push Notifications</Label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="emailAlerts" className="text-white/80">Email Alerts</Label>
                <Switch
                  id="emailAlerts"
                  checked={settings.emailAlerts}
                  onCheckedChange={(checked) => setSettings({...settings, emailAlerts: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="autoSync" className="text-white/80">Auto Sync Data</Label>
                <Switch
                  id="autoSync"
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => setSettings({...settings, autoSync: checked})}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4 animate-fade-in">
            <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode" className="text-white/80">Dark Mode</Label>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 border border-blue-400/30">
                  <div className="w-full h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-2"></div>
                  <p className="text-xs text-white/70">Ocean Theme</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 border border-green-400/30">
                  <div className="w-full h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded mb-2"></div>
                  <p className="text-xs text-white/70">Forest Theme</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 border border-orange-400/30">
                  <div className="w-full h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded mb-2"></div>
                  <p className="text-xs text-white/70">Sunset Theme</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 animate-slide-in-top">
            <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                <h4 className="text-yellow-300 font-medium mb-2">🔐 Security Status</h4>
                <p className="text-white/70 text-sm">Your account is secure with 2FA enabled.</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300">
                Change Password
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4 animate-slide-in-top">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
