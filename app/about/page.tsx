import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Delicious Eats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="mb-4">
            Delicious Eats is your go-to destination for a diverse range of culinary delights. 
            Founded in 2023, we've been on a mission to bring the best flavors from around the 
            world right to your doorstep.
          </p>
          <p className="mb-4">
            Our team of passionate chefs and food enthusiasts work tirelessly to curate a menu 
            that caters to all tastes and dietary preferences. From classic comfort foods to 
            exotic international cuisines, we've got something for everyone.
          </p>
          <p>
            At Delicious Eats, we believe in using only the freshest ingredients and maintaining 
            the highest standards of quality and hygiene. Our commitment to excellence extends 
            beyond just great food - we strive to provide an exceptional ordering and delivery 
            experience that keeps our customers coming back for more.
          </p>
        </div>
        <div className="relative h-[400px]">
          <Image 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop" 
            alt="Restaurant kitchen" 
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}