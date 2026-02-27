import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from './ui/card';

const iconMap = {
  'plane': 'Plane',
  'file-check': 'FileCheck',
  'map': 'Map',
  'globe': 'Globe',
  'heart-pulse': 'HeartPulse',
  'hotel': 'Hotel',
  'car': 'Car',
  'stamp': 'Stamp',
  'languages': 'Languages',
  'badge-indian-rupee': 'BadgeIndianRupee',
  'headset': 'Headset',
  'sparkles': 'Sparkles',
  'award': 'Award',
  'network': 'Network',
  'shield-check': 'ShieldCheck'
};

const ServiceCard = ({ service }) => {
  const IconComponent = LucideIcons[iconMap[service.icon]] || LucideIcons.Circle;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-900 hover:-translate-y-1 bg-white">
      <CardContent className="p-6">
        <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 group-hover:bg-blue-900 transition-colors">
          <IconComponent className="w-7 h-7 text-blue-900 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-semibold text-blue-900 mb-3">{service.title}</h3>
        <p className="text-gray-600 leading-relaxed">{service.description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
