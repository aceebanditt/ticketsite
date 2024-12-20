import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  action?: React.ReactNode;
}

export default function ErrorMessage({ message, action }: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-red-50 p-4">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
          {action && <div className="mt-2">{action}</div>}
        </div>
      </div>
    </div>
  );
}