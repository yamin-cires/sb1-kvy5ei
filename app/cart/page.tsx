"use client";

import { useShoppingCart } from 'use-shopping-cart';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';

export default function CartPage() {
  const { cartDetails, removeItem, setItemQuantity, formattedTotalPrice, redirectToCheckout } = useShoppingCart();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckout = async () => {
    if (isRedirecting) return; // Prevent multiple clicks
    setIsRedirecting(true);

    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.error('Checkout error:', result.error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {Object.values(cartDetails).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {Object.values(cartDetails).map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${(item.price / 100).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={() => setItemQuantity(item.id, item.quantity - 1)}>-</Button>
                <span className="mx-2">{item.quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setItemQuantity(item.id, item.quantity + 1)}>+</Button>
                <Button variant="destructive" size="sm" className="ml-4" onClick={() => removeItem(item.id)}>Remove</Button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-2xl font-bold">Total: {formattedTotalPrice}</p>
            <Button className="mt-4" onClick={handleCheckout} disabled={isRedirecting}>
              {isRedirecting ? 'Redirecting...' : 'Proceed to Checkout'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}