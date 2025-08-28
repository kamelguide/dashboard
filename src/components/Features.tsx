import React from "react";
import { BarChart2, PieChart, LineChart, TrendingUp, Layers, Zap, Shield, Users } from "lucide-react";
import { FeatureType } from "../types";
import FeatureCard from "./FeatureCard";

const FEATURES: FeatureType[] = [
  {
    id: 1,
    title: "Real-time Analytics",
    description: "Monitor your data with real-time updates and instant notifications for critical changes.",
    icon: TrendingUp
  },
  {
    id: 2,
    title: "Customizable Dashboard",
    description: "Create personalized views with drag-and-drop widgets tailored to your specific needs.",
    icon: Layers
  },
  {
    id: 3,
    title: "Interactive Charts",
    description: "Visualize complex data with interactive, responsive charts that reveal hidden patterns.",
    icon: BarChart2
  },
  {
    id: 4,
    title: "Performance Metrics",
    description: "Track KPIs and performance indicators with comprehensive reporting tools.",
    icon: LineChart
  },
  {
    id: 5,
    title: "Data Security",
    description: "Enterprise-grade security with role-based access control and data encryption.",
    icon: Shield
  },
  {
    id: 6,
    title: "Team Collaboration",
    description: "Share insights and collaborate with team members through integrated tools.",
    icon: Users
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="section bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600">
            Our dashboard combines powerful analytics with an intuitive interface to help you make 
            data-driven decisions with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;