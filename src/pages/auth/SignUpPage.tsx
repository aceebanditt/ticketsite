import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

export default function SignUpPage() {
  const handleSignUp = (data: any) => {
    // Handle sign up logic
    console.log('Sign up:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-[#800020] hover:text-[#4A0012]">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm type="signup" onSubmit={handleSignUp} />
        </div>
      </div>
    </div>
  );
}