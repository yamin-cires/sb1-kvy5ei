"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useShoppingCart } from 'use-shopping-cart';
import { FoodItem, Variant } from '@/lib/api';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ItemDetailsSheetProps {
  item: FoodItem;
  onClose: () => void;
}

interface VariantGroup {
  [key: string]: Variant[];
}

export default function ItemDetailsSheet({ item, onClose }: ItemDetailsSheetProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, Variant>>({});
  const { addItem } = useShoppingCart();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const variantGroups = useMemo(() => {
    return item.variants.reduce((groups: VariantGroup, variant) => {
      const group = variant.name.split(' ')[0]; // Assume the group name is the first word of the variant name
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(variant);
      return groups;
    }, {});
  }, [item.variants]);

  const handleVariantSelect = (group: string, variant: Variant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [group]: variant
    }));
  };

  const handleAddToCart = () => {
    const selectedVariantsList = Object.values(selectedVariants);
    const variantNames = selectedVariantsList.map(v => v.name).join(', ');
    const variantsPrice = selectedVariantsList.reduce((sum, v) => sum + v.price, 0);
    const totalPrice = item.price + variantsPrice;
    
    addItem({
      id: `${item.id}-${variantNames}`,
      name: variantNames ? `${item.name} - ${variantNames}` : item.name,
      price: totalPrice * 100, // Convert to cents
      currency: 'USD',
      image: item.image
    });
    onClose();
  };

  const isAddToCartDisabled = useMemo(() => {
    // Check if all required variant groups are selected
    const requiredGroups = ['Size']; // Add more required groups if needed
    return !requiredGroups.every(group => selectedVariants[group]);
  }, [selectedVariants]);

  const totalPrice = useMemo(() => {
    const variantsPrice = Object.values(selectedVariants).reduce((sum, variant) => sum + variant.price, 0);
    return item.price + variantsPrice;
  }, [item.price, selectedVariants]);

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side={isMobile ? "bottom" : "right"} className="w-full sm:max-w-lg">
        <div className="relative h-48 -mx-6 -mt-6 mb-4">
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <SheetHeader>
          <SheetTitle>{item.name}</SheetTitle>
          <SheetDescription>{item.description}</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="mb-4 font-semibold">Base Price: ${item.price.toFixed(2)}</p>
          {Object.entries(variantGroups).map(([group, variants]) => (
            <div key={group} className="mb-4">
              <h3 className="mb-2 font-semibold">{group}:</h3>
              <RadioGroup
                onValueChange={(value) => handleVariantSelect(group, JSON.parse(value))}
                value={selectedVariants[group] ? JSON.stringify(selectedVariants[group]) : undefined}
              >
                {variants.map((variant) => (
                  <div key={variant.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={JSON.stringify(variant)} id={`${group}-${variant.id}`} />
                    <Label htmlFor={`${group}-${variant.id}`}>
                      {variant.name.split(' ').slice(1).join(' ')} 
                      {variant.price > 0 && ` - $${variant.price.toFixed(2)}`}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <p className="mt-4 font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <SheetFooter>
          <Button onClick={handleAddToCart} disabled={isAddToCartDisabled} className="w-full">
            Add to Cart - ${totalPrice.toFixed(2)}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}