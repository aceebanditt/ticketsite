import { Facebook, Twitter, Mail } from 'lucide-react';

export default function SocialLogin() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          className="flex justify-center items-center px-4 py-2 border border-gray-300 
                     shadow-sm rounded-md hover:bg-gray-50 transition-colors"
        >
          <Facebook className="h-5 w-5 text-[#1877F2]" />
        </button>
        <button
          type="button"
          className="flex justify-center items-center px-4 py-2 border border-gray-300 
                     shadow-sm rounded-md hover:bg-gray-50 transition-colors"
        >
          <Mail className="h-5 w-5 text-[#DB4437]" />
        </button>
        <button
          type="button"
          className="flex justify-center items-center px-4 py-2 border border-gray-300 
                     shadow-sm rounded-md hover:bg-gray-50 transition-colors"
        >
          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
        </button>
      </div>
    </div>
  );
}