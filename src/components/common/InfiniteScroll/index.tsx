import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../LoadingSpinner';

interface InfiniteScrollProps {
  children: React.ReactNode;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function InfiniteScroll({ 
  children, 
  loading, 
  hasMore, 
  onLoadMore 
}: InfiniteScrollProps) {
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);

  return (
    <div>
      {children}
      {(hasMore || loading) && (
        <div ref={ref} className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}