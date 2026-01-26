import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductModalProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl p-0 gap-0 border-none bg-background shadow-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
                    {/* Left: Image Section */}
                    <div className="relative h-64 lg:h-auto bg-muted">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                        <div className="absolute bottom-4 left-6 text-white lg:hidden">
                            <span className="text-sm font-medium uppercase tracking-wider opacity-90">
                                {product.category?.name || 'Product'}
                            </span>
                        </div>
                    </div>

                    {/* Right: Details Section */}
                    <div className="flex flex-col bg-card relative h-full">
                        {/* Explicit Close Button - Sticky to stay visible */}
                        <button
                            onClick={() => onOpenChange(false)}
                            className="sticky top-4 right-4 ml-auto z-50 p-2 mb-[-32px] mr-4 rounded-full bg-white/10 hover:bg-white/20 text-foreground/50 hover:text-foreground transition-all duration-300 backdrop-blur-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex-1 p-6 lg:p-10">
                            <div className="space-y-6 max-w-[90%]">
                                <div>
                                    <span className="hidden lg:inline-block text-accent font-medium text-sm uppercase tracking-widest mb-2">
                                        {product.category?.name || 'Product'}
                                    </span>
                                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 pr-8">
                                        {product.name}
                                    </h2>
                                    <p className="text-lg text-muted-foreground font-light leading-relaxed">
                                        {product.shortDescription}
                                    </p>
                                </div>

                                <div className="flex items-baseline gap-3 pb-6 border-b border-border/50">
                                    <span className="font-body text-2xl font-semibold text-gold">
                                        NPR. {product.price.toLocaleString()}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground">Product Overview</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {product.longDescription}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground">Key Features</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {product.features?.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <Check className="w-4 h-4 text-gold mt-1 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 lg:p-10 border-t border-border bg-muted/10 flex flex-col gap-3 shrink-0 mt-auto">
                            <Button size="xl" className="w-full text-lg shadow-lg hover:shadow-xl transition-all" asChild>
                                <Link to="/contact">
                                    Inquire Now
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="secondary" size="xl" className="w-full text-lg shadow-sm hover:bg-secondary/80 hover:text-white transition-all font-medium" asChild>
                                <a href="tel:+977-9851004505">
                                    Call Us: +977-9851004505
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
