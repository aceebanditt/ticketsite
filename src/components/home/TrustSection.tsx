import { Shield, Clock, CreditCard, Award } from 'lucide-react';

export default function TrustSection() {
  const benefits = [
    {
      icon: Shield,
      title: '100% Buyer Guarantee',
      description: 'Valid tickets or your money back, guaranteed.'
    },
    {
      icon: Clock,
      title: 'Last Minute Tickets',
      description: 'Get tickets up until the last minute before the event.'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'All transactions are protected and encrypted.'
    },
    {
      icon: Award,
      title: 'Verified Sellers',
      description: 'Every seller is vetted and approved.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            The most trusted ticket marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[--primary]/10 rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-[--primary]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}