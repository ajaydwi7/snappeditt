import { useState } from 'react';
import { Search, ChevronDown, StarIcon, HeartIcon } from 'lucide-react';
import Sidebar from "../partials/Sidebar";
import Header from '../partials/Header';

export default function ShopPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPrice, setSelectedPrice] = useState('All Price');
  const [sortBy, setSortBy] = useState('Popularity');

  const products = [
    {
      id: 1,
      name: 'Apple iPhone 12',
      price: 799,
      rating: 4.8,
      reviews: 134,
      image: 'https://cdn.thewirecutter.com/wp-content/media/2023/09/iphone-2048px-9765.jpg'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      price: 699,
      rating: 4.6,
      reviews: 89,
      image: 'https://cdn.thewirecutter.com/wp-content/media/2023/09/androidphones-2048px-00022.jpg'
    },
    // Add more products as needed
  ];

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Services</h1>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by category..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-gray-400
                     focus:border-gray-300"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-black transition duration-150 ease-in-out">
                  Search
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-4 sm:mb-0">Popular Items</h1>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Category filter */}
                  <div className="relative">
                    <button className="w-full flex items-center justify-between bg-white border border-slate-200 rounded px-3 py-2">
                      <span>{selectedCategory}</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded mt-1 py-2 hidden">
                      {/* Dropdown items */}
                      <button className="w-full px-3 py-1 hover:bg-slate-50 text-left">All Categories</button>
                      <button className="w-full px-3 py-1 hover:bg-slate-50 text-left">Electronics</button>
                      <button className="w-full px-3 py-1 hover:bg-slate-50 text-left">Accessories</button>
                    </div>
                  </div>

                  {/* Price filter */}
                  <div className="relative">
                    <button className="w-full flex items-center justify-between bg-white border border-slate-200 rounded px-3 py-2">
                      <span>{selectedPrice}</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                  </div>

                  {/* Sort by */}
                  <div className="relative">
                    <button className="w-full flex items-center justify-between bg-white border border-slate-200 rounded px-3 py-2">
                      <span>Sort by: {sortBy}</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-sm border border-slate-200 transition-shadow hover:shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-sm"
        />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
        >
          <HeartIcon className={`w-6 h-6 ${liked ? 'text-rose-500' : 'text-slate-400'}`} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>

        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-300'}`}
              />
            ))}<span className="text-sm text-slate-500">({product.reviews} reviews)</span>
          </div>
          <span className="text-lg font-bold text-emerald-600">${product.price}</span>
        </div>
        <div className='flex space-x-4'>
          <button className="w-lg bg-black hover:bg-black text-white py-2 px-4 rounded-lg transition-colors">
            Edit
          </button>
          <button className="w-lg bg-black hover:bg-black text-white py-2 px-4 rounded-lg transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}