import React from 'react';

const categories = [
  {
    title: 'Organic veggies',
    image: '../../../public/assets/vegatable.png',
    bgColor: 'bg-yellow-100',
  },
  {
    title: 'Fresh Fruits',
    image: '../../../public/assets/fruits.png',
    bgColor: 'bg-red-100',
  },
  {
    title: 'Cold Drinks',
    image: '../../../public/assets/bottle.png',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Instant Food',
    image: '../../../public/assets/maggie.png',
    bgColor: 'bg-teal-100',
  },
  {
    title: 'Dairy Products',
    image: '../../../public/assets/dairy.png',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Bakery & Breads',
    image: '../../../public/assets/bread.png',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Grains & Cereals',
    image: '../../../public/assets/masala.png',
    bgColor: 'bg-purple-100',
  },
];

const category = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h4 className="text-2xl md:text-xl font-semibold font-outfit text-slate-700 mb-4">Categories</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 mb-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-4 flex flex-col items-center justify-center ${cat.bgColor} hover:shadow-md transition duration-300 ease-in-out`}
          >
            <img src={cat.image} alt={cat.title} className="w-20 h-20 object-contain mb-4" />
            <p className="font-[14px] text-slate-800 font-outfit text-center">{cat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default category;
