import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface Order {
  order_id: string;
  player_id: string;
  player_name: string;
  contact: string;
  uc_amount: number;
  price: number;
  bonus: string;
  status: string;
  created_at: string;
}

interface Stats {
  total_orders: number;
  total_revenue: number;
  total_uc: number;
  pending_orders: number;
  completed_orders: number;
  orders: Order[];
}

const Stats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/dd7bfe63-0ff4-47c4-a3be-e0fcfc2ad251');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Icon name="Loader2" className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">СТАТИСТИКА ЗАКАЗОВ</h1>
          <p className="text-foreground/70">Отслеживание продаж UC</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Всего заказов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Icon name="ShoppingCart" className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stats?.total_orders || 0}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Общий доход
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Icon name="DollarSign" className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stats?.total_revenue || 0} ₽
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Продано UC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Icon name="Coins" className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stats?.total_uc || 0}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">
                В обработке
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stats?.pending_orders || 0}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Последние заказы</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.orders && stats.orders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID заказа</TableHead>
                      <TableHead>Игрок</TableHead>
                      <TableHead>Player ID</TableHead>
                      <TableHead>Контакт</TableHead>
                      <TableHead>UC</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.orders.map((order) => (
                      <TableRow key={order.order_id}>
                        <TableCell className="font-mono text-sm">{order.order_id}</TableCell>
                        <TableCell className="font-medium">{order.player_name}</TableCell>
                        <TableCell className="font-mono text-sm">{order.player_id}</TableCell>
                        <TableCell>{order.contact}</TableCell>
                        <TableCell>
                          {order.uc_amount} {order.bonus && <span className="text-xs text-primary">({order.bonus})</span>}
                        </TableCell>
                        <TableCell className="font-semibold">{order.price} ₽</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status === 'pending' ? 'В обработке' : 'Выполнен'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-foreground/70">
                          {formatDate(order.created_at)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-foreground/60">
                <Icon name="Package" className="mx-auto mb-4 text-foreground/40" size={48} />
                <p>Заказов пока нет</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stats;
