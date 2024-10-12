import { useInfiniteQuery } from '@tanstack/react-query';
import { getFoodItems, FoodItem } from '@/lib/api';

export function useFoodItems(category?: string) {
  return useInfiniteQuery<{ items: FoodItem[], totalItems: number }>({
    queryKey: ['foodItems', category],
    queryFn: ({ pageParam = 1 }) => getFoodItems(pageParam, 6, category),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce((total, page) => total + page.items.length, 0);
      return loadedItems < lastPage.totalItems ? allPages.length + 1 : undefined;
    },
  });
}