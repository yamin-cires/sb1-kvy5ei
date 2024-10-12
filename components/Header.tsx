"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserMenuSheet from './UserMenuSheet';
import LocationSheet from './LocationSheet';

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);

  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={() => setIsLocationSheetOpen(true)}
        >
          <MapPin className="h-5 w-5" />
        </Button>
        
        <Link href="/" className="text-2xl font-bold text-primary">
          Delicious Eats
        </Link>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={() => setIsUserMenuOpen(true)}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
      <UserMenuSheet isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
      <LocationSheet isOpen={isLocationSheetOpen} onClose={() => setIsLocationSheetOpen(false)} />
    </header>
  );
}