import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Container from '../../components/layout/Container';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is your ticket guarantee?",
    answer: "All tickets purchased through EventsHub are guaranteed to be valid and authentic. If any issues arise, we'll provide comparable or better tickets, or a full refund."
  },
  {
    question: "How do I receive my tickets?",
    answer: "Tickets are delivered electronically to your account and email. You can access them through our mobile app or print them at home, depending on the event's requirements."
  },
  {
    question: "What if an event is cancelled?",
    answer: "If an event is cancelled, you will automatically receive a full refund to your original payment method within 30 days."
  },
  {
    question: "Can I sell my tickets if I can't attend?",
    answer: "Yes, you can list your tickets for resale through our secure platform. We ensure both buyers and sellers are protected throughout the transaction."
  },
  {
    question: "Are there any additional fees?",
    answer: "All fees are transparently displayed during checkout before you complete your purchase. The total price shown includes all service and delivery fees."
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-4">
            Our customer support team is available 24/7 to help you with any questions or concerns.
          </p>
          <button className="px-6 py-2 bg-[--primary] text-white rounded-full hover:bg-[--primary-dark] transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </Container>
  );
}