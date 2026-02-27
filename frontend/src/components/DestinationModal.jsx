import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { X, MapPin, Clock, CheckCircle, MessageCircle, Calendar } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

const DestinationModal = ({ destination, isOpen, onClose }) => {
  const handleBookNow = () => {
    if (!destination) return;
    const message = `Hi! I'm interested in booking the *${destination.name}* package (${destination.duration}) starting from ${destination.price}. Please share more details.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  if (!destination) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-64 w-full">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Title & Price Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-3xl font-bold text-white">{destination.name}</h2>
                </div>
                <div className="flex items-center space-x-2 text-gray-200">
                  <Clock className="w-4 h-4" />
                  <span>{destination.duration}</span>
                </div>
              </div>
              <div className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold text-lg">
                {destination.price}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="h-[calc(90vh-16rem)] px-6 pb-6">
          <div className="space-y-6 py-6">
            {/* Description */}
            <div>
              <p className="text-gray-700 text-lg">{destination.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-yellow-400" />
                Package Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                Day-wise Itinerary
              </h3>
              <div className="space-y-4">
                {destination.itinerary.map((day, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-yellow-400 bg-blue-50 rounded-r-lg p-4 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-blue-900 text-white">Day {day.day}</Badge>
                      <h4 className="font-semibold text-blue-900">{day.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{day.activities}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Package Includes</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {destination.includes.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-200">
              <Button
                onClick={handleBookNow}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-semibold"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Now via WhatsApp
              </Button>
              <p className="text-center text-sm text-gray-500 mt-2">
                Get instant response from our travel experts
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationModal;
