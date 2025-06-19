
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useUpdateSale, useDeleteSale } from '@/hooks/useSales';
import { useProducts } from '@/hooks/useProducts';

interface EditSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: any;
}

const EditSaleModal: React.FC<EditSaleModalProps> = ({ isOpen, onClose, sale }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: 1,
    sale_price: 0,
    sale_date: new Date()
  });
  const [date, setDate] = useState<Date>();

  const { data: products } = useProducts();
  const updateSale = useUpdateSale();
  const deleteSale = useDeleteSale();

  useEffect(() => {
    if (sale) {
      setFormData({
        product_id: sale.product_id,
        quantity: sale.quantity,
        sale_price: sale.sale_price,
        sale_date: new Date(sale.sale_date)
      });
      setDate(new Date(sale.sale_date));
    }
  }, [sale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSale.mutateAsync({
        id: sale.id,
        ...formData,
        sale_date: date?.toISOString().split('T')[0] || formData.sale_date.toISOString().split('T')[0]
      });
      onClose();
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        await deleteSale.mutateAsync(sale.id);
        onClose();
      } catch (error) {
        console.error('Error deleting sale:', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Sale</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="product" className="text-white/80">Product</Label>
            <Select value={formData.product_id} onValueChange={(value) => setFormData({...formData, product_id: value})}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select a product" />
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
            <Label htmlFor="quantity" className="text-white/80">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="sale_price" className="text-white/80">Sale Price</Label>
            <Input
              id="sale_price"
              type="number"
              step="0.01"
              min="0"
              value={formData.sale_price}
              onChange={(e) => setFormData({...formData, sale_price: parseFloat(e.target.value)})}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-white/80">Sale Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                    !date && "text-white/50"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={updateSale.isPending}
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateSale.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={deleteSale.isPending}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <X className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSaleModal;
