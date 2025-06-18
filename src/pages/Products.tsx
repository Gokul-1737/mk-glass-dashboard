
import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      totalStock: 100,
      todaySold: 5,
      monthlySold: 45,
      yearlySold: 89,
      price: '$999'
    },
    {
      id: 2,
      name: 'Samsung Galaxy Book',
      category: 'Electronics',
      totalStock: 75,
      todaySold: 3,
      monthlySold: 28,
      yearlySold: 67,
      price: '$1299'
    },
    {
      id: 3,
      name: 'Nike Air Max',
      category: 'Footwear',
      totalStock: 150,
      todaySold: 8,
      monthlySold: 52,
      yearlySold: 134,
      price: '$129'
    },
    {
      id: 4,
      name: 'MacBook Pro',
      category: 'Electronics',
      totalStock: 50,
      todaySold: 2,
      monthlySold: 15,
      yearlySold: 38,
      price: '$2499'
    },
    {
      id: 5,
      name: 'Adidas Ultraboost',
      category: 'Footwear',
      totalStock: 120,
      todaySold: 6,
      monthlySold: 41,
      yearlySold: 98,
      price: '$180'
    },
  ];

  const calculateRemaining = (total: number, sold: number) => total - sold;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <GlassCard key={product.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <Badge variant="secondary" className="mt-1 bg-white/10 text-white/70">
                  {product.category}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Price:</span>
                <span className="text-white font-medium">{product.price}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/20 rounded-lg p-3 text-center">
                  <p className="text-green-300 text-sm">Today's Sales</p>
                  <p className="text-white font-bold text-lg">{product.todaySold}</p>
                  <p className="text-green-300/70 text-xs">
                    Remaining: {calculateRemaining(product.totalStock, product.todaySold)}
                  </p>
                </div>
                
                <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                  <p className="text-blue-300 text-sm">Monthly Sales</p>
                  <p className="text-white font-bold text-lg">{product.monthlySold}</p>
                  <p className="text-blue-300/70 text-xs">
                    Remaining: {calculateRemaining(product.totalStock, product.monthlySold)}
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-500/20 rounded-lg p-3 text-center">
                <p className="text-purple-300 text-sm">Yearly Sales</p>
                <p className="text-white font-bold text-lg">{product.yearlySold}</p>
                <p className="text-purple-300/70 text-xs">
                  Total Stock: {product.totalStock}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
