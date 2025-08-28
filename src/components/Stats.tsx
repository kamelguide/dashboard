import React, { useState, useEffect } from "react";
import { Server, Database, TrendingUp, Headphones, ChevronRight, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsDemo = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("stats");
  const [visible, setVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState<number[]>([]);

  const STATS = [
    {
      id: 1,
      value: "99,9%",
      label: t("stats.label1"),
      description: t("stats.desc1"),
      icon: "server",
      color: "blue"
    },
    {
      id: 2,
      value: "2M+",
      label: t("stats.label2"),
      description: t("stats.desc2"),
      icon: "database",
      color: "green"
    },
    {
      id: 3,
      value: "87%",
      label: t("stats.label3"),
      description: t("stats.desc3"),
      icon: "trending-up",
      color: "orange"
    },
    {
      id: 4,
      value: "24/7",
      label: t("stats.label4"),
      description: t("stats.desc4"),
      icon: "headphones",
      color: "purple"
    }
  ];

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => animateStats(), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setAnimatedStats([]);
    const timer = setTimeout(() => animateStats(), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const animateStats = () => {
    const animated: number[] = [];
    STATS.forEach((stat, index) => {
      setTimeout(() => {
        animated.push(stat.id);
        setAnimatedStats([...animated]);
      }, index * 150);
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "server":
        return <Server className="w-6 h-6" />;
      case "database":
        return <Database className="w-6 h-6" />;
      case "trending-up":
        return <TrendingUp className="w-6 h-6" />;
      case "headphones":
        return <Headphones className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-primary-500";
      case "green":
        return "bg-green-500";
      case "orange":
        return "bg-orange-400";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-primary-500";
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-primary-500";
      case "green":
        return "text-green-500";
      case "orange":
        return "text-orange-400";
      case "purple":
        return "text-purple-500";
      default:
        return "text-primary-500";
    }
  };

  return (
    <section className={`py-20 bg-gradient-to-br from-primary-200 via-white to-primary-50 relative overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`} id="features">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-500 opacity-10 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-green-500 opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-orange-400 opacity-10 translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
            <span className="relative inline-block">
              {t("stats.title")}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary-400 rounded-full transform scale-0 transition-transform duration-500" style={{ transform: visible ? 'scaleX(1)' : 'scaleX(0)' }}></span>
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">{t("stats.subtitle")}</p>

          <div className="flex justify-center mt-8 bg-gray-100 p-1 rounded-lg inline-flex shadow-md">
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === "stats" ? "bg-white shadow-md text-primary-600" : "text-gray-600 hover:bg-gray-200"}`}
            >
              {t("stats.tab_stats")}
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === "testimonials" ? "bg-white shadow-md text-primary-600" : "text-gray-600 hover:bg-gray-200"}`}
            >
              {t("stats.tab_testimonials")}
            </button>
          </div>
        </div>

        {activeTab === "stats" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.id} className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${animatedStats.includes(stat.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full ${getBgColor(stat.color)} bg-opacity-20 flex items-center justify-center mb-4`}>
                    <div className={`${getTextColor(stat.color)}`}>{getIcon(stat.icon)}</div>
                  </div>
                  <div className="text-center">
                    <p className={`text-4xl font-bold ${getTextColor(stat.color)}`}>{stat.value}</p>
                    <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-3">{stat.label}</h3>
                    <div className="w-12 h-1 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                      <div className={`h-1 rounded-full ${getBgColor(stat.color)} transform transition-all duration-1000 scale-x-0`} style={{ width: "100%", transform: animatedStats.includes(stat.id) ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}></div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n, index) => {
              const testimonial = t(`stats.testi${n}`, { returnObjects: true });
              return (
                <div key={index} className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${animatedStats.includes(index + 1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Heart key={i} className="w-5 h-5 text-red-400 transition-all duration-300 hover:scale-125" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic flex-grow">{testimonial.quote}</p>
                    <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
                      <div className={`w-12 h-12 rounded-full ${getBgColor(testimonial.color || "blue")} bg-opacity-20 flex items-center justify-center mr-4`}>
                        <span className={`font-bold ${getTextColor(testimonial.color || "blue")}`}>{testimonial.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center">
          <a  href="http://51.178.220.127:8048/"  className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-all duration-300 group font-medium hover:shadow-lg hover:shadow-primary-200 transform hover:-translate-y-1">
            {t("stats.cta")}
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default StatsDemo;
