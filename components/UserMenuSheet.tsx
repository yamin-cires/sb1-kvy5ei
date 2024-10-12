"use client";

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ClipboardList, Info, FileText, LogIn } from 'lucide-react';

interface UserMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserMenuSheet({ isOpen, onClose }: UserMenuSheetProps) {
  const menuItems = [
    { icon: ClipboardList, label: 'My Orders', action: () => console.log('My Orders clicked') },
    { icon: Info, label: 'About', action: () => console.log('About clicked') },
    { icon: FileText, label: 'Terms', action: () => console.log('Terms clicked') },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-6">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start"
              onClick={item.action}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <Button className="w-full" onClick={() => console.log('Login clicked')}>
            <LogIn className="mr-2 h-5 w-5" />
            Login
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}