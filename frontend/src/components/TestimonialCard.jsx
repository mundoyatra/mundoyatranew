import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
      <CardContent className="p-6">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="w-10 h-10 text-yellow-400" />
        </div>

        {/* Rating */}
        <div className="flex space-x-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-700 leading-relaxed mb-6 italic">
          "{testimonial.text}"
        </p>

        {/* Author Info */}
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-semibold text-blue-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
