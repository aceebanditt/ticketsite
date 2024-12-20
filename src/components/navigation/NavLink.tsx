import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export default function NavLink({ to, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-full text-white font-medium 
                 bg-gradient-to-r from-[#800020] to-[#4A0012]
                 hover:shadow-lg transform hover:-translate-y-0.5
                 transition-all duration-300"
    >
      {children}
    </Link>
  );
}