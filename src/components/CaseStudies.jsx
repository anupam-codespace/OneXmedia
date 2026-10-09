import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Calendar, 
  Users, 
  Clock,
  ExternalLink,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react';

const caseStudies = [
  
  {
    id: 1,
    title: 'TechVault Analytics',
    category: 'SaaS Platform',
    client: 'TechVault Inc.',
    year: '2024',
    duration: '4 months',
    team: '6 people',
    tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    thumbnail: 'bg-blue-600',
    description: 'A real-time analytics dashboard that transformed how businesses track and predict their growth metrics.',
    challenge: 'The client needed a powerful yet intuitive analytics platform that could handle millions of data points while remaining fast and user-friendly.',
    solution: 'We built a custom React application with D3.js for visualizations, implementing intelligent data chunking and real-time WebSocket updates for instant insights.',
    results: [
      { metric: '3x', label: 'Faster data processing' },
      { metric: '92%', label: 'User satisfaction' },
      { metric: '50K+', label: 'Active users' }
    ],
    impact: 'Reduced decision-making time by 60% and increased revenue forecasting accuracy by 85%.'
  },
  {
    id: 2,
    title: 'Lumina E-commerce',
    category: 'E-commerce',
    client: 'Lumina Lifestyle',
    year: '2024',
    duration: '3 months',
    team: '4 people',
    tags: ['Next.js', 'Shopify', 'WebGL', 'Stripe'],
    color: 'bg-gradient-to-br from-purple-500 to-pink-600',
    thumbnail: 'bg-purple-600',
    description: 'Modern lifestyle brand store featuring AR product previews and seamless checkout experience.',
    challenge: 'Creating an immersive shopping experience that bridges the gap between online and in-store shopping.',
    solution: 'Integrated WebGL-powered AR previews allowing customers to visualize products in their space, combined with a frictionless checkout process.',
    results: [
      { metric: '145%', label: 'Conversion increase' },
      { metric: '4.2x', label: 'Average order value' },
      { metric: '28%', label: 'Return rate reduction' }
    ],
    impact: 'Generated $2.3M in revenue within the first quarter post-launch.'
  },
  {
    id: 3,
    title: 'FlowState Productivity',
    category: 'Mobile App',
    client: 'FlowState Labs',
    year: '2023',
    duration: '5 months',
    team: '5 people',
    tags: ['React Native', 'Firebase', 'TypeScript'],
    color: 'bg-gradient-to-br from-amber-500 to-orange-600',
    thumbnail: 'bg-amber-500',
    description: 'Task management app for creative teams with focus mode and deep work analytics.',
    challenge: 'Building a productivity app that actually helps teams focus instead of adding more noise.',
    solution: 'Created an AI-powered focus mode that learns from user behavior and suggests optimal work sessions with integrated team collaboration.',
    results: [
      { metric: '40%', label: 'Productivity boost' },
      { metric: '4.8★', label: 'App store rating' },
      { metric: '100K+', label: 'Downloads' }
    ],
    impact: 'Featured by Apple as "App of the Day" and acquired 100K+ users in 6 months.'
  },
  {
    id: 4,
    title: 'NeonSpace NFT',
    category: 'Web3',
    client: 'NeonSpace DAO',
    year: '2023',
    duration: '6 months',
    team: '8 people',
    tags: ['Solana', 'Rust', 'Next.js', 'Web3.js'],
    color: 'bg-gradient-to-br from-pink-500 to-rose-600',
    thumbnail: 'bg-pink-500',
    description: 'NFT marketplace with zero-gas minting and integrated social features for creators.',
    challenge: 'Creating a sustainable NFT marketplace that prioritizes creator economics and community building.',
    solution: 'Built on Solana for low-cost transactions, implementing a unique creator royalty system and social discovery engine.',
    results: [
      { metric: '$5M+', label: 'Trading volume' },
      { metric: '15K+', label: 'Active creators' },
      { metric: '99.8%', label: 'Uptime' }
    ],
    impact: 'Became the 3rd largest NFT marketplace on Solana within 4 months.'
  },
  {
    id: 5,
    title: 'HealthHub Telemedicine',
    category: 'Healthcare',
    client: 'HealthHub',
    year: '2024',
    duration: '7 months',
    team: '10 people',
    tags: ['React', 'WebRTC', 'HIPAA', 'AWS'],
    color: 'bg-gradient-to-br from-green-500 to-emerald-600',
    thumbnail: 'bg-green-600',
    description: 'HIPAA-compliant telemedicine platform connecting patients with healthcare providers.',
    challenge: 'Building a secure, reliable video consultation platform that meets strict healthcare regulations.',
    solution: 'Implemented end-to-end encryption, WebRTC for video calls, and compliant data storage with AWS.',
    results: [
      { metric: '50K+', label: 'Consultations' },
      { metric: '98%', label: 'Connection quality' },
      { metric: '4.9★', label: 'Patient rating' }
    ],
    impact: 'Enabled healthcare access for rural communities, serving 50K+ consultations in first year.'
  },
  {
    id: 6,
    title: 'EduLearn Platform',
    category: 'EdTech',
    client: 'EduLearn',
    year: '2023',
    duration: '8 months',
    team: '7 people',
    tags: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    thumbnail: 'bg-indigo-600',
    description: 'AI-powered learning platform with personalized study paths and progress tracking.',
    challenge: 'Creating adaptive learning experiences that cater to different learning styles and paces.',
    solution: 'Developed machine learning algorithms that analyze student performance and customize content difficulty in real-time.',
    results: [
      { metric: '65%', label: 'Test score improvement' },
      { metric: '25K+', label: 'Students' },
      { metric: '4.7★', label: 'Platform rating' }
    ],
    impact: 'Partner schools reported 65% average improvement in student test scores.'
  }
];

const categories = ['All', 'SaaS Platform', 'E-commerce', 'Mobile App', 'Web3', 'Healthcare', 'EdTech'];

export default function CaseStudies({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStudy, setSelectedStudy] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredStudies = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  if (selectedStudy) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        <div className="container relative z-10 py-20">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedStudy(null)}
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to all case studies
          </motion.button>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-2 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-secondary)]">
                {selectedStudy.category}
              </span>
              <span className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Calendar size={16} /> {selectedStudy.year}
              </span>
              <span className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Clock size={16} /> {selectedStudy.duration}
              </span>
              <span className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Users size={16} /> {selectedStudy.team}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {selectedStudy.title}
            </h1>
            
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mb-8">
              {selectedStudy.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedStudy.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 rounded-full bg-[rgba(255,59,59,0.1)] text-[var(--color-primary)] text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Visual Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${selectedStudy.color} h-96 rounded-2xl mb-16 relative overflow-hidden flex items-center justify-center`}
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 text-white text-5xl font-bold opacity-50">
              {selectedStudy.title.split(' ')[0]}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(255,59,59,0.1)] flex items-center justify-center">
                    <Target size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    The Challenge
                  </h2>
                </div>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {selectedStudy.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(255,59,59,0.1)] flex items-center justify-center">
                    <Sparkles size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    Our Solution
                  </h2>
                </div>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {selectedStudy.solution}
                </p>
              </motion.div>

              {/* Impact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(255,59,59,0.1)] flex items-center justify-center">
                    <TrendingUp size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    Business Impact
                  </h2>
                </div>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {selectedStudy.impact}
                </p>
              </motion.div>
            </div>

            {/* Sidebar - Results */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-8 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Key Results
                </h3>
                <div className="space-y-6">
                  {selectedStudy.results.map((result, i) => (
                    <div key={i} className="border-b border-[var(--color-border)] pb-4 last:border-0">
                      <div className="text-3xl font-bold text-[var(--color-primary)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                        {result.metric}
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                  <p className="text-sm text-[var(--color-text-muted)] mb-4">
                    Interested in similar results?
                  </p>
                  <a href="#contact" onClick={(e) => {
                    e.preventDefault();
                    onBack();
                    setTimeout(() => {
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} className="btn-primary w-full justify-center">
                    Let's Talk
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section-padding relative overflow-hidden bg-[var(--color-bg-primary)]" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-16"
        >
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8 group mx-auto"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to home
          </motion.button>

          <span className="section-badge inline-flex mx-auto">
            <Sparkles size={14} />
            Our Work
          </span>
          <h1 className="section-title">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Discover how we've helped businesses transform their digital presence
            and achieve remarkable results.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[var(--color-text-primary)] text-white shadow-md'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] border border-[var(--color-border)]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelectedStudy(study)}
              className="glass-card overflow-hidden cursor-pointer group hover:shadow-[var(--shadow-card-hover)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Thumbnail */}
              <div className={`${study.thumbnail} h-48 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold opacity-60 group-hover:scale-110 transition-transform duration-500">
                    {study.title.split(' ')[0]}
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ExternalLink size={18} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                    {study.category}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {study.year}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {study.title}
                </h3>

                <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                  {study.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results Preview */}
                <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                  {study.results.slice(0, 2).map((result, j) => (
                    <div key={j} className="flex-1">
                      <div className="text-lg font-bold text-[var(--color-primary)]">
                        {result.metric}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
