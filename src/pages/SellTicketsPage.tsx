import Container from '../components/layout/Container';
import SellTicketsForm from '../components/tickets/SellTicketsForm';

export default function SellTicketsPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sell Your Tickets</h1>
          <p className="mt-2 text-gray-600">
            List your tickets securely and reach thousands of buyers
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <SellTicketsForm />
        </div>
      </div>
    </Container>
  );
}