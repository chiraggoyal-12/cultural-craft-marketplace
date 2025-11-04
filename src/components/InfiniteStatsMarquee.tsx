import { useEffect, useState } from 'react';
import { Building2, Users, Award, Package, TrendingUp, Globe2, Handshake, Star } from 'lucide-react';

const stats = [
  { icon: Building2, value: "500+", label: "Business Partners" },
  { icon: Award, value: "50+", label: "Years Heritage" },
  { icon: Package, value: "10,000+", label: "B2B Orders Delivered" },
  { icon: TrendingUp, value: "98%", label: "Client Retention" },
  { icon: Globe2, value: "25+", label: "Countries Exported" },
  { icon: Handshake, value: "100+", label: "Corporate Clients" },
  { icon: Users, value: "5000+", label: "Bulk Orders" },
  { icon: Star, value: "Premium", label: "Quality Standards" },
];

export default function InfiniteStatsMarquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-12 bg-transparent">
      {/* Gradient overlays for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling Container */}
      <div 
        className={`flex gap-8 stats-marquee ${mounted ? 'marquee-animate' : ''}`}
      >
        {/* First set of stats */}
        {stats.map((stat, index) => (
          <div
            key={`stat-1-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="relative w-56 p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <stat.icon className="w-6 h-6 text-primary" strokeWidth={2} />
              </div>
              
              {/* Content */}
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {stats.map((stat, index) => (
          <div
            key={`stat-2-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="relative w-56 p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <stat.icon className="w-6 h-6 text-primary" strokeWidth={2} />
              </div>
              
              {/* Content */}
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
