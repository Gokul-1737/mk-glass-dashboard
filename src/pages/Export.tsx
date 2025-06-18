
import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileSpreadsheet, Calendar, Package } from 'lucide-react';
import { toast } from 'sonner';

const Export = () => {
  const [selectedData, setSelectedData] = useState({
    products: true,
    todaySales: true,
    monthlySales: true,
    yearlySales: true,
    inventory: false,
    customers: false,
  });

  const [dateRange, setDateRange] = useState('all');
  const [format, setFormat] = useState('xlsx');

  const handleExport = () => {
    toast.success(`Exporting data as ${format.toUpperCase()}... Download will start shortly.`);
    console.log('Export configuration:', { selectedData, dateRange, format });
  };

  const exportOptions = [
    { key: 'products', label: 'Product Information', icon: Package },
    { key: 'todaySales', label: "Today's Sales Data", icon: Calendar },
    { key: 'monthlySales', label: 'Monthly Sales Data', icon: Calendar },
    { key: 'yearlySales', label: 'Yearly Sales Data', icon: Calendar },
    { key: 'inventory', label: 'Inventory Levels', icon: Package },
    { key: 'customers', label: 'Customer Data', icon: Package },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Export Data</h1>
        <div className="flex items-center text-white/70">
          <FileSpreadsheet className="w-5 h-5 mr-2" />
          Data Export Center
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Select Data to Export</h3>
            <div className="space-y-4">
              {exportOptions.map((option) => (
                <div key={option.key} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.key}
                    checked={selectedData[option.key as keyof typeof selectedData]}
                    onCheckedChange={(checked) =>
                      setSelectedData(prev => ({ ...prev, [option.key]: checked }))
                    }
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <div className="flex items-center">
                    <option.icon className="w-4 h-4 text-white/70 mr-2" />
                    <label htmlFor={option.key} className="text-white cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Export Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">File Format</label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* Export Summary */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Export Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/70">Selected Items:</span>
                <span className="text-white font-medium">
                  {Object.values(selectedData).filter(Boolean).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Date Range:</span>
                <span className="text-white font-medium capitalize">{dateRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Format:</span>
                <span className="text-white font-medium">{format.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Est. File Size:</span>
                <span className="text-white font-medium">~2.4 MB</span>
              </div>
            </div>
            
            <Button
              onClick={handleExport}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              disabled={Object.values(selectedData).every(v => !v)}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => {
                  setSelectedData({
                    products: true,
                    todaySales: true,
                    monthlySales: true,
                    yearlySales: true,
                    inventory: true,
                    customers: true,
                  });
                  toast.info('All data selected for export');
                }}
              >
                Select All
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => {
                  setSelectedData({
                    products: true,
                    todaySales: true,
                    monthlySales: true,
                    yearlySales: true,
                    inventory: false,
                    customers: false,
                  });
                  toast.info('Sales data selected for export');
                }}
              >
                Sales Data Only
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Export;
