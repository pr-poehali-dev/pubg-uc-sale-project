import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isStatsPage = location.pathname === '/stats';

  const scrollToSection = (id: string) => {
    if (isStatsPage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" className="text-primary-foreground" size={24} />
            </div>
            <span className="text-2xl font-bold text-foreground">UC SHOP</span>
          </button>
          
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
            <button onClick={() => navigate('/stats')} className="text-foreground/80 hover:text-foreground transition-colors">
              Статистика
            </button>
          </div>

          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/stats')}>
            <Icon name="BarChart3" size={20} className="mr-2" />
            Админ
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;