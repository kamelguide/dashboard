import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, FileText, Package, BarChart3, Play, Sparkles, TrendingUp, Users, Shield } from "lucide-react";
import VendeurShowcase from "./VendeurShowcase";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const showcaseRef = useRef(null);

  const [hoverButton, setHoverButton] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      id: "invoices",
      icon: <FileText className="w-6 h-6 text-yellow-500" />,
      title: t("feature_invoices_title"),
      description: t("feature_invoices_desc"),
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: "products",
      icon: <Package className="w-6 h-6 text-primary-500" />,
      title: t("feature_products_title"),
      description: t("feature_products_desc"),
      color: "from-blue-400 to-primary-600"
    },
    {
      id: "analytics",
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: t("feature_analytics_title"),
      description: t("feature_analytics_desc"),
      color: "from-green-400 to-emerald-600"
    }
  ];

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    if (buttonsRef.current) observer.observe(buttonsRef.current);
    if (showcaseRef.current) observer.observe(showcaseRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (descriptionRef.current) observer.unobserve(descriptionRef.current);
      if (buttonsRef.current) observer.unobserve(buttonsRef.current);
      if (showcaseRef.current) observer.unobserve(showcaseRef.current);
    };
  }, []);

  // Auto show demo after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDemo(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="mx-2 lg:mx-20 flex justify-center items-center mt-16 lg:mt-32 relative z-10">
        <div 
          dir={isRTL ? "rtl" : "ltr"} 
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${isRTL ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left pt-8 lg:pt-16">
            {/* Badge */}
            <div
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              {t("hero_badge", "✨ Nouvelle version disponible")}
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 opacity-0 tracking-tight leading-tight"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="block relative">
                {t("hero_title_line1")}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl rounded-lg -z-10" />
              </span>
              <span className="mt-2 relative inline-block">
                <span className="bg-gradient-to-r from-[#E28648] via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-gradient-x">
                  {t("hero_title_line2")}
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#E28648] to-orange-500 rounded-full transform scale-x-0 animate-scale-x" style={{ animationDelay: "1s" }} />
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-white/90 mb-8 opacity-0 leading-relaxed max-w-2xl"
              style={{ animationDelay: "0.4s" }}
            >
              {t("hero_description")}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">10K+ Users</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">Enterprise Security</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0 mb-12"
              style={{ animationDelay: "0.6s" }}
            >
              <a
                href="http://51.178.220.127:8048/"
                className="group relative bg-gradient-to-r from-[#E28648] to-orange-500 hover:from-orange-500 hover:to-[#E28648] text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 inline-flex items-center overflow-hidden"
                onMouseEnter={() => setHoverButton("start")}
                onMouseLeave={() => setHoverButton(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {t("hero_button_start")}
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E28648] to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </a>
              
              <button
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium py-4 px-8 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 inline-flex items-center"
                onMouseEnter={() => setHoverButton("explore")}
                onMouseLeave={() => setHoverButton(null)}
                onClick={scrollToFeatures}
              >
                <BarChart3 className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {t("hero_button_features")}
              </button>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="hidden lg:grid grid-cols-1 gap-4 mt-8">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 p-6 rounded-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl ${
                    activeFeature === index ? "bg-white/15 border-white/30 scale-105" : ""
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`relative w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-30 blur-xl rounded-xl transition-opacity duration-300`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className={`text-white/70 text-sm leading-relaxed transition-all duration-500 ${
                        activeFeature === index ? "opacity-100 max-h-20" : "opacity-70 max-h-12 overflow-hidden"
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${feature.color} transition-all duration-4000 ${
                        activeFeature === index ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - Enhanced VendeurShowcase */}
          <div 
            ref={showcaseRef}
            className="w-full md:w-full lg:w-1/2 opacity-0 pt-4 lg:pt-1"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="relative group">
              {/* Enhanced background effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary-600/30 via-[#E28648]/30 to-orange-500/30 rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-40 blur-xl" />
              
              {/* Floating decorative elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-[#E28648]/30 to-orange-500/30 rounded-full opacity-60 blur-xl animate-pulse" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full opacity-60 blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
              
              {/* Main showcase frame */}
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-700">
                {/* Glass morphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0" />
                
                {/* Browser-like header */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                  <div className="flex-1 mx-4 bg-white/10 rounded-lg px-3 py-1 text-xs text-white/70 text-center">
                    vendeur.app
                  </div>
                  <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/50 rounded-full" />
                  </div>
                </div>
                
                {/* Showcase content */}
                <div className="relative z-10 transform transition-all duration-700 scale-100">
                  <div className={`transition-all duration-700 ${showDemo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative">
                      <VendeurShowcase />
                      
                      {/* Overlay gradient for better integration */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
                    </div>
                  </div>
                </div>
                
                {/* Loading state */}
                {!showDemo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary-900/50 backdrop-blur-sm rounded-3xl">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-white/20 rounded-full animate-spin" />
                        <div className="absolute inset-0 w-12 h-12 border-4 border-[#E28648] border-t-transparent rounded-full animate-spin" />
                      </div>
                      <p className="text-white/80 font-medium">Loading Dashboard...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <p className="text-white/60 text-sm mb-2 font-medium">Scroll to explore</p>
        <button
          onClick={scrollToFeatures}
          className="group text-white p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/20 animate-bounce-slow"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-scale-x {
          animation: scale-x 1s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .duration-4000 {
          transition-duration: 4000ms;
        }
        
        /* Glass morphism effects */
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </section>
  );
};

export default Hero;