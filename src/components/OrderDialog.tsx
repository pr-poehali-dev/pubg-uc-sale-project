import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ucAmount: number;
  price: number;
  bonus?: string;
}

const OrderDialog = ({ open, onOpenChange, ucAmount, price, bonus }: OrderDialogProps) => {
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [contact, setContact] = useState('');
  const [promocode, setPromocode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(price);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerId || !playerName || !contact) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId,
          playerName,
          contact,
          ucAmount,
          price,
          bonus: bonus || '',
          promocode: promocode.toUpperCase(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Заказ создан!',
          description: 'Реквизиты для оплаты отправлены вам в сообщении',
        });
        onOpenChange(false);
        setPlayerId('');
        setPlayerName('');
        setContact('');
        setPromocode('');
        setDiscount(0);
        setFinalPrice(price);
      } else {
        throw new Error(data.error || 'Ошибка создания заказа');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось создать заказ',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
          <DialogDescription>
            Заполните данные для получения {ucAmount} UC {bonus && `(${bonus})`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="playerId">Player ID *</Label>
              <Input
                id="playerId"
                placeholder="Например: 5123456789"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Найдите ID в профиле PUBG Mobile
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerName">Игровой ник *</Label>
              <Input
                id="playerName"
                placeholder="Ваш ник в игре"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Telegram или WhatsApp *</Label>
              <Input
                id="contact"
                placeholder="@username или +7 900 123-45-67"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Для отправки реквизитов оплаты
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promocode">Промокод (необязательно)</Label>
              <Input
                id="promocode"
                placeholder="Введите промокод"
                value={promocode}
                onChange={(e) => setPromocode(e.target.value.toUpperCase())}
              />
              {discount > 0 && (
                <p className="text-xs text-primary font-semibold">
                  ✓ Скидка применена: -{discount} ₽
                </p>
              )}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              {discount > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-foreground/70">Цена:</span>
                    <span className="text-lg text-foreground/70 line-through">{price} ₽</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground/70">Скидка:</span>
                    <span className="text-lg text-primary font-semibold">-{discount} ₽</span>
                  </div>
                  <div className="flex items-center justify-between mb-2 pt-2 border-t border-border">
                    <span className="text-foreground font-semibold">К оплате:</span>
                    <span className="text-2xl font-bold text-primary">{finalPrice} ₽</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground/70">Сумма к оплате:</span>
                  <span className="text-2xl font-bold text-foreground">{price} ₽</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Icon name="Info" size={16} />
                <span>Реквизиты придут после заполнения формы</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="CheckCircle" size={20} className="mr-2" />
                  Получить реквизиты
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;