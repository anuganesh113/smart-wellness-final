export interface Product {
    _id: string;
    name: string;
    slug: string;
    category: any; // Populated category object or ID
    shortDescription: string;
    longDescription: string;
    price: number;
    // description: { // Legacy structure mapping
    //     overview: string;
    //     benefits: string[];
    // };
    features: string[];
    keyHighlights?: {
        title: string;
        description: string;
        icon: string;
    }[];
    specifications: {
        key: string;
        value: string;
    }[];
    images: string[];
    isFeatured: boolean;
}
