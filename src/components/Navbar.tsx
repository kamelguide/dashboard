import React, { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../src/assets/images/logoIcon.png";
import logo2 from "../../src/assets/images/ICON.svg";
import ar from "../../src/assets/images/ar.png";
import  fr from "../../src/assets/images/fr.png";
import  en from "../../src/assets/images/english.png";
import { img } from "framer-motion/client";




const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setIsLangDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const languages = [
    { img:en, code: 'en', name: 'English', flag: '🇺🇸' },
    {img:fr, code: 'fr', name: 'Français', flag: '🇫🇷' },
    { img:ar,code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  const navItems = [
    { id: "home", label: t("home") },
    { id: "features", label: t("features") },
    { id: "gallery", label: t("gallery") },
    { id: "contact", label: t("contact1") },
  ];

  return (
    <header
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-br from-primary-100 via-primary-50 to-primary-50 shadow-md py-2"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center w-96 h-20 backdrop-blur-sm rounded-lg">
          <a href="#home">
            {isScrolled ? (
              <img src={logo2} className="w-full h-full" alt="Logo" />
            ) : (
              <img src={logo} className="w-full h-full" alt="Logo" />
            )}
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link transition-colors duration-200 px-3 py-2 rounded-md ${
                isScrolled 
                  ? "text-primary-600 hover:text-primary-800 hover:bg-primary-50" 
                  : "text-white hover:text-primary-300 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}

          <a href="http://51.178.220.127:8048/" className="ml-4 btn btn-primary">
            {t("login")}
          </a>

          {/* Enhanced Language Selector */}
          <div className="relative ml-4 language-dropdown">
            <button
              onClick={toggleLangDropdown}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                isScrolled
                  ? "bg-white border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              <img src={currentLanguage.img} className="w-8 h-8 rounded-full" alt="" />
              <span className="text-sm font-medium">{currentLanguage.flag}</span>
              <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${
                  isLangDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Language Dropdown */}
            {isLangDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-48 overflow-hidden z-10">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => changeLanguage(language.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                      currentLang === language.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                    }`}
                  >
                    <img src={language.img} className="w-8 h-8 rounded-full" alt="" />

                    <span className="text-lg">{language.flag}</span>
                    <span className="flex-1">{language.name}</span>
                    {currentLang === language.code && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`flex items-center md:hidden transition-colors duration-200 ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-down">
          <div className="container py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="py-2 text-left text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <a href="http://51.178.220.127:8048/" className="btn btn-primary w-full text-center">
                {t("request_demo")}
              </a>
              
              {/* Mobile Language Selector */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-2 mb-2 text-gray-600">
                  <img src={currentLanguage.img} className="w-8 h-8 rounded-full" alt="" />
                  <span className="text-sm font-medium">{currentLanguage.flag}</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                        currentLang === language.code 
                          ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                          : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <img src={language.img} className="w-8 h-8 rounded-full" alt="" />

                      <span className="text-lg">{language.flag}</span>
                      <span className="flex-1">{language.name}</span>
                      {currentLang === language.code && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;