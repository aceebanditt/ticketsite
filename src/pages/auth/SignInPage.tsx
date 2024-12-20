import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

export default function SignInPage() {
  const handleSignIn = (data: any) => {
    // Handle sign in logic
    console.log('Sign in:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-[#800020] hover:text-[#4A0012]">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm type="signin" onSubmit={handleSignIn} />
        </div>
      </div>
    </div>
  );
}