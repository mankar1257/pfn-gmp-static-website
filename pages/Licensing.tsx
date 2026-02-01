import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Building2, Shield, Check, Calendar, ArrowRight } from 'lucide-react';

const Licensing: React.FC = () => {
  const tiers = [
    {
      name: 'Free',
      icon: Gift,
      description: 'For evaluation and non-commercial use.',
      price: '$0',
      period: 'forever',
      features: [
        'Full SDK access',
        'Non-commercial use',
        'Benchmarking & evaluation',
        'Community support',
        'Documentation access',
      ],
      cta: 'Get Started Free',
      href: 'mailto:sarvin@null-field.com?subject=Free%20License%20Request',
      featured: false,
    },
    {
      name: 'Commercial',
      icon: Building2,
      description: 'For production commercial applications.',
      price: 'Custom',
      period: 'per year',
      features: [
        'Everything in Free',
        'Commercial use rights',
        'Priority email support',
        'Integration guidance',
        'Regular updates',
        'SLA available',
      ],
      cta: 'Contact Sales',
      href: 'mailto:viv@null-field.com?subject=Commercial%20License%20Inquiry',
      featured: true,
    },
    {
      name: 'Enterprise',
      icon: Shield,
      description: 'Custom solutions for large deployments.',
      price: 'Custom',
      period: 'negotiated',
      features: [
        'Everything in Commercial',
        'Dedicated support',
        'Custom integration',
        'Source code escrow',
        'On-premise options',
        'Custom development',
      ],
      cta: 'Schedule Discussion',
      href: 'mailto:viv@null-field.com?subject=Enterprise%20License%20Discussion',
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Licensing</h1>
          <p className="text-xl text-slate-300">
            Start free. Scale when you're ready.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 ${
                  tier.featured
                    ? 'bg-neon-500 ring-4 ring-neon-400 ring-offset-4 ring-offset-slate-50'
                    : 'bg-white border border-slate-200'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold bg-slate-900 text-neon-400">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  tier.featured ? 'bg-slate-900/20' : 'bg-neon-500/20'
                }`}>
                  <tier.icon className={`h-6 w-6 ${tier.featured ? 'text-slate-900' : 'text-neon-600'}`} />
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 ${tier.featured ? 'text-slate-900' : 'text-slate-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-4 ${tier.featured ? 'text-slate-800' : 'text-slate-600'}`}>
                  {tier.description}
                </p>
                
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${tier.featured ? 'text-slate-900' : 'text-slate-900'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm ${tier.featured ? 'text-slate-700' : 'text-slate-500'}`}>
                    {' '}/{tier.period}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${
                      tier.featured ? 'text-slate-800' : 'text-slate-600'
                    }`}>
                      <Check className={`h-5 w-5 flex-shrink-0 ${
                        tier.featured ? 'text-slate-900' : 'text-neon-500'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a
                  href={tier.href}
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                    tier.featured
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-neon-500 text-slate-900 hover:bg-neon-400'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Is PFN open source?</h3>
              <p className="text-sm text-slate-600">
                No. PFN uses a proprietary algorithm. The SDK is provided as a compiled library.
                All performance claims are verifiable through benchmarks.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">What platforms are supported?</h3>
              <p className="text-sm text-slate-600">
                Linux (x86_64, ARM64), macOS (Intel, Apple Silicon), and Windows.
                Contact us for embedded platforms.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Can I try before buying?</h3>
              <p className="text-sm text-slate-600">
                Yes! Our Free tier gives you full SDK access for evaluation.
                Upgrade to Commercial when you're ready for production.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">How is pricing determined?</h3>
              <p className="text-sm text-slate-600">
                Commercial pricing depends on deployment scale and support needs.
                Contact sales for a custom quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neon-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-800 mb-8">
            Schedule a demo to see PFN in action with your use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
            <Link 
              to="/performance"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
            >
              View Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Licensing;
