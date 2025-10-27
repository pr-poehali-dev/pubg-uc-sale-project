import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import PaymentMethods from '@/components/PaymentMethods';
import HowToGet from '@/components/HowToGet';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Catalog />
      <PaymentMethods />
      <HowToGet />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Index;