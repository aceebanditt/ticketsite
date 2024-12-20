interface Section {
  id: string;
  name: string;
}

interface Props {
  sections: Section[];
  selectedSection: string | null;
  onSectionSelect: (sectionId: string) => void;
}

export default function InteractiveSeatingGrid({ sections, selectedSection, onSectionSelect }: Props) {
  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 p-4">
        <div className="grid grid-cols-4 gap-2 h-full">
          {sections.map((section, index) => (
            <button
              key={section.id || `section-${index}`}
              onClick={() => onSectionSelect(section.id)}
              className={`
                rounded-md flex items-center justify-center text-sm font-medium
                transition-colors duration-200
                ${selectedSection === section.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white hover:bg-indigo-50 text-gray-900'
                }
                border-2
                ${selectedSection === section.id ? 'border-indigo-600' : 'border-gray-200'}
              `}
            >
              {section.name || `Section ${index + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}