// components/category/Category.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${BASE_URL}/api/category/get-category`)
      .then(res => {
        
        setCategories(res.data.categories);
      })
      .catch(err => console.error("Error fetching categories", err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h4 className="text-2xl md:text-xl font-semibold font-outfit text-slate-700 mb-4">Categories</h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 mb-4">
        {Array.isArray(categories) && categories.map((cat) => (
          <Link 
            to={`/products/${cat.name.toLowerCase().replace(/\s+/g, '-')}`} 
            key={cat._id}
            className="rounded-xl p-4 flex flex-col items-center justify-center bg-yellow-100 hover:shadow-md transition duration-300 ease-in-out"
          >
            <img 
              src={cat.image.startsWith('http') ? cat.image : `${BASE_URL}${cat.image}`} 
              alt={cat.name} 
              className="w-20 h-20 object-contain mb-4 hover:scale-150 transition-transform duration-300 ease-in-out"
              onError={(e) => {
                e.target.src = '/placeholder-image.png';
              }}
            />
            <p className="font-[14px] text-gray-700 font-outfit text-center">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;