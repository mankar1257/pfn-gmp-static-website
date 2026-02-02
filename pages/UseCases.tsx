import React from 'react';
import { Coins, Activity, Dna, Shield, Factory, Calculator, ArrowRight, Calendar, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const useCases = [
  {
    icon: <Coins className="h-8 w-8" />,
    title: 'Cryptocurrency & Blockchain',
    description: 'Zero-error financial calculations at scale',
    challenges: ['Token precision across 18+ decimals', 'Real-time DEX price feeds', 'Smart contract accuracy'],
    results: ['99.9999% precision guaranteed', '141× faster settlements', 'Zero rounding vulnerabilities'],
  },
  {
    icon: <Activity className="h-8 w-8" />,
    title: 'Quantitative Finance',
    description: 'High-frequency trading without precision loss',
    challenges: ['Microsecond trade execution', 'Multi-asset portfolio math', 'Risk model accuracy'],
    results: ['Sub-microsecond latency', '118× faster valuations', 'Exact ratio calculations'],
  },
  {
    icon: <Dna className="h-8 w-8" />,
    title: 'Scientific Computing',
    description: 'Research-grade precision for breakthrough discoveries',
    challenges: ['Genome sequence analysis', 'Particle physics simulations', 'Astronomical calculations'],
    results: ['899,000× faster powers', 'Unlimited precision', 'Reproducible results'],
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Cryptography',
    description: 'Secure key generation and verification',
    challenges: ['Large prime operations', 'Key derivation speed', 'Modular arithmetic'],
    results: ['Fixed 415B memory', 'O(1) operations', 'Predictable performance'],
  },
  {
    icon: <Factory className="h-8 w-8" />,
    title: 'Industrial IoT',
    description: 'Precision manufacturing and quality control',
    challenges: ['Sensor data aggregation', 'Real-time calibration', 'Tolerance calculations'],
    results: ['728K× faster scaling', 'No drift accumulation', 'Embedded-friendly'],
  },
  {
    icon: <Calculator className="h-8 w-8" />,
    title: 'Enterprise Accounting',
    description: 'Audit-ready financial reporting',
    challenges: ['Multi-currency precision', 'Complex tax calculations', 'Regulatory compliance'],
    results: ['Exact decimal math', 'Instant reconciliation', 'Zero floating-point errors'],
  },
];

const UseCases: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Industry Applications</h1>
          <p className="text-xl text-slate-300">
            See how <span className="text-accent-400 font-semibold">PFN</span> transforms precision-critical applications
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
              >
                {/* Header */}
                <div className="bg-slate-900 p-5">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent-500/20 rounded-xl p-2.5 text-accent-400">
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{useCase.title}</h3>
                      <p className="text-slate-400 text-sm">{useCase.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Challenges Solved</h4>
                    <ul className="space-y-2">
                      {useCase.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-3">Results with PFN</h4>
                    <ul className="space-y-2">
                      {useCase.results.map((result, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-800 font-medium">
                          <Check className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PFN */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Teams Choose PFN</h2>
            <p className="text-slate-400">Key differentiators that matter in production</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
              <div className="text-5xl font-black text-accent-400 mb-4">O(1)</div>
              <h3 className="text-xl font-bold text-white mb-2">Constant Time</h3>
              <p className="text-slate-400">Every operation, regardless of number size</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
              <div className="text-5xl font-black text-accent-400 mb-4">415B</div>
              <h3 className="text-xl font-bold text-white mb-2">Fixed Memory</h3>
              <p className="text-slate-400">Predictable resource usage at any scale</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
              <div className="text-5xl font-black text-accent-400 mb-4">100%</div>
              <h3 className="text-xl font-bold text-white mb-2">Exact Results</h3>
              <p className="text-slate-400">No approximation, no rounding errors</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready for Your Use Case?</h2>
          <p className="text-lg text-slate-800 mb-8">
            Let's discuss how PFN can solve your precision challenges.
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

export default UseCases;
