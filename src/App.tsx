import React from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, animate } from 'motion/react';
import { ArrowRight, Play, CheckCircle2, TrendingUp, Users, DollarSign, Activity, MonitorPlay, FileText, Briefcase, GraduationCap, Code, Cpu, Smartphone, Globe, ChevronDown, Star } from 'lucide-react';
import { cn } from './lib/utils';
import profileImg from './channels4_profile.jpg';
import mikiyasImg from './0f62e248-3742-4ea8-a2fa-ae69db2754c6.png';

// --- Shared Components ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'blue' | 'upwork' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95",
          variant === 'primary' 
            ? "bg-text-primary text-white hover:bg-black/90 shadow-lg hover:shadow-xl" 
            : variant === 'blue'
            ? "bg-accent-blue text-white hover:bg-blue-600 shadow-lg hover:shadow-xl"
            : variant === 'upwork'
            ? "bg-[#14a800] text-white hover:bg-[#118000] shadow-lg shadow-emerald-500/20"
            : "bg-white text-text-primary border border-border hover:bg-gray-50 shadow-sm",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const SectionBadge = ({ children, variant = 'yellow' }: { children: React.ReactNode, variant?: 'yellow' | 'blue' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={cn(
      "inline-flex items-center justify-center px-4 py-1.5 rounded-full font-medium text-sm mb-6",
      variant === 'yellow' ? "bg-accent text-text-primary" : "bg-accent-blue text-white"
    )}
  >
    {children}
  </motion.div>
);

// --- Navbar ---
const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-gray-100">
            <img src={profileImg} alt="ETUBERS Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight">ETUBERS</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="https://www.etubers.org/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Courses</a>
          <a href="https://upwork.etubers.org/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Community</a>
          <a href="https://www.etubers.org/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Agency</a>
          <a href="https://abopays.com" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">AboPays</a>
          <a href="#about" className="hover:text-text-primary transition-colors">About Me</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="primary" className="px-6 py-2.5 text-sm" onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}>Join Now</Button>
        </div>
      </div>
    </motion.header>
  );
};


const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-[#FFDF00] px-3 py-1 rounded-xl text-text-primary inline-block mx-1 font-bold">
    {children}
  </span>
);

// --- Demo Modal ---
const DemoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-[2rem] p-6 md:p-8 max-w-lg w-full shadow-2xl relative border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-2">See ETUBERS in Action</h3>
        <p className="text-text-secondary mb-6 text-sm">Watch how ETUBERS helps Ethiopian entrepreneurs build digital income.</p>

        {/* YouTube Embed */}
        <div className="rounded-2xl overflow-hidden aspect-video bg-black shadow-inner">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/NgrXxAPxmEY?autoplay=1"
            title="ETUBERS Demo"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="border-none"
          />
        </div>

        <button
          onClick={() => {
            onClose();
            document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-6 w-full py-3.5 rounded-full bg-accent-blue text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
        >
          Join ETUBERS Now
        </button>
      </motion.div>
    </motion.div>
  );
};

// --- Hero Section ---
const Hero = () => {
  const [showDemo, setShowDemo] = React.useState(false);
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <>
      <AnimatePresence>
        {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
      </AnimatePresence>
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-text-primary max-w-5xl mx-auto leading-[1.1] mb-6"
          >
            Your skills. Your business. <Highlight>Your future.</Highlight>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.4, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium"
          >
            Take full control with Ethiopia's #1 digital business education platform where you can learn, build, and scale with ease.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.6, ease: "easeOut" }}
            className="mt-10 flex items-center justify-center"
          >
            <Button 
              variant="upwork" 
              onClick={() => window.open("https://www.upwork.com/freelancers/mikeetubers", "_blank")}
              className="px-8 py-3.5 text-base rounded-full gap-2"
            >
              Explore Upwork Profile <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

        {/* Isometric Floating Elements Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3.8, ease: "easeOut" }}
          className="mt-20 md:mt-32 relative h-[300px] md:h-[450px] w-full max-w-5xl mx-auto"
        >
           {/* Center blue diamond */}
           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-accent-blue rounded-3xl shadow-float flex items-center justify-center z-20"
             style={{ transform: "translate(-50%, -50%) rotateX(60deg) rotateZ(45deg)" }}
             animate={{ y: [0, -20, 0] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
           >
              <div className="text-white transform -rotate-45 font-bold text-xl md:text-2xl flex flex-col items-center justify-center gap-2 md:gap-3">
                 <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-inner bg-white shrink-0">
                   <img src={profileImg} alt="ETUBERS Logo" className="w-full h-full object-cover" />
                 </div>
                 <span>ETUBERS</span>
              </div>
           </motion.div>

           {/* Floating Cards */}
           <motion.div 
             className="absolute top-[5%] left-[5%] md:left-[15%] bg-white rounded-2xl shadow-soft p-3 md:p-4 z-10 border border-gray-100"
             style={{ transform: "rotateX(60deg) rotateZ(45deg)", y: y1 }}
             animate={{ y: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 5, delay: 1, ease: "easeInOut" }}
           >
              <div className="transform -rotate-45 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                   <DollarSign className="w-4 h-4" />
                 </div>
                 <div>
                   <p className="text-xs text-text-secondary font-medium">Upwork</p>
                   <p className="text-sm font-bold text-text-primary">+$2,450</p>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             className="absolute bottom-[10%] left-[10%] md:left-[25%] bg-white rounded-2xl shadow-soft p-3 md:p-4 z-30 border border-gray-100"
             style={{ transform: "rotateX(60deg) rotateZ(45deg)", y: y2 }}
             animate={{ y: [0, 15, 0] }}
             transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
           >
              <div className="transform -rotate-45 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                   <Play className="w-4 h-4 fill-current" />
                 </div>
                 <div>
                   <p className="text-xs text-text-secondary font-medium">YouTube</p>
                   <p className="text-sm font-bold text-text-primary">10M+ Views</p>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             className="absolute top-[15%] right-[5%] md:right-[15%] bg-white rounded-2xl shadow-soft p-3 md:p-4 z-10 border border-gray-100"
             style={{ transform: "rotateX(60deg) rotateZ(45deg)", y: y3 }}
             animate={{ y: [0, -12, 0] }}
             transition={{ repeat: Infinity, duration: 6.5, delay: 0.5, ease: "easeInOut" }}
           >
              <div className="transform -rotate-45 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                   <TrendingUp className="w-4 h-4" />
                 </div>
                 <div>
                   <p className="text-xs text-text-secondary font-medium">Forex</p>
                   <p className="text-sm font-bold text-text-primary">+3.2% Today</p>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             className="absolute bottom-[5%] right-[10%] md:right-[20%] bg-white rounded-2xl shadow-soft p-3 md:p-4 z-30 border border-gray-100"
             style={{ transform: "rotateX(60deg) rotateZ(45deg)", y: y1 }}
             animate={{ y: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 5.5, delay: 1.5, ease: "easeInOut" }}
           >
              <div className="transform -rotate-45 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-text-primary">
                   <Users className="w-4 h-4" />
                 </div>
                 <div>
                   <p className="text-xs text-text-secondary font-medium">Community</p>
                   <p className="text-sm font-bold text-text-primary">33k+ Members</p>
                 </div>
              </div>
           </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </section>
    </>
  );
};

// --- Trust Section ---
const StatCounter = ({ end, suffix = "", label }: { end: number, suffix?: string, label: string }) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (inView) {
      const controls = animate(0, end, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (value) => {
          setDisplayValue(Math.round(value));
        }
      });
      return controls.stop;
    }
  }, [end, inView]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-soft transform transition-all duration-300 hover:scale-105 hover:shadow-float">
      <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
        {displayValue}{suffix}
      </h3>
      <p className="text-sm font-medium text-text-secondary text-center">{label}</p>
    </div>
  )
}

// --- Trust Section ---
const Trust = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionBadge>Our Impact</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Join Ethiopia's fastest-growing<br/>digital community</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }}>
            <StatCounter end={430} suffix="K+" label="YouTube Subscribers" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}>
            <StatCounter end={150} suffix="K+" label="TikTok Followers" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }}>
            <StatCounter end={33} suffix="K+" label="Telegram Members" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.4 }}>
            <StatCounter end={10} suffix="M+" label="Educational Views" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// --- Choose Your Path ---
const PathCard = ({ icon: Icon, title, features, delay, linkUrl }: { icon: any, title: string, features: string[], delay: number, linkUrl: string }) => {
  const isUpwork = linkUrl.includes("upwork.com");
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-float transition-all duration-300 border border-border group flex flex-col justify-between h-full"
    >
      <div>
        <div className="w-14 h-14 rounded-2xl bg-bg-base flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-text-secondary">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
              <span className="text-sm font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <a 
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 border shadow-sm gap-2 ${
          isUpwork 
            ? "bg-[#14a800] text-white border-transparent hover:bg-[#118000] shadow-lg shadow-emerald-500/20" 
            : "bg-white text-text-primary border-border hover:bg-gray-50 hover:border-text-primary/30"
        }`}
      >
        {isUpwork ? (
          <>
            <ArrowRight className="w-4 h-4 text-white" />
            Explore Upwork Path
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current text-accent" />
            Explore Path
          </>
        )}
      </a>
    </motion.div>
  )
}

const ChoosePath = () => {
  return (
    <section className="py-24 px-6 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionBadge>Career Paths</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Manage your digital career<br/>like a business</h2>
          <p className="text-lg text-text-secondary">We've structured our ecosystem into clear, actionable paths. Choose the one that fits your goals and start building.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PathCard 
            delay={0}
            icon={Code} 
            title="Digital Skills" 
            features={["Upwork Mastery", "Video Editing Pro", "AI Integrations", "Vibe Coding"]} 
            linkUrl="https://youtu.be/NgrXxAPxmEY?si=9UINbDQKNEbRcHnX"
          />
          <PathCard 
            delay={0.2}
            icon={TrendingUp} 
            title="Trading" 
            features={["Forex Fundamentals", "ICT Concepts", "Passing Funded Accounts", "Risk Management"]} 
            linkUrl="https://youtu.be/uNWAbUCyebw?si=Rnvy2hx2pJzR-eQP"
          />
          <PathCard 
            delay={0.4}
            icon={Smartphone} 
            title="Mobile Business" 
            features={["Phone-Based Income", "Online Services Arbitrage", "Digital Product Sales", "Content Creation Basics"]} 
            linkUrl="https://youtu.be/oh2GMHE7PFk?si=9iIuNW2VFfBayP9p"
          />
        </div>
      </div>
    </section>
  )
}

// --- Ecosystem Workflow ---
const Ecosystem = () => {
  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionBadge>Ecosystem</SectionBadge>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
        >
          Everything you need to succeed<br/>in one interconnected ecosystem
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-text-secondary max-w-2xl mx-auto mb-20"
        >
          With ETUBERS, education, application, and earnings are seamlessly integrated.
        </motion.p>
        
        {/* Abstract representation of the workflow from the reference video */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[500px] w-full max-w-4xl mx-auto mt-16"
        >
          {/* Main central hub */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-[10%] left-1/2 -translate-x-1/2 bg-accent-blue text-white px-8 py-3 rounded-full shadow-lg z-20 flex items-center justify-center font-medium text-lg"
          >
            Digital Ecosystem
          </motion.div>

          {/* Connection Lines (SVG) */}
          <svg className="absolute top-[10%] left-0 w-full h-[400px] z-0 pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.5 }}
               d="M 500 20 L 500 60 L 200 60 L 200 120" 
               fill="none" stroke="#E5E7EB" strokeWidth="2"
             />
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.6 }}
               d="M 500 20 L 500 60 L 400 60 L 400 120" 
               fill="none" stroke="#E5E7EB" strokeWidth="2"
             />
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.7 }}
               d="M 500 20 L 500 60 L 600 60 L 600 120" 
               fill="none" stroke="#E5E7EB" strokeWidth="2"
             />
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.8 }}
               d="M 500 20 L 500 60 L 800 60 L 800 120" 
               fill="none" stroke="#E5E7EB" strokeWidth="2"
             />

             {/* Branching below */}
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 1 }}
               d="M 400 150 L 400 220" 
               fill="none" stroke="#E5E7EB" strokeWidth="2"
             />
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 1.1 }}
               d="M 600 150 L 600 220" 
               fill="none" stroke="#E5E7EB" strokeWidth="2"
             />
          </svg>

          {/* Dots on lines */}
          <div className="absolute top-[calc(10%+120px)] left-[20%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-blue rounded-full z-10"></div>
          <div className="absolute top-[calc(10%+120px)] left-[40%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-blue rounded-full z-10"></div>
          <div className="absolute top-[calc(10%+120px)] left-[60%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-blue rounded-full z-10"></div>
          <div className="absolute top-[calc(10%+120px)] left-[80%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-blue rounded-full z-10"></div>
          
          <div className="absolute top-[calc(10%+220px)] left-[40%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-blue rounded-full z-10"></div>
          <div className="absolute top-[calc(10%+220px)] left-[60%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-blue rounded-full z-10"></div>

          {/* Tier 2 Nodes */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="absolute top-[calc(10%+140px)] left-[20%] -translate-x-1/2 bg-white px-4 py-3 rounded-lg shadow-soft w-40 text-xs font-medium border border-border"
          >
            Digital Skills
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="absolute top-[calc(10%+140px)] left-[40%] -translate-x-1/2 bg-white px-4 py-3 rounded-lg shadow-soft w-40 text-xs font-medium border border-border"
          >
            AboPays Finance
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute top-[calc(10%+140px)] left-[60%] -translate-x-1/2 bg-white px-4 py-3 rounded-lg shadow-soft w-40 text-xs font-medium border border-border"
          >
            Agency Services
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="absolute top-[calc(10%+140px)] left-[80%] -translate-x-1/2 bg-white px-4 py-3 rounded-lg shadow-soft w-40 text-xs font-medium border border-border"
          >
            Community
          </motion.div>

          {/* Tier 3 Nodes */}
           <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="absolute top-[calc(10%+240px)] left-[40%] -translate-x-1/2 bg-white px-4 py-3 rounded-lg shadow-soft w-40 text-xs font-medium border border-border"
          >
            Seamless Payments
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="absolute top-[calc(10%+240px)] left-[60%] -translate-x-1/2 bg-white px-4 py-3 rounded-lg shadow-soft w-40 text-xs font-medium border border-border"
          >
            Client Acquisition
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

// --- FAQ Section ---
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-border py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-bold text-lg md:text-xl text-text-primary hover:text-accent-blue transition-colors gap-4"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-text-secondary"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-text-secondary leading-relaxed text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge>Questions</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-text-secondary">Have questions about ETUBERS? We have got you covered.</p>
        </div>

        <div className="space-y-2">
          <FAQItem 
            question="How do I start learning on ETUBERS?" 
            answer="Simply choose a path (Digital Skills, Trading, or Mobile Business) and join our free Telegram channel. From there, you can access our structured training and community support."
          />
          <FAQItem 
            question="Do I need a laptop to earn an income?" 
            answer="No! While a laptop is recommended for advanced skills like coding, many of our members build highly successful online businesses using only their smartphones."
          />
          <FAQItem 
            question="How do ETUBERS members receive payments in Ethiopia?" 
            answer="We teach you how to set up international payment gateways, use local banking integrations, and leverage AboPays for seamless, direct transfers."
          />
          <FAQItem 
            question="Are the classes and masterclasses in Amharic?" 
            answer="Yes, all our educational materials, video guides, and masterclasses are fully prepared in clear, step-by-step Amharic, designed specifically for Ethiopian creators and developers."
          />
          <FAQItem 
            question="Is the community really free to join?" 
            answer="Yes! Our main Telegram community and many of our basic training resources are 100% free. We also offer premium masterclasses and agency services for those looking to scale rapidly."
          />
        </div>
      </div>
    </section>
  )
}

// --- Success Stories Section ---
const TestimonialCard = ({ 
  quote, 
  name, 
  role, 
  date, 
  rating = 5.0 
}: { 
  quote: string, 
  name: string, 
  role: string, 
  date: string, 
  rating?: number 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.01, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => window.open("https://www.upwork.com/freelancers/mikeetubers", "_blank")}
      className="bg-white p-6 md:p-8 rounded-3xl shadow-soft border border-border h-full flex flex-col relative overflow-hidden group cursor-pointer"
    >
      {/* Sweeping shine hover effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out-expo pointer-events-none" />

      {/* Top Upwork Indicator Badge */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14a800]"></span>
          </span>
          <span className="text-[10px] font-bold text-[#14a800] uppercase tracking-wider">Upwork Feedback</span>
        </div>
        <span className="text-xs text-text-secondary font-medium">{date}</span>
      </div>

      {/* Stars and Rating Row */}
      <div className="flex items-center gap-1 mb-4">
        <div className="flex items-center text-amber-500 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, rotate: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
            </motion.div>
          ))}
        </div>
        <span className="text-xs font-bold text-text-primary ml-1">{rating.toFixed(1)}</span>
      </div>

      <div className="flex-grow mb-6">
        <p className="text-base font-medium text-text-primary leading-relaxed italic">
          "{quote}"
        </p>
      </div>

      {/* Client and Job metadata */}
      <div className="pt-6 border-t border-gray-100 mt-auto">
        <h4 className="font-bold text-text-primary text-sm line-clamp-2 mb-3 leading-snug group-hover:text-accent-blue transition-colors">
          {role}
        </h4>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-[10px] font-bold text-[#14a800] shrink-0">
            {name.charAt(0)}
          </div>
          <span className="text-xs text-text-secondary font-semibold">{name}</span>
        </div>
      </div>
    </motion.div>
  )
}

const SuccessStories = () => {
  return (
    <section className="py-24 px-6 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadge>Client Reviews</SectionBadge>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Verified Upwork Feedback
          </motion.h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See what international clients say about working with Mikiyas and the ETUBERS team on global freelancing platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }}>
            <TestimonialCard 
              quote="Awesome strategy session"
              name="Marc N."
              role="Youtube video editor - title - taggs"
              date="February 3, 2024"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}>
            <TestimonialCard 
              quote="Thank you Mikiyas for the good job!"
              name="Verified Client"
              role="Long-Term Video Editor for face-video like James Jani in finance & investment niche"
              date="April 9, 2023"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }}>
            <TestimonialCard 
              quote="As usual, Mikiyas done brilliant job!"
              name="Verified Client"
              role="YouTube Shorts Video Editor for face-video like James Jani in finance & investment niche"
              date="March 15, 2023"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.4 }}>
            <TestimonialCard 
              quote="Mikiyas is really professional and care about his work & craft. I would love to work with Mikiyas again for another projects! He sticks to the timeline, deliver good quality, and..."
              name="Verified Client"
              role="Video Editor to find/ screen rec, download footages"
              date="March 8, 2023"
            />
          </motion.div>
        </div>

        {/* Upwork Profile Link CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a 
            href="https://www.upwork.com/freelancers/mikeetubers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#14a800] text-white px-8 py-4 rounded-full font-bold hover:bg-[#118000] transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 text-base group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span>View Upwork Profile</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <p className="text-xs text-text-secondary mt-3 font-medium">
            100% Job Success Score • Top Rated Plus Freelancer
          </p>
        </motion.div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-3xl -z-10 translate-x-1/3 translate-y-1/3"></div>
    </section>
  )
}

// --- Footer Section ---
const CTA = () => {
  return (
    <footer id="join" className="bg-white pt-32 mt-32 relative">
      {/* Floating Dark Banner */}
      <div className="max-w-6xl mx-auto px-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="bg-[#111111] rounded-[2rem] p-12 text-center shadow-float border border-gray-800">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8 flex items-center justify-center gap-6">
            <span className="w-4 h-4 rounded-full bg-[#FFDF00]"></span>
            Join ETUBERS Today
            <span className="w-4 h-4 rounded-full bg-[#FFDF00]"></span>
          </h2>
          
          <div className="flex justify-center gap-4">
             <a href="https://t.me/etubersmoney" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="m15 10-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg></a>
             <a href="https://www.tiktok.com/@etubers" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-3v5.71A4 4 0 0 1 9 12Z"/></svg></a>
             <a href="https://www.instagram.com/etubersofficial/?hl=en" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
             <a href="https://www.youtube.com/@etubers" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
          </div>
        </div>
      </div>

      {/* Actual Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 pb-12 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-8 gap-6">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200">
               <img src={profileImg} alt="ETUBERS Logo" className="w-full h-full object-cover" />
             </div>
             <span className="font-bold text-xl text-text-primary tracking-tight">ETUBERS</span>
           </div>
           
           <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-text-secondary">
              <a href="https://www.etubers.org/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Courses</a>
              <a href="https://www.etubers.org/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Agency</a>
              <a href="https://abopays.com" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">AboPays</a>
              <a href="https://upwork.etubers.org/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Community</a>
              <a href="#" className="hover:text-text-primary transition-colors">Legal</a>
           </nav>


        </div>
      </div>
    </footer>
  )
}


// --- About Section ---
const About = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square shadow-float">
              <img src={mikiyasImg} alt="Mikiyas Mulugeta" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-bold text-2xl">Mikiyas Mulugeta</p>
                <p className="text-gray-200">Founder, ETUBERS</p>
              </div>
            </div>
          </motion.div>
          
          <div className="w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <SectionBadge variant="blue">About Me</SectionBadge>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-text-primary"
            >
              Never Settle. Talk Less. Do More.
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 text-lg text-text-secondary"
            >
              <p>
                My name is <strong className="text-text-primary font-semibold">Mikiyas Mulugeta</strong>, and I am a serial entrepreneur, digital business mentor, and educational content creator. Driven by a passion for financial literacy and digital innovation, I hold two master's degrees: an MBA in Digital Marketing and an MSFI (Master of Science) in Finance & Foreign Investment. This combination of advanced financial expertise and digital marketing strategy forms the foundation of everything I teach.
              </p>
              <p>
                Through my platform, <strong className="text-text-primary font-semibold">Etubers</strong>, my mission is to bridge the digital literacy gap for the next generation of African entrepreneurs. I don't just teach theory; I provide actionable, step-by-step frameworks that empower individuals to master technical digital skills, navigate global freelance markets like Upwork, and build sustainable online businesses from scratch.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 gap-6"
            >
              <div className="bg-bg-base p-5 rounded-2xl border border-border">
                <p className="text-3xl font-bold text-text-primary mb-1">2</p>
                <p className="text-sm text-text-secondary font-medium">Master's Degrees</p>
              </div>
              <div className="bg-bg-base p-5 rounded-2xl border border-border">
                <p className="text-3xl font-bold text-text-primary mb-1">10M+</p>
                <p className="text-sm text-text-secondary font-medium">Lives Reached</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const IntroAnimation = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Elegant Profile Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-8 border border-white/10 shadow-2xl relative"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-overlay"></div>
             <img src={profileImg} alt="ETUBERS" className="w-full h-full object-cover" />
          </motion.div>

          {/* Luxury Text Reveal */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-[0.2em] text-white uppercase ml-[0.2em]"
            >
              ETUBERS
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="text-xs md:text-sm text-gray-500 tracking-[0.3em] uppercase font-medium ml-[0.3em]"
            >
              Never Settle. Talk Less. Do More.
            </motion.p>
          </div>

          {/* Elegant Progress Line */}
          <motion.div
            className="w-48 md:w-64 h-[1px] bg-gray-800 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base font-sans selection:bg-accent/20">
      <IntroAnimation />
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <ChoosePath />
        <Ecosystem />
        <About />
        <FAQ />
        <SuccessStories />
        <CTA />
      </main>
    </div>
  );
}
