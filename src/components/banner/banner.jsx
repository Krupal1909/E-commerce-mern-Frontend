import React from 'react';
import { Truck, Heart, Leaf, DollarSign } from 'lucide-react';

const WhyWeAreBest = () => {
  return (
    <div className="w-full bg-gray-50 py-16"> {/* Changed background color and increased padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added max-width and responsive padding */}
        <div className="flex flex-col md:flex-row items-center justify-between rounded-3xl p-8 md:p-12 shadow-md border border-gray-100 overflow-hidden gap-12 bg-white">
          
          {/* Left Image with extended background */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative">
            <div className="absolute inset-0 bg-emerald-50 -left-1/2 -right-1/2 -z-10"></div> {/* Extended background */}
            <img
              src="../../../public/assets/bottom_banner_image_sm-BH0VEQKF.png"
              alt="Grocery Basket"
              className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[300px] object-contain relative z-10"
            />
            {/* Fast Delivery Badge */}
            {/* <div className="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 z-20">
              <Truck className="text-emerald-500 w-5 h-5" />
              <div className="text-sm font-semibold text-blue-600">Fast Delivery</div>
              <span className="text-xs text-gray-500">In 30 Min</span>
            </div> */}
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 px-6 md:px-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-600">
              Why We Are the Best?
            </h2>

            <div className="space-y-5">
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Fastest Delivery</h4>
                  <p className="text-sm text-gray-600">
                    Groceries delivered in under 30 minutes.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <Leaf size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Freshness Guaranteed</h4>
                  <p className="text-sm text-gray-600">
                    Fresh produce straight from the source.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <DollarSign size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Affordable Prices</h4>
                  <p className="text-sm text-gray-600">
                    Quality groceries at unbeatable prices.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Trusted by Thousands</h4>
                  <p className="text-sm text-gray-600">
                    Loved by 10,000+ happy customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyWeAreBest;