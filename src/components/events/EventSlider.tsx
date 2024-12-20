import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import EventCard from './EventCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface EventSliderProps {
  events: any[];
}

export default function EventSlider({ events }: EventSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative group">
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 
                 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 
                 transform transition-all duration-200 hover:scale-110 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 
                 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 
                 transform transition-all duration-200 hover:scale-110 disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-indigo-600 !opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100'
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