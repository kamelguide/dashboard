import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Eye, TrendingUp, Users, BarChart3, FileText, Smartphone } from 'lucide-react';
import dash from "../assets/images/test.png"
import prod from "../assets/images/Capture d'écran 2025-05-21 145622.png"
import soc from "../assets/images/sosc.png"
import bons from "../assets/images/Capture d'écran 2025-05-21 145648.png"
import login from "../assets/images/login.png"
import { useTranslation } from 'react-i18next';

const ProfessionalBrandSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef(null);
  const { t } = useTranslation();

  // Helper function to safely get array from translation
  const getSafeFeatures = (key) => {
    try {
      const features = t(key, { returnObjects: true });
      return Array.isArray(features) ? features : [];
    } catch (error) {
      console.warn(`Translation key ${key} failed, using fallback`);
      return [];
    }
  };

  // Helper function to safely get string from translation
  const getSafeTranslation = (key, fallback = '') => {
    try {
      return t(key) || fallback;
    } catch (error) {
      console.warn(`Translation key ${key} failed, using fallback`);
      return fallback;
    }
  };

  // Enhanced slide data with icons and professional content
  const slides = [
    {
      id: 1,
      image: dash,
      title: getSafeTranslation("slider.slides.0.title", "Dashboard Analytics"),
      description: getSafeTranslation("slider.slides.0.description", "Advanced analytics dashboard with real-time insights"),
      category: getSafeTranslation("slider.slides.0.category", "Analytics"),
      accent: "from-primary-500 to-primary-700",
      icon: BarChart3,
      stats: getSafeTranslation("slider.slides.0.stats", "95% Accuracy"),
      features: getSafeFeatures("slider.slides.0.features") || [
        "Real-time data visualization",
        "Advanced filtering options",
        "Export capabilities",
        "Multi-device support"
      ]
    },
    {
      id: 2,
      image: prod,
      title: getSafeTranslation("slider.slides.1.title", "Product Management"),
      description: getSafeTranslation("slider.slides.1.description", "Comprehensive product management solution"),
      category: getSafeTranslation("slider.slides.1.category", "E-commerce"),
      accent: "from-orange-500 to-orange-700",
      icon: TrendingUp,
      stats: getSafeTranslation("slider.slides.1.stats", "2K+ Products"),
      features: getSafeFeatures("slider.slides.1.features") || [
        "Inventory management",
        "Price optimization",
        "Category organization",
        "Bulk operations"
      ]
    },
    {
      id: 3,
      image: soc,
      title: getSafeTranslation("slider.slides.2.title", "Social Media Management"),
      description: getSafeTranslation("slider.slides.2.description", "Professional social media management platform"),
      category: getSafeTranslation("slider.slides.2.category", "Social Media"),
      accent: "from-green-500 to-green-700",
      icon: Eye,
      stats: getSafeTranslation("slider.slides.2.stats", "10M+ Views"),
      features: getSafeFeatures("slider.slides.2.features") || [
        "Multi-platform posting",
        "Analytics tracking",
        "Content scheduling",
        "Engagement monitoring"
      ]
    },
    {
      id: 4,
      image: dash,
      title: getSafeTranslation("slider.slides.3.title", "Customer Management"),
      description: getSafeTranslation("slider.slides.3.description", "Advanced customer relationship management"),
      category: getSafeTranslation("slider.slides.3.category", "CRM"),
      accent: "from-primary-500 to-primary-700",
      icon: Users,
      stats: getSafeTranslation("slider.slides.3.stats", "5K+ Customers"),
      features: getSafeFeatures("slider.slides.3.features") || [
        "Customer profiles",
        "Communication history",
        "Sales tracking",
        "Support tickets"
      ]
    },
    {
      id: 5,
      image: bons,
      title: getSafeTranslation("slider.slides.4.title", "Document Management"),
      description: getSafeTranslation("slider.slides.4.description", "Secure document management system"),
      category: getSafeTranslation("slider.slides.4.category", "Documentation"),
      accent: "from-amber-500 to-amber-700",
      icon: FileText,
      stats: getSafeTranslation("slider.slides.4.stats", "1TB+ Storage"),
      features: getSafeFeatures("slider.slides.4.features") || [
        "Cloud storage",
        "Version control",
        "Access permissions",
        "Search functionality"
      ]
    },
    {
      id: 6,
      image: login,
      title: getSafeTranslation("slider.slides.5.title", "Mobile Application"),
      description: getSafeTranslation("slider.slides.5.description", "Cross-platform mobile application"),
      category: getSafeTranslation("slider.slides.5.category", "Mobile"),
      accent: "from-indigo-500 to-indigo-700",
      icon: Smartphone,
      stats: getSafeTranslation("slider.slides.5.stats", "50K+ Downloads"),
      features: getSafeFeatures("slider.slides.5.features") || [
        "Cross-platform support",
        "Offline functionality",
        "Push notifications",
        "Biometric authentication"
      ]
    }
  ];

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovering, currentSlide]);

  // Safe access to current slide data
  const currentSlideData = slides[currentSlide] || slides[0];
  const Icon = currentSlideData?.icon || BarChart3;
  const safeFeatures = Array.isArray(currentSlideData?.features) ? currentSlideData.features : [];

  return (
    <div id='gallery' className="relative w-full min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: `radial-gradient(circle at ${(currentSlide * 20) + 20}% ${(currentSlide * 15) + 30}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Header Section */}
      <motion.div
        className="relative z-10 text-center py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6"
          variants={itemVariants}
        >
          {getSafeTranslation("slider.header_title", "Professional Solutions")}
          <motion.span
            className="block bg-gradient-to-r from-primary-400 to-primary-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {getSafeTranslation("slider.header_span", "Innovation")}
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl text-primary-200 max-w-3xl mx-auto px-4"
          variants={itemVariants}
        >
          {getSafeTranslation("slider.header_desc", "Discover our comprehensive suite of professional tools and solutions designed to elevate your business to the next level.")}
        </motion.p>
      </motion.div>

      {/* Main Slider Container */}
      <div
        className="relative h-96 md:h-[500px] mx-4 md:mx-12 mb-16"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Navigation Arrows */}
        <motion.button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all"
          onClick={prevSlide}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all"
          onClick={nextSlide}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Slide Container */}
        <div className="relative w-full h-full perspective-1000">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.6 }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="relative w-full h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Content Grid */}
                <div className="grid md:grid-cols-2 h-full">
                  {/* Image Section */}
                  <motion.div
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/600/400";
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${currentSlideData.accent} opacity-20`} />
                    
                    {/* Floating Stats */}
                    <motion.div
                      className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-white text-sm font-semibold">{currentSlideData.stats}</div>
                    </motion.div>

                    {/* Category Badge */}
                    <motion.div
                      className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-white text-sm font-medium">{currentSlideData.category}</span>
                    </motion.div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${currentSlideData.accent} rounded-2xl mb-6`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Icon className="text-white" size={32} />
                    </motion.div>

                    <motion.h3
                      className="text-3xl md:text-4xl font-bold text-white mb-4"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentSlideData.title}
                    </motion.h3>

                    <motion.p
                      className="text-primary-200 text-lg mb-6 leading-relaxed"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentSlideData.description}
                    </motion.p>

                    {/* Features List - Safe rendering */}
                    {safeFeatures.length > 0 && (
                      <motion.div
                        className="space-y-2 mb-8"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {safeFeatures.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center text-primary-300"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${currentSlideData.accent} rounded-full mr-3`} />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* CTA Button */}
                    <motion.button
                      className={`self-start px-8 py-4 bg-gradient-to-r ${currentSlideData.accent} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {getSafeTranslation("slider.cta_button", "Learn More")}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Navigation Dots */}
      <div className="flex justify-center items-center space-x-4 mb-8">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-12 h-3 bg-gradient-to-r from-primary-500 to-orange-500' 
                : 'w-3 h-3 bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Play/Pause Control */}
      <motion.div
        className="flex justify-center mb-16"
        whileHover={{ scale: 1.05 }}
      >
        <a
         href="http://51.178.220.127:8048/"
          onClick={toggleAutoPlay}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all"
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
          <span className="font-medium">
            {isAutoPlaying ? getSafeTranslation("slider.pause", "Pause") : getSafeTranslation("slider.play", "Play")} {getSafeTranslation("slider.footer_title", "Showcase")}
          </span>
        </a>
      </motion.div>

      {/* Enhanced Footer Section */}
      <motion.div
        className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/10 py-16"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {getSafeTranslation("slider.footer_title", "Our Showcase")}
          </motion.h2>
          <motion.p
            className="text-xl text-primary-200 mb-12 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {getSafeTranslation("slider.footer_desc", "Explore our comprehensive suite of professional solutions designed to transform your business operations and drive success.")}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <motion.a
             href="http://51.178.220.127:8048/"
              className="px-10 py-5 bg-gradient-to-r from-primary-700 to-primary-500 text-white font-bold rounded-2xl shadow-lg text-lg"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              {getSafeTranslation("slider.footer_cta", "Get Started")}
            </motion.a>
            <motion.a
             href="http://51.178.220.127:8048/"
              className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg"
              whileHover={{ scale: 1.05, y: -3, borderColor: "rgba(255, 255, 255, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              {getSafeTranslation("slider.learn_more", "Learn More")}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating particles animation */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-400 rounded-full opacity-30"
          animate={{
            x: [0, Math.random() * 100, 0],
            y: [0, Math.random() * 100, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default ProfessionalBrandSlider;