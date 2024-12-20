import { Search } from 'lucide-react';
import SearchBar from '../search/SearchBar';

export default function Banner() {
  return (
    <div className="relative min-h-[600px] -mx-4 sm:-mx-6 lg:-mx-8 mb-12">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&h=1080&fit=crop"
          alt="Concert crowd"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get the best seats in the house
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Find tickets for concerts, sports, theater and more. 100% guaranteed.
          </p>

          <div className="max-w-xl">
            <SearchBar />
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { title: '100% Guaranteed', description: 'Valid tickets or your money back' },
              { title: 'Best Prices', description: 'Find the perfect seats at great prices' },
              { title: 'Secure Checkout', description: 'Safe & encrypted transactions' }
            ].map((item, index) => (
              <div key={index} className="text-white">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}