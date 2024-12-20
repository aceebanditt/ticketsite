interface SeatingChartProps {
  imageUrl: string;
  venueName: string;
}

export default function SeatingChart({ imageUrl, venueName }: SeatingChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Seating Chart</h2>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={`${venueName} Seating Chart`}
          className="w-full h-full object-contain"
        />
      </div>
      <p className="mt-4 text-sm text-gray-500 text-center">
        Click on a section to view available tickets
      </p>
    </div>
  );
}