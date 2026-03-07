import React from 'react';
import { Mail, MapPin, Calendar, MessageSquare, ArrowRight, Search, MonitorPlay, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/[0.07] rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent-400 tracking-wider uppercase mb-4">Let's Talk</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how PFN can solve your precision challenges
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule Demo */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-accent-500/20 hover:border-accent-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-accent-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">Schedule a Demo</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                See PFN in action. We'll walk through benchmarks, integration, and answer your technical questions.
              </p>
              <a
                href="mailto:viv@null-field.com?subject=PFN%20Demo%20Request"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-accent-500 text-slate-900 font-semibold text-sm hover:bg-accent-400 transition-colors accent-glow"
              >
                <Mail className="mr-2 h-4 w-4" />
                viv@null-field.com
              </a>
            </div>

            {/* General Inquiries */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-slate-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">General Inquiries</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Questions about licensing, technical specifications, or partnership opportunities.
              </p>
              <a
                href="mailto:sarvin@null-field.com?subject=PFN%20Inquiry"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white/[0.05] text-white font-semibold text-sm border border-white/[0.1] hover:bg-white/[0.08] transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                sarvin@null-field.com
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="mt-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
              <p className="text-sm text-slate-400">
                Null Field Research · Chennai, Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect — numbered steps, not BentoGrid */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">What to Expect</h2>
            <p className="text-slate-500">Our process from first contact to production</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: '1', icon: Search, title: 'Discovery Call', description: 'We understand your precision requirements, use case, and technical environment.' },
              { step: '2', icon: MonitorPlay, title: 'Technical Demo', description: 'Live benchmarks and integration walkthrough with your specific scenarios.' },
              { step: '3', icon: FlaskConical, title: 'Evaluation', description: 'Free tier access to test PFN with your own workloads and hardware.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mx-auto mb-5">
                  <span className="text-lg font-bold text-accent-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to See PFN in Action?</h2>
          <p className="text-lg text-slate-400 mb-10">
            Explore our benchmark data while you wait.
          </p>
          <Link
            to="/performance"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-500 text-slate-900 font-semibold hover:bg-accent-400 transition-all accent-glow"
          >
            View Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
