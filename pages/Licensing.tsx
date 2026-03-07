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
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/[0.07] rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent-400 tracking-wider uppercase mb-4">Pricing</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Simple, Transparent Licensing
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Start free. Scale when you're ready.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  tier.featured
                    ? 'bg-slate-900/80 border-2 border-accent-500/40 shadow-[0_0_40px_rgba(20,184,166,0.08)]'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-accent-500 text-slate-900 tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-xl mb-5 ${
                  tier.featured ? 'bg-accent-500/10' : 'bg-white/[0.06]'
                }`}>
                  <tier.icon className={`h-6 w-6 ${tier.featured ? 'text-accent-400' : 'text-slate-400'}`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-500 mb-5">{tier.description}</p>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${tier.featured ? 'text-accent-400' : 'text-white'}`}>
                    {tier.price}
                  </span>
                  <span className="text-sm text-slate-500 ml-1">/{tier.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        tier.featured ? 'text-accent-400' : 'text-slate-600'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    tier.featured
                      ? 'bg-accent-500 text-slate-900 hover:bg-accent-400 accent-glow'
                      : 'bg-white/[0.05] text-white border border-white/[0.1] hover:bg-white/[0.08]'
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Is PFN open source?',
                a: 'No. PFN uses a proprietary algorithm. The SDK is provided as a compiled library. All performance claims are verifiable through benchmarks.',
              },
              {
                q: 'What platforms are supported?',
                a: 'Linux (x86_64, ARM64), macOS (Intel, Apple Silicon), and Windows. Contact us for embedded platforms.',
              },
              {
                q: 'Can I try before buying?',
                a: 'Yes! Our Free tier gives you full SDK access for evaluation. Upgrade to Commercial when you\'re ready for production.',
              },
              {
                q: 'How is pricing determined?',
                a: 'Commercial pricing depends on deployment scale and support needs. Contact sales for a custom quote.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/[0.05] rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-400 mb-10">
            Schedule a demo to see PFN in action with your use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-500 text-slate-900 font-semibold hover:bg-accent-400 transition-all accent-glow"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
            <Link
              to="/performance"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/[0.05] text-white font-semibold border border-white/[0.1] hover:bg-white/[0.08] transition-all"
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
