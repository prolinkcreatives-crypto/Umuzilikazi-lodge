import { Star } from 'lucide-react';
import { reviews } from '../../design-system/tokens';

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-warm-gold-bright text-warm-gold-bright' : 'text-outline-variant'}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const looped = [...reviews, ...reviews];

  return (
    <section className="py-section-v bg-soft-beige overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-14 px-margin-mobile">
        <p className="label-caps text-warm-gold mb-4">Guest Voices</p>
        <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-forest-green-deep">
          What guests say
        </h2>
      </div>

      <div className="scroll-track-wrapper relative">
        <div className="scroll-track flex gap-6 w-max px-margin-mobile">
          {looped.map((r, i) => (
            <article
              key={`${r.author}-${i}`}
              className="glass-panel rounded-xl p-8 w-[300px] shrink-0"
            >
              <StarRow rating={r.rating} />
              <p className="font-display text-headline-md text-forest-green-deep mb-4">"{r.quote}"</p>
              <p className="label-caps text-on-surface-variant">{r.author}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .scroll-track {
          animation: scroll-testimonials 30s linear infinite;
        }
        .scroll-track-wrapper:hover .scroll-track {
          animation-play-state: paused;
        }
        @keyframes scroll-testimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
