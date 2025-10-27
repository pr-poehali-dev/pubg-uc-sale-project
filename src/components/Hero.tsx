import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/dd79e030-2bb9-4b75-bdb2-6b0f5e854308/files/14c44cb9-3871-4b14-b8b8-8796adc5ee98.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center pt-20">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground drop-shadow-lg">
            КУПИТЬ UC
            <br />
            <span className="text-primary">PUBG MOBILE</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-foreground/90 max-w-2xl mx-auto">
            Моментальная доставка игровой валюты для PUBG Mobile. Безопасно и надежно!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
              onClick={() => scrollToSection('catalog')}
            >
              <Icon name="ShoppingBag" size={24} className="mr-2" />
              Выбрать пакет UC
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary text-foreground hover:bg-primary/10 text-lg px-8 py-6"
              onClick={() => scrollToSection('how-to')}
            >
              <Icon name="Info" size={24} className="mr-2" />
              Как это работает
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
            <div className="text-center animate-scale-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-3">
                <Icon name="Zap" className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Моментально</h3>
              <p className="text-sm text-foreground/70">Доставка за 5 минут</p>
            </div>
            
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-3">
                <Icon name="Shield" className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Безопасно</h3>
              <p className="text-sm text-foreground/70">100% гарантия</p>
            </div>
            
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-3">
                <Icon name="HeadphonesIcon" className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Поддержка 24/7</h3>
              <p className="text-sm text-foreground/70">Всегда на связи</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
