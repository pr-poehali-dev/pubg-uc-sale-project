import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const paymentMethods = [
  { name: 'Банковские карты', icon: 'CreditCard', desc: 'Visa, MasterCard, МИР' },
  { name: 'СБП', icon: 'Smartphone', desc: 'Быстрый платеж' },
  { name: 'Электронные кошельки', icon: 'Wallet', desc: 'ЮMoney, QIWI' },
  { name: 'Криптовалюта', icon: 'Bitcoin', desc: 'BTC, ETH, USDT' },
];

const PaymentMethods = () => {
  return (
    <section id="payment" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            СПОСОБЫ ОПЛАТЫ
          </h2>
          <p className="text-lg text-foreground/70">
            Выберите удобный способ для оплаты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {paymentMethods.map((method, index) => (
            <Card 
              key={method.name}
              className="text-center hover:scale-105 transition-transform animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <Icon name={method.icon as any} className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{method.name}</h3>
                <p className="text-sm text-foreground/60">{method.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-lg">
            <Icon name="Lock" className="text-primary" size={20} />
            <span className="text-foreground/80">
              Все платежи защищены SSL-шифрованием
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
