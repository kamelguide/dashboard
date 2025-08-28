import React, { useEffect, useRef, useState } from "react";
import { Server, Database, TrendingUp, Headphones } from "lucide-react";

// Define the type for our stat objects
interface StatType {
  id: number;
  value: string;
  label: string;
  description: string;
  icon?: string;
  color?: string;
}

interface StatCardProps {
  stat: StatType;
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  
  // Get numeric value for counter animation
  const getNumericValue = () => {
    const value = stat.value;
    if (value.includes("%")) {
      return parseFloat(value.replace("%", ""));
    } else if (value.includes("M+")) {
      return parseFloat(value.replace("M+", ""));
    } else if (value === "24/7") {
      return 24;
    }
    return 0;
  };
  
  const numericValue = getNumericValue();
  
  // For the counter animation
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isVisible && numericValue > 0) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = numericValue / steps;
      let currentCount = 0;
      const timer = duration / steps;
      
      const updateCounter = () => {
        currentCount += increment;
        if (currentCount < numericValue) {
          setCount(currentCount);
          timeout = setTimeout(updateCounter, timer);
        } else {
          setCount(numericValue);
        }
      };
      
      timeout = setTimeout(updateCounter, timer);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible, numericValue]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);
  
  // Get the appropriate icon
  const getIcon = () => {
    switch (stat.icon) {
      case "server":
        return <Server className="w-8 h-8" />;
      case "database":
        return <Database className="w-8 h-8" />;
      case "trending-up":
        return <TrendingUp className="w-8 h-8" />;
      case "headphones":
        return <Headphones className="w-8 h-8" />;
      default:
        return <TrendingUp className="w-8 h-8" />;
    }
  };
  
  // Get background color based on stat color
  const getBgColor = () => {
    switch (stat.color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-blue-500";
    }
  };
  
  // Get text color based on stat color
  const getTextColor = () => {
    switch (stat.color) {
      case "blue":
        return "text-blue-500";
      case "green":
        return "text-green-500";
      case "yellow":
        return "text-yellow-500";
      case "purple":
        return "text-purple-500";
      default:
        return "text-blue-500";
    }
  };
  
  // Format value for display during animation
  const formatDisplayValue = () => {
    if (stat.value.includes("%")) {
      return `${Math.round(count)}%`;
    } else if (stat.value.includes("M+")) {
      return `${count.toFixed(1)}M+`;
    } else if (stat.value === "24/7") {
      return "24/7";
    }
    return count.toString();
  };
  
  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-700 hover:shadow-xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${0.2 * (index + 1)}s` }}
    >
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 rounded-full ${getBgColor()} bg-opacity-20 flex items-center justify-center mb-4`}>
          <div className={getTextColor()}>{getIcon()}</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center">
            <p className={`text-4xl font-bold ${getTextColor()}`}>
              {isVisible ? formatDisplayValue() : "0"}
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-3">{stat.label}</h3>
          
          <div className="w-12 h-1 rounded-full bg-gray-200 mx-auto mb-4">
            <div
              className={`h-1 rounded-full ${getBgColor()} transition-all duration-1000`}
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
          </div>
          
          <p className="text-gray-600 leading-relaxed">{stat.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;