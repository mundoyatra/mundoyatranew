import React from 'react';
import { Card, CardContent } from './ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const DestinationCard = ({ destination, onViewDetails }) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white cursor-pointer">
      <div className="relative h-64 overflow-hidden" onClick={onViewDetails}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {destination.price}
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-start space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <h3 className="text-xl font-bold text-white">{destination.name}</h3>
          </div>
          <p className="text-gray-200 text-sm mb-3">{destination.description}</p>
          <Button
            size="sm"
            onClick={onViewDetails}
            className="bg-white hover:bg-yellow-400 text-blue-900 group-hover:bg-yellow-400"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DestinationCard;
