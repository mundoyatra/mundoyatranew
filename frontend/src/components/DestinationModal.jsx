import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from './ui/dialog';
import { Button } from './ui/button';
import { X, MapPin, Clock, CheckCircle, MessageCircle, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

const DestinationModal = ({ destination, isOpen, onClose }) => {
  const [openDay, setOpenDay] = useState(null);

  const handleBookNow = () => {
    if (!destination) return;
    const message = `Hi! I'm interested in booking the *${destination.name}* package (${destination.duration}) starting from ${destination.price}. Please share more details.`;
    const whatsappUrl = `https://wa.me/919354262859?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!destination) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-5xl w-[95vw] h-[95vh] p-0 overflow-hidden rounded-2xl flex flex-col"
      >

        {/* Hero Section */}
        <div className="relative h-44 w-full flex-shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* White Circular Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="absolute bottom-3 left-6 right-6 flex justify-between items-end">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">
                  {destination.name}
                </h2>
              </div>
              <div className="flex items-center space-x-2 text-gray-200 text-xs">
                <Clock className="w-3 h-3" />
                <span>{destination.duration}</span>
              </div>
            </div>

            <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-lg font-bold text-sm shadow">
              {destination.price}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 bg-white">

          {/* Description */}
          <div>
            <p className="text-gray-700 text-base leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-yellow-400" />
              Package Highlights
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {destination.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  <span className="text-gray-700 text-sm">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
              Day-wise Itinerary
            </h3>

            <div className="space-y-3">
              {destination.itinerary.map((day, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenDay(openDay === index ? null : index)
                    }
                    className="w-full flex justify-between items-center p-3 bg-blue-50 hover:bg-blue-100 transition"
                  >
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-900 text-white text-xs px-2 py-1">
                        Day {day.day}
                      </Badge>
                      <span className="font-medium text-blue-900 text-sm">
                        {day.title}
                      </span>
                    </div>
                    <span className="text-blue-900 font-bold">
                      {openDay === index ? '-' : '+'}
                    </span>
                  </button>

                  {openDay === index && (
                    <div className="p-3 bg-white">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {day.activities}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Includes */}
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Package Includes
            </h3>
            <div className="bg-green-50 rounded-lg p-4">
              <ul className="space-y-2">
                {destination.includes.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Sticky Book Button */}
        <div className="border-t bg-white p-3 flex-shrink-0 shadow">
          <Button
            onClick={handleBookNow}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold rounded-lg"
            size="lg"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Book Now via WhatsApp
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default DestinationModal;