"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from 'use-shopping-cart';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}
        successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
        cancelUrl={`${process.env.NEXT_PUBLIC_URL}/cancel`}
        currency="USD"
        allowedCountries={['US', 'GB', 'CA']}
        billingAddressCollection={true}
      >
        {children}
      </CartProvider>
    </QueryClientProvider>
  );
}