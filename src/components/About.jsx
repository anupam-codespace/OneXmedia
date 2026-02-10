import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Zap, Target, Users, Award } from 'lucide-react';

function Counter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      desc: 'We push boundaries with cutting-edge tech and modern design patterns that set your brand apart.',
    },
    {
      icon: Target,
      title: 'Results Driven',
      desc: 'Every pixel, every line of code is engineered for conversion, engagement, and measurable impact.',
    },
    {
      icon: Users,
      title: 'Client Focused',
      desc: 'Your vision drives our process. We collaborate closely, ensuring every deliverable exceeds expectations.',
    },
    {
      icon: Award,
      title: 'Quality Obsessed',
      desc: 'We don\'t cut corners. Premium craftsmanship in design, development, and deployment — always.',
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background accents */}
      <div className="glow-spot w-[400px] h-[400px] bg-[rgba(255,59,59,0.06)] top-[20%] right-[-10%]" />

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-start"
        >
          {/* Left Column */}
          <div>
            <motion.span variants={itemVariants} className="section-badge block w-fit">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
              About Us
            </motion.span>

            <motion.h2 variants={itemVariants} className="section-title">
              We're <span className="gradient-text">OneXmedia</span> —<br />
              Your Digital Growth Partner
            </motion.h2>

            <motion.p variants={itemVariants} className="section-subtitle mb-6">
              We're a passionate team of designers, developers, and strategists who
              believe that great digital products can transform businesses. From
              concept to launch, we build experiences that look stunning, perform
              flawlessly, and drive real results.
            </motion.p>


          </div>

          {/* Right Column — Values */}
          <div className="grid gap-5">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="glass-card p-6 flex gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(255,59,59,0.1)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(255,59,59,0.2)] transition-colors duration-300">
                  <item.icon size={22} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
