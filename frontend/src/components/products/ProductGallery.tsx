import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

interface ProductGalleryProps {
    images: string[];
    name: string;
    categoryName?: string;
}

export const ProductGallery = ({ images, name, categoryName }: ProductGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Zoom state
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for buttery smooth movement
    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        mouseX.set(x);
        mouseY.set(y);
    };

    const nextImage = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isLightboxOpen) {
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'Escape') setIsLightboxOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, nextImage, prevImage]);

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            {/* Main Image Container */}
            <div className="relative group">
                <div
                    ref={containerRef}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted/30 shadow-2xl cursor-zoom-in group/main"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    {/* Background Layer (Zoomed) */}
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            backgroundImage: `url(${images[activeIndex]})`,
                            backgroundSize: '250%',
                            backgroundPosition: useTransform(
                                [smoothX, smoothY],
                                ([x, y]) => `${(x as number) * 100}% ${(y as number) * 100}%`
                            )
                        }}
                    />

                    {/* Main Image (Normal) */}
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeIndex}
                            src={images[activeIndex]}
                            alt={`${name} - View ${activeIndex + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovering ? 0 : 1 }}
                            exit={{ opacity: 0 }}
                            onLoad={() => setIsLoaded(true)}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 w-full h-full object-cover z-10"
                        />
                    </AnimatePresence>

                    {/* Badges Overlay */}
                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 pointer-events-none">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal shadow-sm border border-white/20">
                            {categoryName || 'Exclusive'}
                        </span>
                    </div>

                    {/* Magnify Hint */}
                    <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md text-[10px] font-medium uppercase tracking-widest text-gold text-white shadow-lg border border-white/10">
                            <ZoomIn className="w-3 h-3" />
                            Click to Expand
                        </div>
                    </div>

                    {/* Lens Overlay (The "Magnifying Glass") */}
                    <motion.div
                        className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.05) 100%)',
                            left: useTransform(smoothX, (x) => `${x * 100}%`),
                            top: useTransform(smoothY, (y) => `${y * 100}%`),
                            transform: 'translate(-50%, -50%)',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 0 0 9999px rgba(0,0,0,0.1), inset 0 0 15px rgba(255,255,255,0.3)',
                        }}
                    />
                </div>

                {/* Mobile Hint (Visible only on touch devices) */}
                <div className="lg:hidden mt-2 flex justify-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Maximize2 className="w-3 h-3" />
                        Tap to Fullscreen
                    </p>
                </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "relative w-20 lg:w-28 aspect-square shrink-0 overflow-hidden rounded-sm transition-all duration-500 snap-start",
                                activeIndex === index
                                    ? "ring-2 ring-gold ring-offset-2 ring-offset-background opacity-100 scale-105 z-10 shadow-lg"
                                    : "opacity-40 hover:opacity-100 hover:scale-105"
                            )}
                        >
                            <img src={img} alt={`${name} thumb ${index + 1}`} className="w-full h-full object-cover" />
                            {activeIndex === index && (
                                <motion.div
                                    layoutId="activeThumb"
                                    className="absolute inset-0 border-2 border-gold z-20 bg-gold/5"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox / Fullscreen Viewer */}
            <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
                <DialogContent className="max-w-[100vw] h-[100vh] p-0 bg-black/95 border-none gap-0 overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-12">
                        {/* Lightbox Header */}
                        <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                            <div className="text-white">
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-1">{categoryName}</p>
                                <h3 className="font-display text-xl">{name}</h3>
                            </div>
                            <DialogClose className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
                                <X className="w-6 h-6" />
                            </DialogClose>
                        </div>

                        {/* Controls */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-6 z-50 p-4 bg-white/5 hover:bg-white/15 rounded-full transition-all text-white backdrop-blur-md hidden lg:flex"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-6 z-50 p-4 bg-white/5 hover:bg-white/15 rounded-full transition-all text-white backdrop-blur-md hidden lg:flex"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        {/* Main Image in Lightbox */}
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="relative max-w-full max-h-full flex items-center justify-center"
                                >
                                    <img
                                        src={images[activeIndex]}
                                        alt={name}
                                        className="max-w-[95vw] max-h-[80vh] object-contain shadow-[0_0_50px_rgba(212,175,55,0.15)] select-none"
                                        draggable={false}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Lightbox Footer (Thumbnails) */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center gap-4 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex gap-3">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            activeIndex === index ? "bg-gold w-8" : "bg-white/30 hover:bg-white/50"
                                        )}
                                    />
                                ))}
                            </div>
                            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">
                                {activeIndex + 1} / {images.length}
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
