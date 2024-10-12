"use client";

import React, { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ChevronLeft } from 'lucide-react';
import LocationSheet from './LocationSheet';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESTAURANT_LOCATION = { lat: 40.7128, lng: -74.0060 }; // Example coordinates
const DELIVERY_RADIUS = 0.5; // in kilometers

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const { cartDetails, removeItem, setItemQuantity, formattedTotalPrice, redirectToCheckout } = useShoppingCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleCheckout = async () => {
    if (isRedirecting) return;
    setIsRedirecting(true);

    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.error('Checkout error:', result.error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsRedirecting(false);
    }
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setUserLocation(location);
    setIsLocationSheetOpen(false);
    setCheckoutStep(2);
  };

  const isUserInRestaurant = () => {
    if (!userLocation) return false;
    const distance = calculateDistance(
      userLocation.lat, userLocation.lng,
      RESTAURANT_LOCATION.lat, RESTAURANT_LOCATION.lng
    );
    return distance <= DELIVERY_RADIUS;
  };

  const renderCartDetails = () => (
    <>
      <ScrollArea className="flex-grow mt-4 h-[calc(100%-130px)]">
        {Object.values(cartDetails).length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          Object.values(cartDetails).map((item) => (
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
          ))
        )}
      </ScrollArea>
      <SheetFooter className="mt-4">
        <div className="w-full">
          <p className="text-2xl font-bold mb-4">Total: {formattedTotalPrice}</p>
          <Button 
            className="w-full" 
            onClick={() => setCheckoutStep(1)} 
            disabled={Object.values(cartDetails).length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </SheetFooter>
    </>
  );

  const renderLocationStep = () => (
    <div className="mt-4">
      <Button variant="ghost" onClick={() => setCheckoutStep(0)} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Button>
      <h2 className="text-xl font-semibold mb-4">Select Your Location</h2>
      <Button 
        className="w-full" 
        onClick={() => setIsLocationSheetOpen(true)}
      >
        Set Your Location
      </Button>
    </div>
  );

  const renderTableSelection = () => (
    <div className="mt-4">
      <Button variant="ghost" onClick={() => setCheckoutStep(1)} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Location
      </Button>
      <h2 className="text-xl font-semibold mb-4">Select a Table</h2>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((table) => (
          <Button
            key={table}
            variant={selectedTable === table ? "default" : "outline"}
            onClick={() => setSelectedTable(table)}
          >
            Table {table}
          </Button>
        ))}
      </div>
      <Button 
        className="w-full mt-4" 
        onClick={handleCheckout} 
        disabled={isRedirecting || !selectedTable}
      >
        {isRedirecting ? 'Processing...' : 'Complete Order'}
      </Button>
    </div>
  );

  const renderDeliveryConfirmation = () => (
    <div className="mt-4">
      <Button variant="ghost" onClick={() => setCheckoutStep(1)} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Location
      </Button>
      <h2 className="text-xl font-semibold mb-4">Delivery Confirmation</h2>
      <p>Your order will be delivered to your current location.</p>
      <p className="mt-2">Delivery Fee: $5.00</p>
      <Button 
        className="w-full mt-4" 
        onClick={handleCheckout} 
        disabled={isRedirecting}
      >
        {isRedirecting ? 'Processing...' : 'Complete Order'}
      </Button>
    </div>
  );

  const renderCheckoutStep = () => {
    switch (checkoutStep) {
      case 1:
        return renderLocationStep();
      case 2:
        return isUserInRestaurant() ? renderTableSelection() : renderDeliveryConfirmation();
      default:
        return renderCartDetails();
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side={isMobile ? "bottom" : "right"} 
          className={isMobile ? "h-[85vh]" : "w-[400px] sm:w-[540px]"}
        >
          <SheetHeader>
            <SheetTitle>
              {checkoutStep === 0 ? "Your Cart" : 
               checkoutStep === 1 ? "Select Location" :
               isUserInRestaurant() ? "Select Table" : "Delivery Confirmation"}
            </SheetTitle>
          </SheetHeader>
          {renderCheckoutStep()}
        </SheetContent>
      </Sheet>
      <LocationSheet 
        isOpen={isLocationSheetOpen} 
        onClose={() => setIsLocationSheetOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
}