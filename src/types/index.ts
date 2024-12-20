export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  imageUrl: string;
  category: string;
  minPrice: number;
  performer: string;
  seatingChart?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  imageUrl: string;
  capacity: number;
  seatingChart: string;
}

export interface Performer {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  popularity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  favorites: string[];
}