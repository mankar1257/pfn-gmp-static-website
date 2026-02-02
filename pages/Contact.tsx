import React from 'react';
import { Mail, MapPin, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-300">
            Let's discuss how <span className="text-accent-400 font-semibold">PFN</span> can solve your precision challenges
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Schedule Demo */}
            <div className="bg-accent-500 rounded-2xl p-8">
              <div className="bg-slate-900/20 rounded-xl p-3 w-fit mb-6">
                <Calendar className="h-8 w-8 text-slate-900" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Schedule a Demo</h2>
              <p className="text-slate-800 mb-6">
                See PFN in action. We'll walk through benchmarks, integration, and answer your technical questions.
              </p>
              <a
                href="mailto:viv@null-field.com?subject=PFN%20Demo%20Request"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                viv@null-field.com
              </a>
            </div>

            {/* General Inquiries */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="bg-accent-500/20 rounded-xl p-3 w-fit mb-6">
                <MessageSquare className="h-8 w-8 text-accent-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">General Inquiries</h2>
              <p className="text-slate-600 mb-6">
                Questions about licensing, technical specifications, or partnership opportunities.
              </p>
              <a
                href="mailto:sarvin@null-field.com?subject=PFN%20Inquiry"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                sarvin@null-field.com
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="mt-8 bg-white rounded-2xl p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="bg-accent-500/20 rounded-xl p-3">
                <MapPin className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Location</h3>
                <p className="text-slate-600">
                  Null Field Research<br />
                  Channi, Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
              <div className="text-4xl font-black text-accent-400 mb-2">1</div>
              <h3 className="text-lg font-bold text-white mb-2">Discovery Call</h3>
              <p className="text-slate-400 text-sm">Understand your precision requirements and use case</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
              <div className="text-4xl font-black text-accent-400 mb-2">2</div>
              <h3 className="text-lg font-bold text-white mb-2">Technical Demo</h3>
              <p className="text-slate-400 text-sm">Live benchmarks and integration walkthrough</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
              <div className="text-4xl font-black text-accent-400 mb-2">3</div>
              <h3 className="text-lg font-bold text-white mb-2">Evaluation</h3>
              <p className="text-slate-400 text-sm">Free tier access to test with your workloads</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to See PFN in Action?</h2>
          <p className="text-lg text-slate-800 mb-8">
            Explore our benchmark data while you wait.
          </p>
          <Link
            to="/performance"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
          >
            View Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
