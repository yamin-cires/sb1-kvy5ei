"use client";

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useShoppingCart } from 'use-shopping-cart';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import CartSheet from './CartSheet';

export default function FloatingCart() {
  const { cartCount, formattedTotalPrice } = useShoppingCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (cartCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <Card 
          className="bg-primary text-primary-foreground p-3 flex items-center space-x-2 cursor-pointer transition-colors"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={20} />
          <span>{formattedTotalPrice}</span>
          <Badge variant="secondary" className="ml-2">
            {cartCount}
          </Badge>
        </Card>
      </div>
      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}