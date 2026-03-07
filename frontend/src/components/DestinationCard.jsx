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


// Alternate
// import React from "react";
// import { Card, CardContent } from "./ui/card";
// import {
//   MapPin,
//   ArrowRight,
//   Clock,
//   CheckCircle,
//   CalendarDays,
// } from "lucide-react";
// import { Button } from "./ui/button";

// const DestinationCard = ({ destination, onViewDetails }) => {
//   return (
//     <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">

//       {/* Image Section */}
//       <div
//         className="relative h-60 overflow-hidden cursor-pointer"
//         onClick={onViewDetails}
//       >
//         <img
//           src={destination.image}
//           alt={destination.name}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//         {/* Price Badge */}
//         <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
//           {destination.price}
//         </div>

//         {/* Title & Duration */}
//         <div className="absolute bottom-4 left-4 right-4 text-white">
//           <div className="flex items-center gap-2 mb-1">
//             <MapPin className="w-4 h-4 text-yellow-400" />
//             <h3 className="text-lg font-bold">{destination.name}</h3>
//           </div>

//           <div className="flex items-center gap-2 text-sm text-gray-200">
//             <Clock className="w-4 h-4" />
//             {destination.duration}
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <CardContent className="p-5 space-y-4">

//         {/* Description */}
//         <p className="text-gray-600 text-sm">
//           {destination.description}
//         </p>

//         {/* Highlights */}
//         <div>
//           <h4 className="font-semibold text-sm mb-2 text-gray-800">
//             Package Highlights
//           </h4>
//           <div className="space-y-1">
//             {destination.highlights?.slice(0, 3).map((item, index) => (
//               <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
//                 <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
//                 <span>{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Itinerary Preview (First 2 Days Visible) */}
//         <div>
//           <h4 className="font-semibold text-sm mb-2 text-gray-800 flex items-center gap-2">
//             <CalendarDays className="w-4 h-4" />
//             Itinerary Preview
//           </h4>

//           <div className="space-y-2">
//             {destination.itinerary?.slice(0, 2).map((dayItem) => (
//               <div
//                 key={dayItem.day}
//                 className="border rounded-lg p-2 text-sm bg-gray-50"
//               >
//                 <p className="font-medium">
//                   Day {dayItem.day}: {dayItem.title}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* View Button */}
//         <Button
//           onClick={onViewDetails}
//           className="w-full bg-blue-900 hover:bg-yellow-400 hover:text-blue-900 text-white transition-all"
//         >
//           View Full Itinerary
//           <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default DestinationCard;