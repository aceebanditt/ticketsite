import { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export default function FormInput({ 
  icon: Icon, 
  label, 
  error,
  rightElement,
  className = '',
  ...props 
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          {...props}
          className={`pl-10 ${rightElement ? 'pr-10' : 'pr-3'} block w-full rounded-md border-gray-300 
                     shadow-sm focus:border-[--primary] focus:ring-[--primary] ${className}`}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}