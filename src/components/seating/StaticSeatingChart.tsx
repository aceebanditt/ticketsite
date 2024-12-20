interface Props {
  imageUrl: string;
}

export default function StaticSeatingChart({ imageUrl }: Props) {
  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Venue Seating Chart"
        className="w-full h-auto rounded-lg"
      />
      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md text-sm">
        Click on sections for availability
      </div>
    </div>
  );
}