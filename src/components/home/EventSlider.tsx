import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import EventCard from '../events/EventCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { TicketmasterEvent } from '../../types/api';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface EventSliderProps {
  events?: TicketmasterEvent[];
  loading?: boolean;
  error?: Error | null;
}

export default function EventSlider({ events = [], loading = false, error = null }: EventSliderProps) {
  const [swiper, setSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <ErrorMessage message="Unable to load events. Please try again later." />
      </div>
    );
  }

  if (!events?.length) {
    return null;
  }

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
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={events.length > 4}
        onSwiper={setSwiper}
        className="event-slider"
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