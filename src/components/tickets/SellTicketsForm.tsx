import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ticketSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  eventTime: z.string().min(1, 'Event time is required'),
  venue: z.string().min(1, 'Venue is required'),
  section: z.string().min(1, 'Section is required'),
  quantity: z.number()
    .min(1, 'Quantity must be at least 1')
    .max(10, 'Maximum 10 tickets per listing'),
  pricePerTicket: z.number()
    .min(1, 'Price must be greater than 0')
    .max(10000, 'Price cannot exceed $10,000'),
  ticketType: z.enum(['digital', 'pdf', 'qr']),
  description: z.string().optional(),
});

type TicketFormData = z.infer<typeof ticketSchema>;

export default function SellTicketsForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    mode: 'onChange'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const isValidType = ['application/pdf', 'image/png', 'image/jpeg'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB max
      return isValidType && isValidSize;
    });

    if (validFiles.length !== selectedFiles.length) {
      setUploadError('Some files were rejected. Please ensure all files are PDF or images under 10MB.');
    } else {
      setUploadError(null);
    }

    setFiles(validFiles);
  };

  const onSubmit = async (data: TicketFormData) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      // Simulate file upload progress
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
      await new Promise(resolve => setTimeout(resolve, 5000));

      clearInterval(interval);
      setUploadProgress(100);
      setUploading(false);
      
      // Reset form and show success message
      setFiles([]);
      alert('Tickets listed successfully!');
    } catch (error) {
      setUploadError('Failed to upload tickets. Please try again.');
      setUploading(false);
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
          <label className="block text-sm font-medium text-gray-700">Section/Row</label>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Ticket ($)</label>
          <input
            type="number"
            {...register('pricePerTicket', { valueAsNumber: true })}
            min="1"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
          />
          {errors.pricePerTicket && (
            <p className="mt-1 text-sm text-red-600">{errors.pricePerTicket.message}</p>
          )}
        </div>
      </div>

      {/* Ticket Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
        <select
          {...register('ticketType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--primary] focus:ring-[--primary]"
        >
          <option value="digital">Digital Ticket</option>
          <option value="pdf">PDF Ticket</option>
          <option value="qr">QR Code</option>
        </select>
        {errors.ticketType && (
          <p className="mt-1 text-sm text-red-600">{errors.ticketType.message}</p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Tickets</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-[--primary] hover:text-[--primary-dark]">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF or image up to 10MB</p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name} ({Math.round(file.size / 1024)}KB)
              </li>
            ))}
          </ul>
        )}

        {/* Upload Progress */}
        {uploading && (
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

        {/* Error Message */}
        {uploadError && (
          <div className="mt-4 flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{uploadError}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isValid || uploading || files.length === 0}
          className="px-6 py-2 bg-[--primary] text-white rounded-full font-medium
                   hover:bg-[--primary-dark] disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          {uploading ? 'Uploading...' : 'List Tickets'}
        </button>
      </div>
    </form>
  );
}