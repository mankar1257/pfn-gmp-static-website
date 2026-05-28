import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="max-w-page mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
          <div className="md:col-span-5">
            <div className="serif text-base font-semibold text-ink">Null Field Research</div>
            <p className="mt-2 text-muted leading-relaxed max-w-prose">
              An independent research group working on exact arbitrary-precision arithmetic
              and applied mathematical software. Chennai, India.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-3">Work</div>
            <ul className="space-y-1.5">
              <li><Link to="/overview" className="text-muted hover:text-ink">Research</Link></li>
              <li><Link to="/writing" className="text-muted hover:text-ink">Writing</Link></li>
              <li><Link to="/performance" className="text-muted hover:text-ink">Benchmarks</Link></li>
              <li><Link to="/use-cases" className="text-muted hover:text-ink">Applications</Link></li>
              <li><Link to="/validation" className="text-muted hover:text-ink">Validation</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-3">Use</div>
            <ul className="space-y-1.5">
              <li><Link to="/integration" className="text-muted hover:text-ink">Integration</Link></li>
              <li><Link to="/licensing" className="text-muted hover:text-ink">Licensing</Link></li>
              <li><Link to="/contact" className="text-muted hover:text-ink">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-3">Correspondence</div>
            <ul className="space-y-1.5 text-muted">
              <li><a href="mailto:sarvin@null-field.com" className="hover:text-ink">sarvin@null-field.com</a></li>
              <li><a href="mailto:viv@null-field.com" className="hover:text-ink">viv@null-field.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 rule flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-muted">
          <span>© {year} Null Field Research. All rights reserved.</span>
          <span className="mono">Chennai · Tamil Nadu · India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
