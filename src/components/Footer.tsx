import React, { useState, useEffect } from "react";
import { 
  BarChart2, 
  Twitter, 
  Linkedin, 
  Github, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  ExternalLink,
  Send,
  Globe,
  Heart
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import logo from "../../src/assets/images/logoIcon.png";

const Footer = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  // Helper function for safe translations
  const getSafeTranslation = (key, fallback = '') => {
    try {
      return t(key) || fallback;
    } catch (error) {
      console.warn(`Translation key ${key} failed, using fallback`);
      return fallback;
    }
  };

  // Show back to top button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Detect active section for menu highlighting
    const detectActiveSection = () => {
      const sections = ["home", "features", "gallery", "testimonials", "contact"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", detectActiveSection);
    
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", detectActiveSection);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubscribeStatus({ 
        type: 'success', 
        message: getSafeTranslation("footer.newsletter.success", "Thank you for subscribing! Check your email for confirmation.")
      });
      setEmail("");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 5000);
      
    } catch (error) {
      setSubscribeStatus({ 
        type: 'error', 
        message: getSafeTranslation("footer.newsletter.error", "Failed to subscribe. Please try again.")
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Social links with translations
  const socialLinks = [
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: "#", 
      label: getSafeTranslation("footer.social.twitter", "Twitter"),
      color: "hover:bg-primary-500"
    },
    { 
      icon: <Facebook className="w-5 h-5" />, 
      href: "#", 
      label: getSafeTranslation("footer.social.facebook", "Facebook"),
      color: "hover:bg-primary-600"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: "#", 
      label: getSafeTranslation("footer.social.linkedin", "LinkedIn"),
      color: "hover:bg-primary-700"
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      href: "#", 
      label: getSafeTranslation("footer.social.github", "GitHub"),
      color: "hover:bg-gray-700"
    }
  ];

  // Quick links with translations
  const quickLinks = [
    { 
      name: getSafeTranslation("footer.navigation.home", "Home"), 
      id: "home" 
    },
    { 
      name: getSafeTranslation("footer.navigation.features", "Features"), 
      id: "features" 
    },
    { 
      name: getSafeTranslation("footer.navigation.gallery", "Gallery"), 
      id: "gallery" 
    },
    { 
      name: getSafeTranslation("footer.navigation.testimonials", "Testimonials"), 
      id: "testimonials" 
    },
    { 
      name: getSafeTranslation("footer.navigation.contact", "Contact"), 
      id: "contact" 
    }
  ];

  // Resources with translations
  const resources = [
    { 
      name: getSafeTranslation("footer.resources.documentation", "Documentation"), 
      href: "#" 
    },
    { 
      name: getSafeTranslation("footer.resources.api", "API Reference"), 
      href: "#" 
    },
    { 
      name: getSafeTranslation("footer.resources.blog", "Blog"), 
      href: "#" 
    },
    { 
      name: getSafeTranslation("footer.resources.tutorials", "Tutorials"), 
      href: "#" 
    },
    { 
      name: getSafeTranslation("footer.resources.support", "Support Center"), 
      href: "#" 
    }
  ];

  // Legal links with translations
  const legal = [
    { 
      name: getSafeTranslation("footer.legal.terms", "Terms of Service"), 
      href: "#" 
    },
    { 
      name: getSafeTranslation("footer.legal.privacy", "Privacy Policy"), 
      href: "#" 
    },
    { 
      name: getSafeTranslation("footer.legal.cookies", "Cookie Policy"), 
      href: "#" 
    },
    { 
      name: getSafeTranslation("footer.legal.gdpr", "GDPR Compliance"), 
      href: "#" 
    },
    { 
      name: getSafeTranslation("footer.legal.security", "Security"), 
      href: "#" 
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-primary-900 via-primary-900 to-primary-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-500 to-primary-500 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-orange-400 to-orange-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-primary-400 to-primary-400 opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: "4s" }} />

      {/* Wave SVG Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-100%]">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
            className="text-white"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="group transition-all duration-500 hover:transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="relative">
                <img 
                  src={logo} 
                  alt={getSafeTranslation("footer.company.logo_alt", "Vendeur Logo")} 
                  className="w-40 h-10 object-contain transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover:opacity-20 rounded transition-opacity duration-500" />
              </div>
            </div>
            
            <p className="text-primary-200 mb-6 leading-relaxed">
              {getSafeTranslation("footer.company.description", "Transforming complex data into actionable insights through intuitive, powerful dashboard solutions.")}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  aria-label={social.label}
                  className={`text-primary-300 hover:text-white p-3 bg-primary-800 bg-opacity-50 backdrop-blur-sm hover:bg-opacity-80 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg border border-primary-700 hover:border-primary-500 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="group transition-all duration-500 hover:transform hover:-translate-y-2">
            <h3 className="text-xl font-bold mb-6 text-primary-100 pb-3 border-b-2 border-primary-400 relative">
              {getSafeTranslation("footer.sections.navigation", "Quick Links")}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-500" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`text-primary-300 hover:text-white transition-all duration-300 flex items-center group/link ${
                      activeSection === link.id ? 'text-orange-400 font-semibold' : ''
                    }`}
                  >
                    <span className="mr-3 opacity-0 transition-all duration-300 group-hover/link:opacity-100 text-orange-400">→</span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div className="group transition-all duration-500 hover:transform hover:-translate-y-2">
            <h3 className="text-xl font-bold mb-6 text-primary-100 pb-3 border-b-2 border-primary-400 relative">
              {getSafeTranslation("footer.sections.resources", "Resources")}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-500" />
            </h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <a 
                    href={resource.href} 
                    className="text-primary-300 hover:text-white transition-all duration-300 flex items-center group/link"
                  >
                    <span className="mr-3 opacity-0 transition-all duration-300 group-hover/link:opacity-100 text-orange-400">→</span>
                    {resource.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter Signup */}
          <div className="group transition-all duration-500 hover:transform hover:-translate-y-2">
            <h3 className="text-xl font-bold mb-6 text-primary-100 pb-3 border-b-2 border-primary-400 relative">
              {getSafeTranslation("footer.sections.newsletter", "Stay Updated")}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-500" />
            </h3>
            
            <p className="text-primary-300 mb-6 leading-relaxed">
              {getSafeTranslation("footer.newsletter.description", "Subscribe to our newsletter for the latest updates and insights.")}
            </p>
            
            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder={getSafeTranslation("footer.newsletter.placeholder", "Your email address")}
                  className="w-full px-4 py-3 bg-primary-800 bg-opacity-50 backdrop-blur-sm border border-primary-600 rounded-xl text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubscribing}
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </form>

            {/* Subscribe Status */}
            {subscribeStatus && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                subscribeStatus.type === 'success' 
                  ? 'bg-green-500 bg-opacity-20 text-green-300 border border-green-500' 
                  : 'bg-red-500 bg-opacity-20 text-red-300 border border-red-500'
              }`}>
                {subscribeStatus.message}
              </div>
            )}
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center text-primary-300 hover:text-white transition-colors duration-300 group/contact">
                <div className="p-2 bg-primary-800 bg-opacity-50 rounded-lg mr-3 group-hover/contact:bg-opacity-80 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@vendeur.com</span>
              </div>
              <div className="flex items-center text-primary-300 hover:text-white transition-colors duration-300 group/contact">
                <div className="p-2 bg-primary-800 bg-opacity-50 rounded-lg mr-3 group-hover/contact:bg-opacity-80 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-primary-300 hover:text-white transition-colors duration-300 group/contact">
                <div className="p-2 bg-primary-800 bg-opacity-50 rounded-lg mr-3 group-hover/contact:bg-opacity-80 transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{getSafeTranslation("footer.contact.address", "123 Dashboard St, Data City")}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legal links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 pt-8 border-t border-primary-700">
          {legal.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className="text-center text-sm text-primary-400 hover:text-primary-200 transition-colors duration-300 hover:underline"
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Bottom Copyright */}
        <div className="text-center pt-8 border-t border-primary-700">
          <p className="text-primary-400 mb-2 flex items-center justify-center">
            &copy; {new Date().getFullYear()} Vendeur. {getSafeTranslation("footer.copyright.text", "All rights reserved.")}
          </p>
          <p className="text-primary-500 text-sm flex items-center justify-center">
            {getSafeTranslation("footer.copyright.made_with", "Made with")} 
            <Heart className="w-4 h-4 mx-2 text-red-400 animate-pulse" />
            {getSafeTranslation("footer.copyright.location", "by our amazing team")}
          </p>
        </div>
      </div>
      
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 p-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-2xl transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-xl hover:scale-110 z-50 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label={getSafeTranslation("footer.back_to_top", "Back to top")}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
      
      {/* Custom styles for enhanced effects */}
      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;