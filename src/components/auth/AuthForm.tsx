import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import FormInput from './FormInput';
import PasswordStrength from './PasswordStrength';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
  confirmPassword: z.string().optional(),
  rememberMe: z.boolean().optional()
}).refine(data => {
  if (data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  type: 'signin' | 'signup';
  onSubmit: (data: AuthFormData) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {type === 'signup' && (
        <FormInput
          icon={User}
          type="text"
          label="Full Name"
          {...register('name')}
          error={errors.name?.message}
        />
      )}

      <FormInput
        icon={Mail}
        type="email"
        label="Email Address"
        {...register('email')}
        error={errors.email?.message}
      />

      <div>
        <FormInput
          icon={Lock}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...register('password')}
          error={errors.password?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />
        {type === 'signup' && <PasswordStrength password={register('password').value || ''} />}
      </div>

      {type === 'signup' && (
        <FormInput
          icon={Lock}
          type="password"
          label="Confirm Password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      )}

      {type === 'signin' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="h-4 w-4 text-[--primary] focus:ring-[--primary] border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
          <a href="/forgot-password" className="text-sm text-[--primary] hover:text-[--primary-dark]">
            Forgot password?
          </a>
        </div>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3 rounded-full text-white font-medium
                 bg-gradient-to-r from-[--primary] to-[--primary-dark]
                 hover:shadow-lg transform hover:-translate-y-0.5
                 transition-all duration-300"
      >
        {type === 'signin' ? 'Sign In' : 'Create Account'}
      </button>
    </form>
  );
}