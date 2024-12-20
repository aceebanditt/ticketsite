import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
        <div>
          <h3 className="text-sm font-medium text-red-800">
            {error.message}
          </h3>
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="mt-2 text-sm text-red-600 hover:text-red-500"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}