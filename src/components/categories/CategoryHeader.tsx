interface CategoryHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundImage: string;
}

export default function CategoryHeader({
  title,
  description,
  icon,
  backgroundImage
}: CategoryHeaderProps) {
  return (
    <div className="relative h-[300px] mb-8 rounded-xl overflow-hidden">
      <img
        src={backgroundImage}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent">
        <div className="h-full flex flex-col justify-center max-w-2xl px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-white">
              {icon}
            </div>
            <h1 className="text-4xl font-bold text-white">{title}</h1>
          </div>
          <p className="text-lg text-white/90">{description}</p>
        </div>
      </div>
    </div>
  );
}