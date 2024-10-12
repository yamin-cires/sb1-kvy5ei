import FoodList from '@/components/FoodList';
import { HomeCarousel } from '@/components/HomeCarousel';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HomeCarousel />
      <div className="container mx-auto px-4">
        <FoodList />
      </div>
    </div>
  );
}