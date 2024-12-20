import Container from '../../components/layout/Container';

export default function TermsPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using EventsHub's services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2>2. User Accounts</h2>
            <p>
              You must provide accurate and complete information when creating an account. You are responsible 
              for maintaining the security of your account and password.
            </p>
          </section>

          <section className="mb-8">
            <h2>3. Ticket Purchases and Sales</h2>
            <ul>
              <li>All sales are final unless an event is cancelled or rescheduled</li>
              <li>Tickets may not be resold above face value unless explicitly permitted</li>
              <li>We guarantee the validity of tickets purchased through our platform</li>
              <li>Refunds are processed according to our refund policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>4. Prohibited Activities</h2>
            <p>Users agree not to:</p>
            <ul>
              <li>Use automated systems to purchase tickets</li>
              <li>Circumvent our security measures</li>
              <li>Sell counterfeit or invalid tickets</li>
              <li>Harass other users or our staff</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>5. Intellectual Property</h2>
            <p>
              All content on our platform is protected by copyright and other intellectual property laws. 
              Users may not copy, modify, or distribute our content without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2>6. Limitation of Liability</h2>
            <p>
              EventsHub is not liable for any indirect, incidental, special, consequential, or punitive damages 
              arising from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Users will be notified of significant changes.
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-12">
            Last updated: December 2023
          </div>
        </div>
      </div>
    </Container>
  );
}