import Icon from '@/components/ui/icon';

const TelegramBot = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-xl">
                  <Icon name="Send" size={48} className="text-primary-foreground" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Покупайте UC в Telegram!
                </h2>
                <p className="text-lg text-foreground/70 mb-6">
                  Быстрая покупка UC через наш телеграм-бот. Мгновенная обработка заказов, уведомления и поддержка 24/7
                </p>
                <a
                  href="https://t.me/UC_SKYE_Bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
                >
                  <Icon name="MessageCircle" size={24} />
                  Открыть бот @UC_SKYE_Bot
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Мгновенно</h3>
                  <p className="text-sm text-foreground/60">Автоматическая обработка заказов</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Bell" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Уведомления</h3>
                  <p className="text-sm text-foreground/60">Получайте статус заказа в реальном времени</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Headphones" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Поддержка 24/7</h3>
                  <p className="text-sm text-foreground/60">Ответим на вопросы в любое время</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramBot;
