import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { formatEventDate } from '../../utils/date';
import { formatCurrency } from '../../utils/format';
import { TicketmasterEvent } from '../../types/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import ImageLoader from './ImageLoader';

interface FeaturedEventSliderProps {
  events?: TicketmasterEvent[];
  loading?: boolean;
  error?: Error | null;
}

export default function FeaturedEventSlider({ 
  events = [], 
  loading = false, 
  error = null 
}: FeaturedEventSliderProps) {
  const [swiper, setSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Memoize navigation handlers
  const handlePrev = useCallback(() => {
    if (swiper) {
      swiper.slidePrev();
    }
  }, [swiper]);

  const handleNext = useCallback(() => {
    if (swiper) {
      swiper.slideNext();
    }
  }, [swiper]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
        <ErrorMessage message="Unable to load featured events. Please try again later." />
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
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
                   bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg 
                   opacity-0 group-hover:opacity-100 transition-opacity
                   hover:bg-white disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        ref={nextRef}
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
                   bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg 
                   opacity-0 group-hover:opacity-100 transition-opacity
                   hover:bg-white disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
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
        loop={events.length > 1}
        onSwiper={setSwiper}
        className="event-slider rounded-lg overflow-hidden"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <Link to={`/event/${event.id}`} className="block relative aspect-[21/9]">
              <ImageLoader
                src={event.images?.find(img => img.ratio === '16_9')?.url || event.images?.[0]?.url}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <div className="max-w-3xl">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    {event.name}
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 text-sm md:text-base">
                    <div className="flex items-center">
                      <span>{formatEventDate(event.dates.start.dateTime || event.dates.start.localDate)}</span>
                    </div>
                    
                    {event._embedded?.venues?.[0] && (
                      <div className="flex items-center">
                        <span>
                          {event._embedded.venues[0].name}
                          {event._embedded.venues[0].city?.name && `, ${event._embedded.venues[0].city.name}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {event.priceRanges?.[0] && (
                    <div className="mt-4">
                      <span className="inline-block bg-[--primary] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        From {formatCurrency(event.priceRanges[0].min)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}