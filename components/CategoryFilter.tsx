import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categoryImages: { [key: string]: string } = {
  Pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop",
  Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
  Salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop",
  Pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=100&h=100&fit=crop",
  Sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop",
  Dessert: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=100&h=100&fit=crop",
  Drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop",
  Sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=100&h=100&fit=crop",
  Breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=100&h=100&fit=crop",
  Mexican: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=100&h=100&fit=crop",
};

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-0 z-10" 
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto scrollbar-hide space-x-2 px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => onSelectCategory(null)}
            className="rounded-full whitespace-nowrap"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onSelectCategory(category)}
              className="rounded-full flex items-center space-x-2 whitespace-nowrap"
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={categoryImages[category]}
                  alt={category}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span>{category}</span>
            </Button>
          ))}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 z-10" 
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}