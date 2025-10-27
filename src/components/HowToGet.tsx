import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const steps = [
  {
    number: 1,
    title: 'Выберите пакет',
    description: 'Выберите нужное количество UC из каталога',
    icon: 'Package',
  },
  {
    number: 2,
    title: 'Оплатите заказ',
    description: 'Выберите удобный способ оплаты и завершите платеж',
    icon: 'CreditCard',
  },
  {
    number: 3,
    title: 'Укажите Player ID',
    description: 'Введите ваш игровой ID из профиля PUBG Mobile',
    icon: 'User',
  },
  {
    number: 4,
    title: 'Получите UC',
    description: 'UC поступят на ваш аккаунт в течение 5 минут',
    icon: 'CheckCircle',
  },
];

const HowToGet = () => {
  return (
    <section id="how-to" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            КАК ПОЛУЧИТЬ UC
          </h2>
          <p className="text-lg text-foreground/70">
            Простой процесс в 4 шага
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="text-center h-full hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 pb-8">
                  <div className="relative inline-block mb-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name={step.icon as any} className="text-primary" size={36} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <Icon name="ChevronRight" className="text-primary" size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Icon name="Info" className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Где найти Player ID?</h4>
                  <p className="text-sm text-foreground/80">
                    Откройте PUBG Mobile → нажмите на аватар в левом верхнем углу → 
                    скопируйте числовой ID под вашим ником
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowToGet;
