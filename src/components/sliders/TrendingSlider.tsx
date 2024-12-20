import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { useTicketmasterEvents } from '../../hooks/useTicketmasterEvents';
import EventCard from '../events/EventCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TrendingSlider() {
  const { events, loading, error } = useTicketmasterEvents({ 
    sort: 'relevance,desc',
    size: 12
  });
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="relative group">
      <button
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 
                 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 
                 transform transition-all duration-200 hover:scale-110 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 
                 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 
                 transform transition-all duration-200 hover:scale-110 disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-indigo-600 !opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100'
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        onSwiper={setSwiperInstance}
        className="!pb-12"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="h-full">
              <EventCard event={event} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}