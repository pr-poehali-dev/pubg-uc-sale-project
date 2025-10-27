import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import OrderDialog from './OrderDialog';

const ucPackages = [
  { id: 1, amount: 60, price: 90, popular: false, bonus: '' },
  { id: 2, amount: 180, price: 190, popular: false, bonus: '' },
  { id: 3, amount: 300, price: 400, popular: true, bonus: '+25 UC бонус' },
  { id: 4, amount: 600, price: 840, popular: false, bonus: '+60 UC бонус' },
  { id: 5, amount: 1200, price: 1700, popular: false, bonus: '+120 UC бонус' },
  { id: 6, amount: 1500, price: 2200, popular: false, bonus: '+300 UC бонус' },
];

const Catalog = () => {
  const [selectedPackage, setSelectedPackage] = useState<typeof ucPackages[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBuyClick = (pkg: typeof ucPackages[0]) => {
    setSelectedPackage(pkg);
    setDialogOpen(true);
  };

  return (
    <section id="catalog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            КАТАЛОГ ПАКЕТОВ UC
          </h2>
          <p className="text-lg text-foreground/70">
            Выберите нужное количество игровой валюты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ucPackages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all hover:scale-105 animate-fade-in ${
                pkg.popular ? 'border-primary border-2 shadow-lg shadow-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.popular && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  Популярный
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4">
                  <Icon name="Coins" className="text-primary" size={40} />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">
                  {pkg.amount} UC
                </CardTitle>
                {pkg.bonus && (
                  <p className="text-sm text-primary font-semibold">{pkg.bonus}</p>
                )}
              </CardHeader>

              <CardContent className="text-center pb-4">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {pkg.price} ₽
                </div>
                <div className="text-sm text-foreground/60">
                  {(pkg.price / pkg.amount).toFixed(2)} ₽ за 1 UC
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                  onClick={() => handleBuyClick(pkg)}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Купить сейчас
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {selectedPackage && (
        <OrderDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          ucAmount={selectedPackage.amount}
          price={selectedPackage.price}
          bonus={selectedPackage.bonus}
        />
      )}
    </section>
  );
};

export default Catalog;