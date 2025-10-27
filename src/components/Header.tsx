import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" className="text-primary-foreground" size={24} />
            </div>
            <span className="text-2xl font-bold text-foreground">UC SHOP</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('catalog')} className="text-foreground/80 hover:text-foreground transition-colors">
              Каталог
            </button>
            <button onClick={() => scrollToSection('payment')} className="text-foreground/80 hover:text-foreground transition-colors">
              Оплата
            </button>
            <button onClick={() => scrollToSection('how-to')} className="text-foreground/80 hover:text-foreground transition-colors">
              Как получить
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-foreground/80 hover:text-foreground transition-colors">
              Контакты
            </button>
          </div>

          <Button className="bg-primary hover:bg-primary/90">
            <Icon name="ShoppingCart" size={20} className="mr-2" />
            Корзина
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
