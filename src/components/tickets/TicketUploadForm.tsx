import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, AlertCircle, X, Image as ImageIcon } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const ticketSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  eventTime: z.string().min(1, 'Event time is required'),
  venue: z.string().min(1, 'Venue is required'),
  section: z.string().min(1, 'Section is required'),
  row: z.string().min(1, 'Row is required'),
  quantity: z.number()
    .min(1, 'Quantity must be at least 1')
    .max(10, 'Maximum 10 tickets per listing'),
  pricePerTicket: z.number()
    .min(1, 'Price must be greater than 0')
    .max(10000, 'Price cannot exceed $10,000'),
  ticketType: z.enum(['digital', 'pdf', 'mobile']),
  deliveryMethod: z.enum(['instant', 'email', 'mobile']),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' })
  })
});

type TicketFormData = z.infer<typeof ticketSchema>;

export default function TicketUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      quantity: 1,
      ticketType: 'digital',
      deliveryMethod: 'instant'
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const isValidType = ACCEPTED_FILE_TYPES.includes(file.type);
      const isValidSize = file.size <= MAX_FILE_SIZE;
      return isValidType && isValidSize;
    });

    setFiles(validFiles);

    // Generate previews for images
    const newPreviewUrls = validFiles.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return '/pdf-icon.png'; // Placeholder for PDFs
    });

    setPreviewUrls(newPreviewUrls);
  };

  const onSubmit = async (data: TicketFormData) => {
    try {
      setUploadProgress(0);
      const formData = new FormData();
      
      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // Append files
      files.forEach((file, index) => {
        formData.append(`ticket_${index}`, file);
      });

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      clearInterval(interval);
      setUploadProgress(100);
      
      // Reset form
      setFiles([]);
      setPreviewUrls([]);
      
      // Show success message
      alert('Tickets listed successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload tickets. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            {...register('eventName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
          />
          {errors.eventName && (
            <p className="mt-1 text-sm text-red-600">{errors.eventName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              {...register('eventDate')}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
            />
            {errors.eventDate && (
              <p className="mt-1 text-sm text-red-600">{errors.eventDate.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              {...register('eventTime')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
            />
            {errors.eventTime && (
              <p className="mt-1 text-sm text-red-600">{errors.eventTime.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Section</label>
          <input
            type="text"
            {...register('section')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
          />
          {errors.section && (
            <p className="mt-1 text-sm text-red-600">{errors.section.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Row</label>
          <input
            type="text"
            {...register('row')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
          />
          {errors.row && (
            <p className="mt-1 text-sm text-red-600">{errors.row.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            min="1"
            max="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      {/* Price and Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Ticket ($)</label>
          <input
            type="number"
            {...register('pricePerTicket', { valueAsNumber: true })}
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
          />
          {errors.pricePerTicket && (
            <p className="mt-1 text-sm text-red-600">{errors.pricePerTicket.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
          <select
            {...register('ticketType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
          >
            <option value="digital">Digital Ticket</option>
            <option value="pdf">PDF Ticket</option>
            <option value="mobile">Mobile Ticket</option>
          </select>
          {errors.ticketType && (
            <p className="mt-1 text-sm text-red-600">{errors.ticketType.message}</p>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Tickets</label>
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            accept={ACCEPTED_FILE_TYPES.join(',')}
            multiple
            className="hidden"
            id="ticket-upload"
          />
          <label
            htmlFor="ticket-upload"
            className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF or images up to 10MB</p>
            </div>
          </label>
        </div>

        {/* File Previews */}
        {previewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {url.includes('pdf-icon') ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  ) : (
                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newFiles = [...files];
                    const newUrls = [...previewUrls];
                    newFiles.splice(index, 1);
                    newUrls.splice(index, 1);
                    setFiles(newFiles);
                    setPreviewUrls(newUrls);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terms and Submit */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            {...register('termsAccepted')}
            className="mt-1 h-4 w-4 text-[--primary] focus:ring-[--primary] border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            I agree to the terms and conditions of selling tickets on this platform
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-sm text-red-600">{errors.termsAccepted.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || files.length === 0}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[--primary] hover:bg-[--primary-dark] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--primary] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Uploading...' : 'List Tickets'}
        </button>
      </div>

      {/* Upload Progress */}
      {isSubmitting && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-[--primary]">
                  Uploading...
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-[--primary]">
                  {uploadProgress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[--primary]/20">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[--primary] transition-all duration-500"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}