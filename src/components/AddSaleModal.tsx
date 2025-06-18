
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/useProducts';
import { useAddSale } from '@/hooks/useSales';

interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSaleModal: React.FC<AddSaleModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: '',
    sale_date: new Date().toISOString().split('T')[0]
  });

  const { data: products } = useProducts();
  const addSale = useAddSale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProduct = products?.find(p => p.id === formData.product_id);
    if (!selectedProduct) return;

    try {
      await addSale.mutateAsync({
        product_id: formData.product_id,
        quantity: parseInt(formData.quantity),
        sale_date: formData.sale_date,
        sale_price: selectedProduct.price * parseInt(formData.quantity)
      });
      
      setFormData({
        product_id: '',
        quantity: '',
        sale_date: new Date().toISOString().split('T')[0]
      });
      onClose();
    } catch (error) {
      console.error('Error recording sale:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <DialogHeader>
          <DialogTitle>Record New Sale</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="product">Product</Label>
            <Select value={formData.product_id} onValueChange={(value) => setFormData({ ...formData, product_id: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products?.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - ${product.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="date">Sale Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.sale_date}
              onChange={(e) => setFormData({ ...formData, sale_date: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              disabled={addSale.isPending}
            >
              Record Sale
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSaleModal;
