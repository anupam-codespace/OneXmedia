import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CaseStudies from './components/CaseStudies';
import ServiceDetail from './components/ServiceDetail';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);

  const showCaseStudies = () => {
    setCurrentPage('case-studies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHome = () => {
    setCurrentPage('home');
    setSelectedService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showService = (title) => {
    setSelectedService(title);
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="noise-overlay">
      <CustomCursor />
      {currentPage === 'home' ? (
        <>
          <Navbar />
          <main>
            <Hero />
            <TechMarquee />
            <About />
            <Services onServiceClick={showService} />
            <Portfolio onViewCaseStudies={showCaseStudies} />
            <Process />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      ) : currentPage === 'case-studies' ? (
        <CaseStudies onBack={showHome} />
      ) : (
        <ServiceDetail serviceTitle={selectedService} onBack={showHome} />
      )}
    </div>
  );
}

export default App;
