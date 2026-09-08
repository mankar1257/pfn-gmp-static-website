import React, { useEffect, useState } from 'react';
import { scrollToEl } from '../lib/smooth-scroll';

export type SectionItem = { id: string; label: string };

/**
 * Sticky in-page section navigation for long pages: a scrollspy rail that
 * sits under the fixed navbar, keeps the current section highlighted, and
 * jumps between sections. Buttons (not anchors) because the site routes
 * through the URL hash.
 */
const SectionNav: React.FC<{ items: SectionItem[]; ariaLabel?: string }> = ({ items, ariaLabel = 'Page sections' }) => {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={ariaLabel} className="sticky top-16 z-40 bg-black/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex gap-1 overflow-x-auto py-2">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => scrollToEl('#' + it.id)}
              aria-current={active === it.id ? 'true' : undefined}
              className={`whitespace-nowrap px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-medium transition-colors ${
                active === it.id ? 'text-brand-500' : 'text-muted hover:text-white'
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SectionNav;
