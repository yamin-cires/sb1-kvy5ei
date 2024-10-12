"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFoodItems } from '@/hooks/useFoodItems';
import { useInView } from 'react-intersection-observer';
import CategoryFilter from './CategoryFilter';
import { FoodItem } from '@/lib/api';
import ItemDetailsSheet from './ItemDetailsSheet';
import SearchBar from './SearchBar';

export default function FoodList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFoodItems(selectedCategory || undefined);
  const { ref, inView } = useInView();
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    refetch();
  }, [selectedCategory, refetch]);

  const filteredItems = data?.pages.flatMap(page => 
    page.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-background py-4 border-b">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={setSearchQuery} />
          <div className="mt-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="font-semibold">${item.price.toFixed(2)}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div ref={ref} className="mt-8 text-center">
          {isFetchingNextPage ? (
            <p>Loading more...</p>
          ) : hasNextPage ? (
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              Load More
            </Button>
          ) : (
            <p>No more items to load</p>
          )}
        </div>
      </div>
      {selectedItem && (
        <ItemDetailsSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}