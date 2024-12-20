```tsx
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function NavItem({ to, children, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isActive 
          ? 'text-[--primary]' 
          : 'text-gray-700 hover:text-[--primary]'
        }
      `}
    >
      {children}
    </Link>
  );
}
```