import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  alt?: string;
}

interface ProductMediaGalleryProps {
  media: MediaItem[];
  productName: string;
}

export const ProductMediaGallery: React.FC<ProductMediaGalleryProps> = ({ 
  media, 
  productName 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentMedia = media[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="space-y-4">
      {/* Main Image/Video Display */}
      <div className="relative group">
        <div 
          className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          {currentMedia?.type === 'video' ? (
            <div className="relative w-full h-full">
              <video 
                src={currentMedia.url}
                className="w-full h-full object-cover"
                controls={false}
                poster={currentMedia.url.replace('.mp4', '.jpg')}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="bg-white/90 rounded-full p-4">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
              </div>
            </div>
          ) : (
            <img
              src={currentMedia?.url}
              alt={currentMedia?.alt || `${productName} - Image ${selectedIndex + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          )}
          
          {/* Zoom Icon Overlay */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="h-4 w-4" />
          </div>
          
          {/* Video Badge */}
          {currentMedia?.type === 'video' && (
            <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
              ▶ Video
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                selectedIndex === index 
                  ? "border-primary shadow-md" 
                  : "border-transparent hover:border-gray-300"
              )}
            >
              {item.type === 'video' ? (
                <div className="relative w-full h-full">
                  <img
                    src={item.url.replace('.mp4', '.jpg')}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-screen-lg w-full h-[90vh] p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Media Content */}
            <div className="relative max-w-full max-h-full">
              {currentMedia?.type === 'video' ? (
                <video
                  src={currentMedia.url}
                  className="max-w-full max-h-full"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={currentMedia?.url}
                  alt={currentMedia?.alt || `${productName} - Image ${selectedIndex + 1}`}
                  className={cn(
                    "max-w-full max-h-full transition-transform cursor-pointer",
                    isZoomed ? "scale-150" : "scale-100"
                  )}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              )}
            </div>

            {/* Navigation in Lightbox */}
            {media.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {media.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};