import Container from '../../components/layout/Container';

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Payment information</li>
              <li>Transaction history</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Process your transactions</li>
              <li>Send you tickets and important event updates</li>
              <li>Provide customer support</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. Data Protection</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized or unlawful processing, accidental loss, destruction, or damage. We comply with GDPR 
              and other applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2>4. Your Rights</h2>
            <p>
              Under GDPR and other applicable laws, you have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to improve your experience on our platform. 
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2>6. Contact Us</h2>
            <p>
              For any privacy-related questions or concerns, please contact our Data Protection Officer at:
              <br />
              Email: privacy@eventshub.com
              <br />
              Address: 123 Event Street, Suite 100, Event City, EC 12345
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