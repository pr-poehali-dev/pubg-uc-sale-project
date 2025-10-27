import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  purchase_amount: number | null;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/backend/stats?type=reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return diffHours === 0 ? 'только что' : `${diffHours}ч назад`;
    } else if (diffDays < 7) {
      return `${diffDays}д назад`;
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={18}
            className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-foreground/20'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Отзывы наших клиентов
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            {renderStars(5)}
            <span className="text-2xl font-bold text-foreground">{avgRating}</span>
          </div>
          <p className="text-foreground/60">
            На основе {reviews.length} {reviews.length === 1 ? 'отзыва' : 'отзывов'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {review.customer_name}
                  </h3>
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-foreground/50">
                  {formatDate(review.created_at)}
                </span>
              </div>

              <p className="text-foreground/80 mb-4 leading-relaxed">
                {review.comment}
              </p>

              {review.purchase_amount && (
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Icon name="ShoppingBag" size={16} />
                  <span>Купил {review.purchase_amount} UC</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center text-foreground/60">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Отзывов пока нет. Станьте первым!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;