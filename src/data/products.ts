export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  artisanStory: string;
  careInstructions: string;
  material: string;
  region: string;
  inStock: boolean;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  rating: number;
  reviewCount: number;
}

export const categories = {
  "culinary-crafts": {
    name: "Culinary Crafts",
    description: "Elevate your dining with handmade elegance",
    subcategories: ["Cake Stands", "Serving Bowls", "Pottery"]
  },
  "divine-artistry": {
    name: "Divine Artistry", 
    description: "Spiritual art pieces that inspire",
    subcategories: ["Ganesh Sculptures", "Krishna Art", "Spiritual Figurines"]
  },
  "artisan-home-serenity": {
    name: "Artisan Home & Serenity",
    description: "Transform your space with cultural beauty", 
    subcategories: ["Candle Holders", "Soap Dishes", "Urlis", "Oil Diffusers"]
  },
  "crafted-sip-smoke": {
    name: "Crafted Sip & Smoke",
    description: "Artisanal pieces for refined moments",
    subcategories: ["Wine Chillers", "Coasters", "Ashtrays"]
  }
};

export const products: Product[] = [
  // Culinary Crafts
  {
    id: "banswara-cake-stand",
    name: "Banswara Cake Stand",
    price: 4500,
    category: "culinary-crafts",
    subcategory: "Cake Stands",
    image: "/src/assets/products/banswara-cake-stand.jpg",
    images: ["/src/assets/products/banswara-cake-stand.jpg"],
    description: "Handcrafted from premium Banswara stone, this elegant cake stand brings natural beauty to your dining experience. Each piece showcases unique veining and texture.",
    shortDescription: "Premium Banswara stone cake stand with natural texture",
    artisanStory: "Crafted by skilled artisans in Rajasthan using traditional stone carving techniques passed down through generations.",
    careInstructions: "Clean with mild soap and water. Avoid harsh chemicals. Dry thoroughly after washing.",
    material: "Banswara Stone",
    region: "Rajasthan, India",
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: "travertine-cake-stand", 
    name: "Travertine Cake Stand",
    price: 3800,
    category: "culinary-crafts",
    subcategory: "Cake Stands",
    image: "/src/assets/products/banswara-cake-stand.jpg",
    images: ["/src/assets/products/banswara-cake-stand.jpg"],
    description: "Elegant travertine cake stand with naturally porous texture that adds rustic charm to any table setting.",
    shortDescription: "Natural travertine stone cake stand",
    artisanStory: "Each stand is carefully carved from Italian travertine by master craftsmen who specialize in natural stone work.",
    careInstructions: "Wipe clean with damp cloth. Seal annually with stone sealer for best results.",
    material: "Travertine Stone",
    region: "Karnataka, India", 
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 4.6,
    reviewCount: 12
  },

  // Divine Artistry
  {
    id: "boat-ganesh",
    name: "Boat Ganesh",
    price: 2800,
    category: "divine-artistry", 
    subcategory: "Ganesh Sculptures",
    image: "/src/assets/products/boat-ganesh.jpg",
    images: ["/src/assets/products/boat-ganesh.jpg"],
    description: "Beautiful handcrafted Ganesh sculpture depicting the beloved deity in a boat, symbolizing life's journey and divine guidance.",
    shortDescription: "Handcrafted brass Ganesh sculpture in boat design",
    artisanStory: "Created by traditional brass artisans from Moradabad, known for their intricate metalwork and spiritual sculptures.",
    careInstructions: "Clean with soft cloth and brass cleaner. Avoid water contact to prevent tarnishing.",
    material: "Brass",
    region: "Moradabad, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: "ganesh-ji-260",
    name: "Ganesh Ji 260",
    price: 5200,
    category: "divine-artistry",
    subcategory: "Ganesh Sculptures", 
    image: "/src/assets/products/boat-ganesh.jpg",
    images: ["/src/assets/products/boat-ganesh.jpg"],
    description: "Exquisite large Ganesh sculpture with intricate detailing, perfect for home temples and meditation spaces.",
    shortDescription: "Large brass Ganesh sculpture with detailed craftsmanship",
    artisanStory: "Handcrafted by master artisans specializing in religious sculptures, using techniques perfected over centuries.",
    careInstructions: "Dust regularly with soft brush. Use brass polish monthly to maintain shine.",
    material: "Brass",
    region: "Rajasthan, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: "krishna-sculpture",
    name: "Krishna",
    price: 3600,
    category: "divine-artistry",
    subcategory: "Krishna Art",
    image: "/src/assets/products/boat-ganesh.jpg", 
    images: ["/src/assets/products/boat-ganesh.jpg"],
    description: "Graceful Krishna sculpture capturing the divine essence of the beloved deity, perfect for spiritual spaces.",
    shortDescription: "Handcrafted Krishna sculpture in traditional style",
    artisanStory: "Sculpted by artisans from Mathura, the birthplace of Krishna, who specialize in devotional art.",
    careInstructions: "Handle with care. Clean with dry soft cloth only.",
    material: "Bronze",
    region: "Mathura, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 4.8,
    reviewCount: 15
  },

  // Artisan Home & Serenity
  {
    id: "rose-quartz-tea-light-big",
    name: "BIG Rose Quartz Tea Light Holder",
    price: 1800,
    category: "artisan-home-serenity",
    subcategory: "Candle Holders",
    image: "/src/assets/products/rose-quartz-tea-light.jpg",
    images: ["/src/assets/products/rose-quartz-tea-light.jpg"],
    description: "Large rose quartz tea light holder that emanates loving energy and creates a serene ambiance with soft pink hues.",
    shortDescription: "Large rose quartz crystal tea light holder",
    artisanStory: "Carefully carved from Brazilian rose quartz by crystal artisans who understand the healing properties of gemstones.",
    careInstructions: "Clean with warm water and mild soap. Charge in moonlight monthly to maintain crystal energy.",
    material: "Rose Quartz Crystal",
    region: "Jaipur, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: "rose-quartz-tea-light-small", 
    name: "SMALL Rose Quartz Tea Light Holder",
    price: 1200,
    category: "artisan-home-serenity",
    subcategory: "Candle Holders",
    image: "/src/assets/products/rose-quartz-tea-light.jpg",
    images: ["/src/assets/products/rose-quartz-tea-light.jpg"],
    description: "Compact rose quartz tea light holder perfect for intimate settings and meditation corners.",
    shortDescription: "Small rose quartz crystal tea light holder", 
    artisanStory: "Hand-selected rose quartz pieces carved into perfect holders by skilled gem cutters in Rajasthan.",
    careInstructions: "Gentle cleaning with soft cloth. Avoid harsh chemicals that may damage crystal surface.",
    material: "Rose Quartz Crystal",
    region: "Jaipur, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.7,
    reviewCount: 28
  },

  // Crafted Sip & Smoke
  {
    id: "wine-chiller-banswara",
    name: "Wine Chiller Banswara", 
    price: 6500,
    category: "crafted-sip-smoke",
    subcategory: "Wine Chillers",
    image: "/src/assets/products/wine-chiller-banswara.jpg",
    images: ["/src/assets/products/wine-chiller-banswara.jpg"],
    description: "Elegant Banswara stone wine chiller that maintains perfect temperature while adding sophisticated style to your table.",
    shortDescription: "Premium Banswara stone wine chiller",
    artisanStory: "Handcrafted by stone artisans who specialize in functional art pieces, combining utility with aesthetic appeal.",
    careInstructions: "Rinse with clean water after use. Store in dry place. Season with mineral oil occasionally.",
    material: "Banswara Stone",
    region: "Rajasthan, India", 
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.6,
    reviewCount: 8
  },
  {
    id: "wine-chiller-black",
    name: "Wine Chiller Black",
    price: 5800,
    category: "crafted-sip-smoke", 
    subcategory: "Wine Chillers",
    image: "/src/assets/products/wine-chiller-banswara.jpg",
    images: ["/src/assets/products/wine-chiller-banswara.jpg"],
    description: "Sleek black stone wine chiller that adds modern elegance to wine service and entertaining.",
    shortDescription: "Modern black stone wine chiller",
    artisanStory: "Created by contemporary stone artists who blend traditional techniques with modern aesthetics.",
    careInstructions: "Clean with damp cloth and mild detergent. Dry thoroughly to prevent water spots.",
    material: "Black Stone",
    region: "Gujarat, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    rating: 4.5,
    reviewCount: 11
  },
  {
    id: "rose-quartz-coasters",
    name: "Rose Quartz Coasters",
    price: 2400,
    category: "crafted-sip-smoke",
    subcategory: "Coasters", 
    image: "/src/assets/products/rose-quartz-tea-light.jpg",
    images: ["/src/assets/products/rose-quartz-tea-light.jpg"],
    description: "Set of four rose quartz coasters that protect surfaces while adding crystal energy to your beverage experience.",
    shortDescription: "Set of 4 rose quartz crystal coasters",
    artisanStory: "Each coaster is cut from natural rose quartz and polished by skilled gem artisans to showcase the stone's beauty.",
    careInstructions: "Hand wash with warm water. Dry with soft cloth to prevent water marks on crystal surface.",
    material: "Rose Quartz Crystal",
    region: "Jaipur, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.8,
    reviewCount: 22
  }
];

// Helper functions
export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getBestsellerProducts = () => {
  return products.filter(product => product.bestseller);
};

export const getNewArrivals = () => {
  return products.filter(product => product.newArrival);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};