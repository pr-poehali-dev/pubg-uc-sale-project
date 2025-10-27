import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" className="text-primary-foreground" size={24} />
            </div>
            <span className="text-xl font-bold text-foreground">UC SHOP</span>
          </div>

          <div className="text-center md:text-left">
            <p className="text-foreground/60 text-sm">
              © 2024 UC Shop. Все права защищены.
            </p>
            <p className="text-foreground/50 text-xs mt-1">
              PUBG Mobile является зарегистрированной торговой маркой
            </p>
          </div>

          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Telegram"
            >
              <Icon name="Send" className="text-foreground" size={20} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="WhatsApp"
            >
              <Icon name="MessageCircle" className="text-foreground" size={20} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Email"
            >
              <Icon name="Mail" className="text-foreground" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
