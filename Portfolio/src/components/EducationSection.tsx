import React from 'react';
import { AccentColor } from '../types';
import { GraduationCap, Award, BookOpen, Microscope } from 'lucide-react';

interface EducationSectionProps {
  accentColor: AccentColor;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ accentColor }) => {
  const educationItems = [
    {
      icon: '🎓',
      degree: 'B.Tech — Computer Science & Engineering (AI / ML)',
      institution: 'MMDU, Mullana, Ambala, Haryana',
      year: '2024 – 2028 (Expected)',
      desc: 'Specialization in Artificial Intelligence & Machine Learning. Core coursework in Data Structures, Algorithms, DBMS, Operating Systems, Linear Algebra, and Deep Learning.',
      tags: ['AI / ML', 'Deep Learning', 'Data Structures', 'DBMS']
    },
    {
      icon: '🏆',
      degree: 'IBM Data Science Professional Certificate',
      institution: 'IBM — Coursera',
      year: ' 2026',
      desc: '10-course specialization covering data analysis, SQL databases, Python wrangling, statistical modeling, machine learning, and applied data science capstone.',
      tags: ['Python', 'SQL', 'ML Pipelisnes', 'Data Visualization']
    },
    {
      icon: '🧠',
      degree: 'Deep Learning Specialization',
      institution: 'deeplearning.ai — Andrew Ng',
      year: '2026',
      desc: '5-course specialization covering Neural Networks, Hyperparameter Tuning, Convolutional Neural Networks (CNNs), Sequence Models (RNN/LSTM/Transformers), and MLOps strategies.',
      tags: ['CNN', 'RNN', 'TensorFlow', 'NLP', 'PyTorch']
    },
    {
      icon: '🔬',
      degree: 'Python for Data Science',
      institution: 'SimpliLearn ',
      year: '2025',
      desc: 'NPTEL certification covering Python programming, NumPy matrix computations, Pandas dataframe wrangling, data visualization, and applied statistical hypothesis testing. Scored 82/100.',
      tags: ['Python', 'NumPy', 'Pandas', 'Statistics']
    }
  ];

  return (
    <section data-reveal id="education-section" className="py-24 relative overflow-hidden bg-transparent border-t border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 mb-3">
            <span className="w-6 h-px bg-emerald-400" />
            <span>Academic Background</span>
            <span className="w-6 h-px bg-emerald-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">Foundation</span>
          </h2>
        </div>

        {/* 2x2 Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationItems.map((edu, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 hover:border-emerald-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{edu.icon}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 border border-emerald-500/30 text-emerald-600">
                    {edu.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-mono text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-xs font-mono text-emerald-600/80 mt-1">
                  {edu.institution}
                </p>
                <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed">
                  {edu.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-200/80">
                {edu.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md bg-emerald-50/40 border border-slate-200/40 text-[10px] font-mono text-slate-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
