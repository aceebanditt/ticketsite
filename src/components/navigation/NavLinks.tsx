import { Link } from 'react-router-dom';

export default function NavLinks() {
  return (
    <div className="flex items-center space-x-8">
      <Link to="/events" className="nav-link font-medium">Events</Link>
      <Link to="/venues" className="nav-link font-medium">Venues</Link>
      <Link to="/performers" className="nav-link font-medium">Performers</Link>
      <Link to="/sports" className="nav-link font-medium">Sports</Link>
      <Link to="/concerts" className="nav-link font-medium">Concerts</Link>
      <Link to="/theater" className="nav-link font-medium">Theater</Link>
    </div>
  );
}