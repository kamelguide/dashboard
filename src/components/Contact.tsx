import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Globe, Clock, Users } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  // Helper function to safely get translations with fallbacks
  const getSafeTranslation = (key, fallback = '') => {
    try {
      return t(key) || fallback;
    } catch (error) {
      console.warn(`Translation key ${key} failed, using fallback`);
      return fallback;
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [visible, setVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([]);
  
  // Animation au chargement
  useEffect(() => {
    setVisible(true);
    
    // Animation séquentielle pour les statistiques
    const timer = setTimeout(() => {
      // Add any stats animation logic here
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [animateIn, setAnimateIn] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Form validation with translations
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = getSafeTranslation("contact.validation.name_required", "Name is required");
    }
    
    if (!formData.email.trim()) {
      newErrors.email = getSafeTranslation("contact.validation.email_required", "Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = getSafeTranslation("contact.validation.email_invalid", "Email is invalid");
    }
    
    if (!formData.message.trim()) {
      newErrors.message = getSafeTranslation("contact.validation.message_required", "Message is required");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Send email function
  const sendEmailToServer = async (data) => {
    // In a real implementation, this would use fetch or axios to send to your backend
    return new Promise((resolve, reject) => {
      // Simulate API call with timeout
      setTimeout(() => {
        // Simulate 95% success rate for demo purposes
        if (Math.random() > 0.05) {
          resolve({ success: true });
        } else {
          reject(new Error(getSafeTranslation("contact.error.send_failed", "Failed to send email. Please try again.")));
        }
      }, 1500);
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Send the form data to server
      await sendEmailToServer(formData);
      
      // On success
      setSubmitStatus({ 
        type: "success", 
        message: getSafeTranslation("contact.success.message_sent", "Message sent successfully! We'll get back to you soon.")
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      // On failure
      setSubmitStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact information data with translations
  const contactInfo = [
    {
      icon: Mail,
      title: getSafeTranslation("contact.info.email.title", "Email Us"),
      details: [
        "info@yourcompany.com",
        "support@yourcompany.com"
      ],
      color: "from-primary-500 to-primary-600",
      hoverColor: "hover:from-primary-600 hover:to-primary-700"
    },
    {
      icon: Phone,
      title: getSafeTranslation("contact.info.phone.title", "Call Us"),
      details: [
        "+1 (555) 123-4567",
        getSafeTranslation("contact.info.phone.hours", "Mon-Fri, 9am-5pm EST")
      ],
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      icon: MapPin,
      title: getSafeTranslation("contact.info.address.title", "Visit Us"),
      details: [
        getSafeTranslation("contact.info.address.street", "123 Business Avenue"),
        getSafeTranslation("contact.info.address.suite", "Suite 500"),
        getSafeTranslation("contact.info.address.city", "San Francisco, CA 94107")
      ],
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    }
  ];

  // Stats data with translations
  const stats = [
    {
      icon: Users,
      number: "5000+",
      label: getSafeTranslation("contact.stats.clients", "Happy Clients"),
      color: "text-primary-600"
    },
    {
      icon: Globe,
      number: "50+",
      label: getSafeTranslation("contact.stats.countries", "Countries Served"),
      color: "text-green-600"
    },
    {
      icon: Clock,
      number: "24/7",
      label: getSafeTranslation("contact.stats.support", "Support Available"),
      color: "text-purple-600"
    }
  ];

  return (
    <section 
      id="contact" 
      className={`py-20 bg-gradient-to-br from-primary-50 via-white to-orange-50 relative overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 opacity-10 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-primary-400 to-cyan-500 opacity-10 translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-700 delay-300 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-600 bg-clip-text text-transparent">
            {getSafeTranslation("contact.header.title", "Connect With Us")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 leading-relaxed">
            {getSafeTranslation("contact.header.description", "Have questions about our services? Ready to take your business to the next level? Our team is here to help you achieve your goals.")}
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-700 delay-400 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 group"
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`p-4 rounded-full bg-gradient-to-r from-primary-100 to-primary-100 group-hover:from-primary-200 group-hover:to-primary-200 transition-all duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-500 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-500 mr-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {getSafeTranslation("contact.form.title", "Send Us a Message")}
                </h3>
              </div>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-xl flex items-center border ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  )}
                  <p>{submitStatus.message}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      {getSafeTranslation("contact.form.fields.name", "Full Name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300'}`}
                      placeholder={getSafeTranslation("contact.form.placeholders.name", "John Doe")}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.name}</p>}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {getSafeTranslation("contact.form.fields.email", "Email Address")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300'}`}
                      placeholder={getSafeTranslation("contact.form.placeholders.email", "john@example.com")}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      {getSafeTranslation("contact.form.fields.phone", "Phone Number")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-300 transition-all duration-300"
                      placeholder={getSafeTranslation("contact.form.placeholders.phone", "(555) 123-4567")}
                    />
                  </div>
                  
                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      {getSafeTranslation("contact.form.fields.subject", "Subject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-300 transition-all duration-300"
                      placeholder={getSafeTranslation("contact.form.placeholders.subject", "How can we help?")}
                    />
                  </div>
                </div>
                
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {getSafeTranslation("contact.form.fields.message", "Your Message")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 resize-none ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300'}`}
                    placeholder={getSafeTranslation("contact.form.placeholders.message", "Please describe how we can assist you...")}
                  ></textarea>
                  {errors.message && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.message}</p>}
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:shadow-xl transform hover:-translate-y-1'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {getSafeTranslation("contact.form.sending", "Sending...")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {getSafeTranslation("contact.form.send_button", "Send Message")}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Information - Takes 1 column */}
          <div className={`transition-all duration-700 delay-700  transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white rounded-2xl shadow-xl p-8 h-full">
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                {t("contact.info.title", "Contact Information")}
              </h3>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1 transition-all duration-300 group-hover:scale-110">
                        <div className={`bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl border border-white border-opacity-30`}>
                          <info.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-xl mb-3 text-primary-100">{info.title}</h4>
                        <div className="space-y-2">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-primary-100 hover:text-white transition-colors cursor-pointer">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional CTA */}
              <div className="mt-8 pt-8 border-t border-white border-opacity-20">
                <div className="text-center">
                  <h4 className="font-semibold text-primary-100 mb-3">
                    {getSafeTranslation("contact.cta.title", "Ready to Get Started?")}
                  </h4>
                  <p className="text-primary-200 text-sm mb-4">
                    {getSafeTranslation("contact.cta.description", "Let's discuss your project and explore how we can help you achieve your goals.")}
                  </p>
                  <button className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-6 py-3 rounded-xl hover:bg-opacity-30 transition-all duration-300 font-medium">
                    {getSafeTranslation("contact.cta.button", "Schedule a Call")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;