import Container from '../../components/layout/Container';

export default function AboutPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About EventsHub</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p>
              Founded in 2020, EventsHub has grown to become one of the most trusted names in event ticketing. 
              Our mission is to connect fans with the events they love while providing a secure, transparent, 
              and convenient ticket-buying experience.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p>
              We believe everyone should have access to unforgettable live experiences. Our platform is built 
              on the principles of transparency, security, and exceptional customer service. We work tirelessly 
              to ensure both ticket buyers and sellers have a seamless experience.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>100% Buyer Guarantee on all tickets</li>
              <li>Secure payment processing and data protection</li>
              <li>Real-time inventory updates and dynamic pricing</li>
              <li>24/7 customer support</li>
              <li>Mobile-friendly ticket delivery</li>
              <li>Verified seller program</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p>
              Our diverse team of industry experts brings together decades of experience in event management, 
              technology, and customer service. We're passionate about creating the best possible experience 
              for our users and continuously innovating to meet their needs.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}