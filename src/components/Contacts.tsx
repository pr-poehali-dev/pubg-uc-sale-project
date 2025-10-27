import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  return (
    <section id="contacts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            КОНТАКТЫ
          </h2>
          <p className="text-lg text-foreground/70">
            Свяжитесь с нами удобным способом
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="text-center hover:scale-105 transition-transform">
            <CardContent className="pt-8 pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Icon name="MessageCircle" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Telegram</h3>
              <p className="text-sm text-foreground/60 mb-4">Быстрая поддержка 24/7</p>
              <Button className="bg-primary hover:bg-primary/90">
                Написать
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:scale-105 transition-transform">
            <CardContent className="pt-8 pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Icon name="Mail" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Email</h3>
              <p className="text-sm text-foreground/60 mb-4">support@ucshop.ru</p>
              <Button variant="outline" className="border-primary text-foreground hover:bg-primary/10">
                Написать письмо
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:scale-105 transition-transform">
            <CardContent className="pt-8 pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Icon name="Phone" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">WhatsApp</h3>
              <p className="text-sm text-foreground/60 mb-4">Онлайн чат</p>
              <Button variant="outline" className="border-primary text-foreground hover:bg-primary/10">
                Открыть чат
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-3xl mx-auto bg-card/50">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Часто задаваемые вопросы</h3>
              <div className="space-y-4 text-left">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Сколько времени занимает доставка?</h4>
                  <p className="text-sm text-foreground/70">UC поступают на аккаунт в течение 5-10 минут после оплаты.</p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Это безопасно?</h4>
                  <p className="text-sm text-foreground/70">Да, мы используем официальные способы пополнения UC. Ваш аккаунт в безопасности.</p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Что делать, если UC не пришли?</h4>
                  <p className="text-sm text-foreground/70">Свяжитесь с нашей поддержкой в Telegram, мы решим проблему в течение 15 минут.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
