import { useEffect, useState } from 'react';
import { Package, Users, Award, Heart, Sparkles, Globe, TrendingUp, Star } from 'lucide-react';

const stats = [
  { icon: Package, value: "100+", label: "Unique Products", color: "from-primary/20 to-primary/5" },
  { icon: Award, value: "50+", label: "Years Heritage", color: "from-secondary/20 to-secondary/5" },
  { icon: Users, value: "1000+", label: "Happy Customers", color: "from-accent/20 to-accent/5" },
  { icon: Heart, value: "100%", label: "Handcrafted", color: "from-primary/20 to-primary/5" },
  { icon: Sparkles, value: "500+", label: "Custom Orders", color: "from-secondary/20 to-secondary/5" },
  { icon: Globe, value: "15+", label: "Countries Served", color: "from-accent/20 to-accent/5" },
  { icon: TrendingUp, value: "95%", label: "Return Rate", color: "from-primary/20 to-primary/5" },
  { icon: Star, value: "4.9/5", label: "Customer Rating", color: "from-secondary/20 to-secondary/5" },
];

export default function InfiniteStatsMarquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8 bg-gradient-to-r from-background via-primary/5 to-background">
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
            <div className={`
              relative w-64 p-6 rounded-2xl 
              bg-gradient-to-br ${stat.color}
              border border-border/50
              hover:border-primary/50
              transition-all duration-500
              hover:scale-105 hover:shadow-xl
              backdrop-blur-sm
            `}>
              {/* Icon */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <stat.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-500" strokeWidth={1.5} />
              </div>
              
              {/* Content */}
              <div className="text-center pt-4">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-primary rounded-br-2xl" />
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
            <div className={`
              relative w-64 p-6 rounded-2xl 
              bg-gradient-to-br ${stat.color}
              border border-border/50
              hover:border-primary/50
              transition-all duration-500
              hover:scale-105 hover:shadow-xl
              backdrop-blur-sm
            `}>
              {/* Icon */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <stat.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-500" strokeWidth={1.5} />
              </div>
              
              {/* Content */}
              <div className="text-center pt-4">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-primary rounded-br-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
