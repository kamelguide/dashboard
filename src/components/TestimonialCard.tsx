import React, { useEffect, useRef } from "react";
import { TestimonialType } from "../types";

interface TestimonialCardProps {
  testimonial: TestimonialType;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0");
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

  return (
    <div
      ref={cardRef}
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 opacity-0"
      style={{ animationDelay: `${0.2 * (index + 1)}s` }}
    >
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-white/70 text-sm">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
      <p className="italic text-white/90">"{testimonial.quote}"</p>
    </div>
  );
};

export default TestimonialCard;