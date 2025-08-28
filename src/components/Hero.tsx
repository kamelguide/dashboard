import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, FileText, Package, BarChart3 } from "lucide-react";
import VendeurShowcase from "./VendeurShowcase";
import { useTranslation } from "react-i18next";

const Hero = () => {
  // For animation
  const { t, i18n } = useTranslation(); // ✅ ajout
  const isRTL = i18n.language === "ar"; // ✅ ajout

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const showcaseRef = useRef(null);

  const [hoverButton, setHoverButton] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      id: "invoices",
      icon: <FileText className="w-6 h-6 text-yellow-500" />,
      title: t("feature_invoices_title"), // ✅ modifié
      description: t("feature_invoices_desc") // ✅ modifié
    },
    {
      id: "products",
      icon: <Package className="w-6 h-6 text-primary-500" />,
      title: t("feature_products_title"), // ✅ modifié
      description: t("feature_products_desc") // ✅ modifié
    },
    {
      id: "analytics",
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: t("feature_analytics_title"), // ✅ modifié
      description: t("feature_analytics_desc") // ✅ modifié
    }
  ];
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

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
        <section
      id="home"
      dir={isRTL ? 'rtl' : 'ltr'}// ✅ ajout
      className={`relative min-h-screen  -pt-10 lg:pt-24 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0,rgba(29,78,216,0)_65%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30"></div>

      <div className=" mx-2 lg:mx-20 flex justify-center items-center  mt-32  relative z-10">
        <div     dir={isRTL ? "rtl" : "ltr"} 
        className={`flex flex-col  lg:flex-row items-center gap-12 lg:gap-16 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <div className="w-full lg:w-1/2 text-center lg:text-left pt-8 lg:pt-16">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 tracking-tight"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="block">{t("hero_title_line1")}</span> {/* ✅ modifié */}
              <span className="mt-2 relative inline-block">
                <span className="text-[#E28648]">{t("hero_title_line2")}</span> {/* ✅ modifié */}
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="text-lg text-white/90 mb-8 opacity-0 leading-relaxed"
              style={{ animationDelay: "0.4s" }}
            >
              {t("hero_description")} {/* ✅ modifié */}
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0 mb-12"
              style={{ animationDelay: "0.6s" }}
            >
              <a
                href="http://51.178.220.127:8048/"
                className="bg-[#E28648] hover:bg-[#E28648] text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 inline-flex items-center"
                onMouseEnter={() => setHoverButton("start")}
                onMouseLeave={() => setHoverButton(null)}
              >
                {t("hero_button_start")}
                <ChevronRight className="ml-2 w-5 h-5 animate-bounce-x" />
              </a>
              <a
                 href="http://51.178.220.127:8048/"
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-lg border border-white/30 transition-all duration-300 hover:border-white/50 hover:scale-105"
                onMouseEnter={() => setHoverButton("explore")}
                onMouseLeave={() => setHoverButton(null)}
                onClick={scrollToFeatures}
              >
                {t("hero_button_features")}
              </a>
            </div>

            <div className="hidden lg:flex gap-4 mt-8">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 p-4 rounded-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/20 ${
                    activeFeature === feature.id ? "bg-white/15 border-white/30" : ""
                  }`}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <div className="bg-gradient-to-br from-primary-900 to-primary-700 w-12 h-12 flex items-center justify-center rounded-lg mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {activeFeature === feature.id && feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - VendeurShowcase */}
          <div 
            ref={showcaseRef}
            className="w-full md:w-full lg:w-1/2 opacity-0 pt-4 lg:pt-1"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-primary-400 rounded-3xl opacity-20 blur-xl"></div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-[#E28648] rounded-full opacity-20 blur-xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary-400 rounded-full opacity-20 blur-xl animate-pulse-slow animation-delay-1000"></div>
              
              {/* Frame */}
              <div className="  -top-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
                <div className="bg-white/5 absolute inset-0 z-0"></div>
                
                {/* VendeurShowcase Container */}
                <div className="relative z-10 transform transition-all   duration-700 scale-100">
                  <div className={`transition-all duration-700 ${showDemo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative py-2">
                      {/* Browser Controls */}
                      <div className="flex items-center space-x-1.5 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-[#E28648]"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      
                      {/* Browser Content */}
                      <div className="relative   w-full overflow-hidden">
                        <div style={{ transform: 'scale(1)', transformOrigin: 'top left' }}>
                          <VendeurShowcase />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={scrollToFeatures}
          className="text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/20 animate-float"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes button-pulse {
          0%, 100% { box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
        .animate-button-pulse {
          animation: button-pulse 1.5s infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;