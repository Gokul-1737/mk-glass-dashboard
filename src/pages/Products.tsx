
import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, ShoppingCart } from 'lucide-react';
import { useSalesAnalytics, useDeleteProduct } from '@/hooks/useProducts';
import ProductEditModal from '@/components/ProductEditModal';
import AddSaleModal from '@/components/AddSaleModal';
import { toast } from 'sonner';

const Products = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  
  const { data: products, isLoading } = useSalesAnalytics();
  const deleteProduct = useDeleteProduct();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteProduct.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between animate-slide-in-top">
        <h1 className="text-3xl font-bold text-white">Products Management</h1>
        <div className="flex space-x-3">
          <Button 
            onClick={() => setIsSaleModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Record Sale
          </Button>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {products?.map((product, index) => (
          <GlassCard 
            key={product.id} 
            className="p-6 hover:scale-105 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <Badge variant="secondary" className="mt-1 bg-white/10 text-white/70">
                  {product.category}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setEditingProduct(product)}
                  className="text-white/70 hover:text-white hover:bg-white/10 transform hover:scale-110 transition-all duration-200"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleDelete(product.id, product.name)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transform hover:scale-110 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Price:</span>
                <span className="text-white font-medium">${product.price}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/20 rounded-lg p-3 text-center transform hover:scale-105 transition-all duration-200">
                  <p className="text-green-300 text-sm">Today's Sales</p>
                  <p className="text-white font-bold text-lg">{product.today_sales}</p>
                  <p className="text-green-300/70 text-xs">
                    Remaining: {product.total_stock - product.today_sales}
                  </p>
                </div>
                
                <div className="bg-blue-500/20 rounded-lg p-3 text-center transform hover:scale-105 transition-all duration-200">
                  <p className="text-blue-300 text-sm">Monthly Sales</p>
                  <p className="text-white font-bold text-lg">{product.monthly_sales}</p>
                  <p className="text-blue-300/70 text-xs">
                    Remaining: {product.total_stock - product.monthly_sales}
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-500/20 rounded-lg p-3 text-center transform hover:scale-105 transition-all duration-200">
                <p className="text-purple-300 text-sm">Yearly Sales</p>
                <p className="text-white font-bold text-lg">{product.yearly_sales}</p>
                <p className="text-purple-300/70 text-xs">
                  Total Stock: {product.total_stock}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Modals */}
      <ProductEditModal
        isOpen={!!editingProduct || isAddModalOpen}
        onClose={() => {
          setEditingProduct(null);
          setIsAddModalOpen(false);
        }}
        product={editingProduct}
      />
      
      <AddSaleModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
      />
    </div>
  );
};

export default Products;
