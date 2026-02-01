import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="text-green-500 h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Thanks for Reaching Out!</h2>
        <p className="text-slate-400 text-lg">
          We've received your message and will get back to you within 24 hours. Looking forward to discussing how PFN-GMP can help with your project.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold text-white mb-6">Let's Talk About Your Needs</h1>
          <p className="text-xl text-slate-400 mb-12">
            Whether you're evaluating PFN-GMP for your project, need technical guidance, or want to explore how we can help accelerate your computations—we're here to help.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-brand-500/30 transition-colors">
              <Mail className="text-brand-400 mt-1" />
              <div>
                <h3 className="text-white font-semibold">General Inquiries</h3>
                <p className="text-slate-300 text-sm">sarvin@null-field.com</p>
                <p className="text-slate-400 text-xs mt-1">We typically respond within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-brand-500/30 transition-colors">
              <Phone className="text-brand-400 mt-1" />
              <div>
                <h3 className="text-white font-semibold">Sales & Licensing</h3>
                <p className="text-slate-300 text-sm">viv@null-field.com</p>
                <p className="text-slate-400 text-xs mt-1">Evaluation licenses & custom solutions</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-brand-500/30 transition-colors">
              <MapPin className="text-brand-400 mt-1" />
              <div>
                <h3 className="text-white font-semibold">Our Location</h3>
                <p className="text-slate-300 text-sm">
                  Channi<br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Your Name</label>
                <input type="text" required className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Email Address</label>
                <input type="email" required className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Company (Optional)</label>
              <input type="text" className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">What brings you here?</label>
              <select className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all">
                <option>I'd like to evaluate PFN-GMP</option>
                <option>I need a production license quote</option>
                <option>I'm interested in partnering</option>
                <option>I have a technical question</option>
                <option>Just exploring</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Tell us about your use case</label>
              <textarea rows={4} className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="What kind of calculations are you working with? What performance challenges are you facing?"></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;