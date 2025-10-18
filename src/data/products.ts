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
  reviewCount: number;
}

export const categories = {
  "culinary-crafts": {
    name: "Culinary Crafts",
    description: "Elevate your dining with handmade elegance",
    subcategories: ["Cake Stands", "Serving Bowls", "Pottery"],
  },
  "divine-artistry": {
    name: "Divine Artistry",
    description: "Spiritual art pieces that inspire",
    subcategories: ["Ganesh Sculptures", "Krishna Art", "Spiritual Figurines"],
  },
  "artisan-home-serenity": {
    name: "Artisan Home & Serenity",
    description: "Transform your space with cultural beauty",
    subcategories: ["Candle Holders", "Soap Dishes", "Urlis", "Oil Diffusers"],
  },
  "crafted-sip-smoke": {
    name: "Crafted Sip & Smoke",
    description: "Artisanal pieces for refined moments",
    subcategories: ["Wine Chillers", "Coasters", "Ashtrays"],
  },
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
    description:
      "Handcrafted from premium Banswara stone, this elegant cake stand brings natural beauty to your dining experience. Each piece showcases unique veining and texture.",
    shortDescription: "Premium Banswara stone cake stand with natural texture",
    artisanStory:
      "Crafted by skilled artisans in Rajasthan using traditional stone carving techniques passed down through generations.",
    careInstructions:
      "Clean with mild soap and water. Avoid harsh chemicals. Dry thoroughly after washing.",
    material: "Banswara Stone",
    region: "Rajasthan, India",
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    reviewCount: 24,
  },
  {
    id: "travertine-cake-stand",
    name: "Travertine Cake Stand",
    price: 3800,
    category: "culinary-crafts",
    subcategory: "Cake Stands",
    image: "/src/assets/products/banswara-cake-stand.jpg",
    images: ["/src/assets/products/banswara-cake-stand.jpg"],
    description:
      "Elegant travertine cake stand with naturally porous texture that adds rustic charm to any table setting.",
    shortDescription: "Natural travertine stone cake stand",
    artisanStory:
      "Each stand is carefully carved from Italian travertine by master craftsmen who specialize in natural stone work.",
    careInstructions:
      "Wipe clean with damp cloth. Seal annually with stone sealer for best results.",
    material: "Travertine Stone",
    region: "Karnataka, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    reviewCount: 12,
  },

  // Divine Artistry
  {
    id: "boat-ganesh",
    name: "Boat Ganesh",
    price: 2800,
    category: "divine-artistry",
    subcategory: "Ganesh Sculptures",
    image: "https://drive.google.com/file/d/1eG_etMyd0sEB5ht28IRYR-3gLxVvm12G/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1eG_etMyd0sEB5ht28IRYR-3gLxVvm12G/view?usp=sharing"],
    description:
      "Beautiful handcrafted Ganesh sculpture depicting the beloved deity in a boat, symbolizing life's journey and divine guidance.",
    shortDescription: "Handcrafted brass Ganesh sculpture in boat design",
    artisanStory:
      "Created by traditional brass artisans from Moradabad, known for their intricate metalwork and spiritual sculptures.",
    careInstructions:
      "Clean with soft cloth and brass cleaner. Avoid water contact to prevent tarnishing.",
    material: "Brass",
    region: "Moradabad, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    reviewCount: 38,
  },
  {
    id: "ganesh-ji-260",
    name: "Ganesh Ji 260",
    price: 5200,
    category: "divine-artistry",
    subcategory: "Ganesh Sculptures",
    image: "https://drive.google.com/file/d/1hu8v6wgff9XOlpvJ9SqKY5ZsF4C8dMVI/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1hu8v6wgff9XOlpvJ9SqKY5ZsF4C8dMVI/view?usp=sharing"],
    description:
      "Exquisite large Ganesh sculpture with intricate detailing, perfect for home temples and meditation spaces.",
    shortDescription:
      "Large brass Ganesh sculpture with detailed craftsmanship",
    artisanStory:
      "Handcrafted by master artisans specializing in religious sculptures, using techniques perfected over centuries.",
    careInstructions:
      "Dust regularly with soft brush. Use brass polish monthly to maintain shine.",
    material: "Brass",
    region: "Rajasthan, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    reviewCount: 19,
  },
  {
    id: "krishna-sculpture",
    name: "Krishna",
    price: 3600,
    category: "divine-artistry",
    subcategory: "Krishna Art",
    image: "https://drive.google.com/file/d/1FGD47sWrMxPye4lcDjB_FbJ-JL1NW7tr/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1FGD47sWrMxPye4lcDjB_FbJ-JL1NW7tr/view?usp=sharing"],
    description:
      "Graceful Krishna sculpture capturing the divine essence of the beloved deity, perfect for spiritual spaces.",
    shortDescription: "Handcrafted Krishna sculpture in traditional style",
    artisanStory:
      "Sculpted by artisans from Mathura, the birthplace of Krishna, who specialize in devotional art.",
    careInstructions: "Handle with care. Clean with dry soft cloth only.",
    material: "Bronze",
    region: "Mathura, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    reviewCount: 15,
  },

  // Artisan Home & Serenity
  {
    id: "banswara-oval-soap-dish",
    name: "Fluted Urli",
    price: 1800,
    category: "artisan-home-serenity",
    subcategory: "Urlis",
    image: "/src/assets/products/fluted-urli.jpg",
    images: ["/src/assets/products/fluted-urli.jpg"],
    description:
      "Decorative fluted urli with elegant ridged design for sophisticated home decor.",
    shortDescription: "Elegant fluted urli bowl",
    artisanStory:
      "Crafted by skilled metalworkers who specialize in decorative fluting techniques.",
    careInstructions:
      "Polish regularly with brass cleaner. Handle with care to maintain fluting.",
    material: "Brass",
    region: "Tamil Nadu, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    reviewCount: 13,
  },
  {
    id: "banswara-round-soap-dish-polished",
    name: "Banswara Round Soap Dish Polished",
    price: 1100,
    category: "artisan-home-serenity",
    subcategory: "Soap Dishes",
    image: "https://drive.google.com/file/d/1PHJW8GRn3bzKcLku7shFnDnZI7LI7xb0/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1PHJW8GRn3bzKcLku7shFnDnZI7LI7xb0/view?usp=sharing"],
    description:
      "Polished round soap dish from Banswara stone with smooth finish and elegant design.",
    shortDescription: "Polished round Banswara soap dish",
    artisanStory:
      "Carefully polished by experienced craftsmen to achieve a smooth, lustrous surface.",
    careInstructions:
      "Clean with mild soap and water. Polish occasionally with stone polish.",
    material: "Banswara Stone",
    region: "Rajasthan, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    reviewCount: 15,
  },
  {
    id: "banswara-trinket-box",
    name: "Banswara Trinket Box",
    price: 1800,
    category: "artisan-home-serenity",
    subcategory: "Storage",
    image: "https://drive.google.com/file/d/140TIZXjBVnnQd4J583DT8GeL081JrTaI/view?usp=sharing",
    images: ["https://drive.google.com/file/d/140TIZXjBVnnQd4J583DT8GeL081JrTaI/view?usp=sharing"],
    description:
      "Beautiful trinket box carved from Banswara stone, perfect for storing jewelry and small treasures.",
    shortDescription: "Banswara stone trinket storage box",
    artisanStory:
      "Intricately carved by master artisans with attention to detail and functionality.",
    careInstructions:
      "Dust regularly with soft cloth. Avoid excessive moisture.",
    material: "Banswara Stone",
    region: "Rajasthan, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    reviewCount: 12,
  },
  {
    id: "rose-quartz-tea-light-big",
    name: "BIG Rose Quartz Tea Light Holder",
    price: 1800,
    category: "artisan-home-serenity",
    subcategory: "Candle Holders",
    image: "https://drive.google.com/file/d/1vptboi5HUhBhO0XPk-z0cLH0FMhv9_EO/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1vptboi5HUhBhO0XPk-z0cLH0FMhv9_EO/view?usp=sharing"],
    description:
      "Large rose quartz tea light holder that emanates loving energy and creates a serene ambiance with soft pink hues.",
    shortDescription: "Large rose quartz crystal tea light holder",
    artisanStory:
      "Carefully carved from Brazilian rose quartz by crystal artisans who understand the healing properties of gemstones.",
    careInstructions:
      "Clean with warm water and mild soap. Charge in moonlight monthly to maintain crystal energy.",
    material: "Rose Quartz Crystal",
    region: "Jaipur, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    reviewCount: 42,
  },
  {
    id: "bottle-shape-oil-diffuser",
    name: "Bottle shape Oil Diffuser",
    price: 2200,
    category: "artisan-home-serenity",
    subcategory: "Oil Diffusers",
    image: "https://drive.google.com/file/d/1ojGLiZMxExAQSfPz_Td5ryhGmWokAlWn/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1ojGLiZMxExAQSfPz_Td5ryhGmWokAlWn/view?usp=sharing"],
    description:
      "Unique bottle-shaped oil diffuser that combines functionality with artistic design for aromatherapy.",
    shortDescription: "Artistic bottle-shaped oil diffuser",
    artisanStory:
      "Designed by contemporary artisans who blend traditional craftsmanship with modern aesthetics.",
    careInstructions: "Clean with warm soapy water. Dry thoroughly before use.",
    material: "Ceramic",
    region: "Gujarat, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    reviewCount: 6,
  },
  {
    id: "candle-stand-big-banswara",
    name: "Candle Stand Big Banswara",
    price: 2500,
    category: "artisan-home-serenity",
    subcategory: "Candle Holders",
    image: "https://drive.google.com/file/d/16Xo2XumYAIzYLvwrDpti6FawejToqM1b/view?usp=sharing",
    images: ["https://drive.google.com/file/d/16Xo2XumYAIzYLvwrDpti6FawejToqM1b/view?usp=sharing"],
    description:
      "Large Banswara stone candle stand with impressive presence for statement lighting.",
    shortDescription: "Large Banswara stone candle stand",
    artisanStory:
      "Carved from a single block of Banswara stone by master craftsmen specializing in decorative pieces.",
    careInstructions:
      "Wipe clean with damp cloth. Remove wax drippings while warm.",
    material: "Banswara Stone",
    region: "Rajasthan, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    reviewCount: 18,
  },
  {
    id: "candle-stand-cone-small",
    name: "Candle Stand Cone Small",
    price: 900,
    category: "artisan-home-serenity",
    subcategory: "Candle Holders",
    image: "https://drive.google.com/file/d/15lx7-vdk_ofMQUP3ceeExEAqRdTgtT2O/view?usp=sharing",
    images: ["https://drive.google.com/file/d/15lx7-vdk_ofMQUP3ceeExEAqRdTgtT2O/view?usp=sharing"],
    description:
      "Small cone-shaped candle stand with minimalist design perfect for intimate lighting.",
    shortDescription: "Small cone-shaped candle holder",
    artisanStory:
      "Crafted with precision by artisans who specialize in geometric forms and clean lines.",
    careInstructions:
      "Clean regularly to prevent wax buildup. Handle with care.",
    material: "Stone",
    region: "Karnataka, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    reviewCount: 22,
  },
  {
    id: "candle-stand-travertine",
    name: "Candle Stand Travertine",
    price: 1600,
    category: "artisan-home-serenity",
    subcategory: "Candle Holders",
    image: "https://drive.google.com/file/d/1c7NmtEJzzaATZF3Qo9z2-fDL7kTNsQHB/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1c7NmtEJzzaATZF3Qo9z2-fDL7kTNsQHB/view?usp=sharing"],
    description:
      "Elegant travertine candle stand with natural porous texture and sophisticated appeal.",
    shortDescription: "Natural travertine candle stand",
    artisanStory:
      "Handcrafted from Italian travertine by artisans skilled in working with natural stone.",
    careInstructions:
      "Clean with mild detergent. Seal annually to maintain appearance.",
    material: "Travertine Stone",
    region: "Karnataka, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    reviewCount: 9,
  },
  {
    id: "desk-clock-marble-stand",
    name: "Desk Clock Marble Stand",
    price: 3200,
    category: "artisan-home-serenity",
    subcategory: "Desk Accessories",
    image: "https://drive.google.com/file/d/1VQenBXoF0hyDWRxFcRSPD7mVKkAuA-eP/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1VQenBXoF0hyDWRxFcRSPD7mVKkAuA-eP/view?usp=sharing"],
    description:
      "Elegant marble desk clock stand combining functionality with luxurious aesthetics for your workspace.",
    shortDescription: "Marble desk clock with stand",
    artisanStory:
      "Crafted by skilled marble artisans who combine traditional stonework with modern timepiece design.",
    careInstructions:
      "Dust regularly. Clean marble with appropriate stone cleaner.",
    material: "Marble",
    region: "Rajasthan, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    reviewCount: 14,
  },
  {
    id: "elephant-oil-diffuser",
    name: "Elephant Oil Diffuser",
    price: 2800,
    category: "artisan-home-serenity",
    subcategory: "Oil Diffusers",
    image: "https://drive.google.com/file/d/1r3_qqzh5dTNETF-YjSS1VNn6r9pCbRQZ/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1r3_qqzh5dTNETF-YjSS1VNn6r9pCbRQZ/view?usp=sharing"],
    description:
      "Charming elephant-shaped oil diffuser that brings good luck and aromatic bliss to your space.",
    shortDescription: "Elephant-shaped aromatherapy diffuser",
    artisanStory:
      "Handcrafted by artisans who specialize in animal-inspired decorative pieces with cultural significance.",
    careInstructions:
      "Clean with soft cloth and mild soap. Ensure proper ventilation during use.",
    material: "Ceramic",
    region: "Rajasthan, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    reviewCount: 11,
  },
  {
    id: "finger-urli",
    name: "Finger Urli",
    price: 1400,
    category: "artisan-home-serenity",
    subcategory: "Urlis",
    image: "https://drive.google.com/file/d/17gXOE-s_qE1gdZTYgObeQ6EX2nsQc17l/view?usp=sharing",
    images: ["https://drive.google.com/file/d/17gXOE-s_qE1gdZTYgObeQ6EX2nsQc17l/view?usp=sharing"],
    description:
      "Traditional finger urli bowl perfect for floating flowers and creating peaceful water displays.",
    shortDescription: "Traditional finger urli bowl",
    artisanStory:
      "Made by traditional metalworkers who preserve ancient urli-making techniques.",
    careInstructions:
      "Clean with soft cloth. Dry thoroughly to prevent water marks.",
    material: "Brass",
    region: "Kerala, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    reviewCount: 26,
  },
  {
    id: "fluted-urli",
    name: "Fluted Urli",
    price: 1800,
    category: "artisan-home-serenity",
    subcategory: "Urlis",
    image: "https://drive.google.com/file/d/1qgGurQ61o4a-7PdqP5S_GhxO9kC0aaDF/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1qgGurQ61o4a-7PdqP5S_GhxO9kC0aaDF/view?usp=sharing"],
    description:
      "Elegant oval-shaped soap dish crafted from premium Banswara stone with natural texture and durability.",
    shortDescription: "Oval Banswara stone soap dish",
    artisanStory:
      "Handcrafted by skilled stone artisans in Rajasthan using traditional carving techniques.",
    careInstructions:
      "Rinse with clean water after use. Dry thoroughly to prevent water stains.",
    material: "Banswara Stone",
    region: "Rajasthan, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    reviewCount: 8,
  },
  {
    id: "jali-soap-dish",
    name: "Jali Soap Dish",
    price: 1300,
    category: "artisan-home-serenity",
    subcategory: "Soap Dishes",
    image: "https://drive.google.com/file/d/1udif671-_mo85_Fn3CSDL-2Ozamzra8v/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1udif671-_mo85_Fn3CSDL-2Ozamzra8v/view?usp=sharing"],
    description:
      "Intricate jali work soap dish with traditional lattice patterns for excellent drainage.",
    shortDescription: "Traditional jali pattern soap dish",
    artisanStory:
      "Created by master craftsmen skilled in the ancient art of jali stone carving.",
    careInstructions:
      "Rinse thoroughly after use. Clean intricate patterns with soft brush.",
    material: "Sandstone",
    region: "Rajasthan, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    reviewCount: 17,
  },
  {
    id: "laltain",
    name: "Laltain",
    price: 2400,
    category: "artisan-home-serenity",
    subcategory: "Lanterns",
    image: "https://drive.google.com/file/d/1-BAQGXQ4mwQ2onJuKrRfyK0yL8MWbQNV/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1-BAQGXQ4mwQ2onJuKrRfyK0yL8MWbQNV/view?usp=sharing"],
    description:
      "Traditional laltain lantern that creates beautiful light patterns and ambiance.",
    shortDescription: "Traditional decorative lantern",
    artisanStory:
      "Handcrafted by traditional metalworkers who preserve the art of lantern making.",
    careInstructions:
      "Clean with dry cloth. Use appropriate candles for safe operation.",
    material: "Metal",
    region: "Rajasthan, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    reviewCount: 20,
  },
  {
    id: "lotus-urli",
    name: "Lotus Urli",
    price: 2200,
    category: "artisan-home-serenity",
    subcategory: "Urlis",
    image: "https://drive.google.com/file/d/19OZqKzNpkKoqaVMoK82DS0OQ1OjzF0jK/view?usp=sharing",
    images: ["https://drive.google.com/file/d/19OZqKzNpkKoqaVMoK82DS0OQ1OjzF0jK/view?usp=sharing"],
    description:
      "Beautiful lotus-shaped urli symbolizing purity and spiritual awakening in your space.",
    shortDescription: "Lotus-shaped decorative urli",
    artisanStory:
      "Inspired by sacred lotus symbolism, crafted by artisans who understand its spiritual significance.",
    careInstructions:
      "Clean gently to preserve lotus detailing. Dry completely after use.",
    material: "Brass",
    region: "Kerala, India",
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    reviewCount: 35,
  },
  {
    id: "onyx-flower-vase-big",
    name: "Onyx Flower Vase Big",
    price: 3500,
    category: "artisan-home-serenity",
    subcategory: "Decorative Pieces",
    image: "https://drive.google.com/file/d/1tcZic3irsAujvBL3Vr_qC6O_MuPF6_C1/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1tcZic3irsAujvBL3Vr_qC6O_MuPF6_C1/view?usp=sharing"],
    description:
      "Large onyx flower vase with translucent beauty and natural stone patterns.",
    shortDescription: "Large onyx flower vase",
    artisanStory:
      "Carved from premium onyx by master stone sculptors who understand the stone's natural beauty.",
    careInstructions:
      "Handle with extreme care. Clean with soft, dry cloth only.",
    material: "Onyx",
    region: "Rajasthan, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    reviewCount: 7,
  },
  {
    id: "rose-quartz-tree",
    name: "Rose Quartz Tree",
    price: 4200,
    category: "artisan-home-serenity",
    subcategory: "Crystal Decor",
    image: "https://drive.google.com/file/d/1Z7Y8ytfnE8LNMtQ9kZhGFV49DM2vr8jE/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1Z7Y8ytfnE8LNMtQ9kZhGFV49DM2vr8jE/view?usp=sharing"],
    description:
      "Stunning rose quartz tree sculpture that brings love energy and natural beauty to any space.",
    shortDescription: "Rose quartz crystal tree sculpture",
    artisanStory:
      "Assembled by crystal artisans who carefully select each rose quartz piece for optimal energy flow.",
    careInstructions:
      "Handle delicate branches carefully. Cleanse in moonlight monthly.",
    material: "Rose Quartz Crystal",
    region: "Jaipur, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    reviewCount: 9,
  },
  {
    id: "rose-quartz-tea-light-small",
    name: "SMALL Rose Quartz Tea Light Holder",
    price: 1200,
    category: "artisan-home-serenity",
    subcategory: "Candle Holders",
    image: "https://drive.google.com/file/d/1kRC8gZbZJks-laQwk40_s9IIcEUSum_V/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1kRC8gZbZJks-laQwk40_s9IIcEUSum_V/view?usp=sharing"],
    description:
      "Compact rose quartz tea light holder perfect for intimate settings and meditation corners.",
    shortDescription: "Small rose quartz crystal tea light holder",
    artisanStory:
      "Hand-selected rose quartz pieces carved into perfect holders by skilled gem cutters in Rajasthan.",
    careInstructions:
      "Gentle cleaning with soft cloth. Avoid harsh chemicals that may damage crystal surface.",
    material: "Rose Quartz Crystal",
    region: "Jaipur, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    reviewCount: 28,
  },
  {
    id: "tree-of-life-7-chakra",
    name: "Tree of Life 7 Chakra",
    price: 3800,
    category: "artisan-home-serenity",
    subcategory: "Crystal Decor",
    image: "https://drive.google.com/file/d/1VOowKPrnc42j21GE3OhmPx8Z5By3lgXT/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1VOowKPrnc42j21GE3OhmPx8Z5By3lgXT/view?usp=sharing"],
    description:
      "Sacred Tree of Life sculpture featuring all seven chakra stones for spiritual balance and harmony.",
    shortDescription: "7-chakra Tree of Life crystal sculpture",
    artisanStory:
      "Meticulously crafted by spiritual artisans who understand chakra energies and sacred geometry.",
    careInstructions:
      "Handle with reverence. Cleanse all stones regularly in natural light.",
    material: "Mixed Chakra Crystals",
    region: "Rishikesh, India",
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    reviewCount: 31,
  },

  // Crafted Sip & Smoke
  {
    id: "rose-quartz-coasters",
    name: "Rose Quartz Coasters",
    price: 2400,
    category: "crafted-sip-smoke",
    subcategory: "Coasters",
    image: "https://drive.google.com/file/d/1YfCscy-wddmukyQgYUEW7M0fngK5Dwd_/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1YfCscy-wddmukyQgYUEW7M0fngK5Dwd_/view?usp=sharing"],
    description:
      "Set of four rose quartz coasters that protect surfaces while adding crystal energy to your beverage experience.",
    shortDescription: "Set of 4 rose quartz crystal coasters",
    artisanStory:
      "Each coaster is cut from natural rose quartz and polished by skilled gem artisans to showcase the stone's beauty.",
    careInstructions:
      "Hand wash with warm water. Dry with soft cloth to prevent water marks on crystal surface.",
    material: "Rose Quartz Crystal",
    region: "Jaipur, India",
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    reviewCount: 22,
  },
  {
    id: "soapstone-ash-tray-round",
    name: "Soapstone Ash Tray Round",
    price: 1600,
    category: "crafted-sip-smoke",
    subcategory: "Ashtrays",
    image: "https://drive.google.com/file/d/16nCN2_3eWfvGdsZ4C2wqQbN_7FcnINkM/view?usp=sharing",
    images: ["https://drive.google.com/file/d/16nCN2_3eWfvGdsZ4C2wqQbN_7FcnINkM/view?usp=sharing"],
    description:
      "Elegant round soapstone ashtray with natural heat resistance and smooth finish.",
    shortDescription: "Round soapstone ashtray",
    artisanStory:
      "Carved from high-quality soapstone by artisans who understand the material's heat-resistant properties.",
    careInstructions:
      "Clean with warm soapy water. Soapstone naturally resists heat and stains.",
    material: "Soapstone",
    region: "Rajasthan, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    reviewCount: 11,
  },
  {
    id: "wine-chiller-banswara",
    name: "Wine Chiller Banswara",
    price: 6500,
    category: "crafted-sip-smoke",
    subcategory: "Wine Chillers",
    image: "/src/assets/products/wine-chiller-banswara.jpg",
    images: ["/src/assets/products/wine-chiller-banswara.jpg"],
    description:
      "Elegant Banswara stone wine chiller that maintains perfect temperature while adding sophisticated style to your table.",
    shortDescription: "Premium Banswara stone wine chiller",
    artisanStory:
      "Handcrafted by stone artisans who specialize in functional art pieces, combining utility with aesthetic appeal.",
    careInstructions:
      "Rinse with clean water after use. Store in dry place. Season with mineral oil occasionally.",
    material: "Banswara Stone",
    region: "Rajasthan, India",
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    reviewCount: 8,
  },
  {
    id: "wine-chiller-black",
    name: "Wine Chiller Black",
    price: 5800,
    category: "crafted-sip-smoke",
    subcategory: "Wine Chillers",
    image: "https://drive.google.com/file/d/1RUdS3IR3028ragM-D3jvoeoKK9cQh8Xw/view?usp=sharing",
    images: ["https://drive.google.com/file/d/1RUdS3IR3028ragM-D3jvoeoKK9cQh8Xw/view?usp=sharing"],
    description:
      "Sleek black stone wine chiller that adds modern elegance to wine service and entertaining.",
    shortDescription: "Modern black stone wine chiller",
    artisanStory:
      "Created by contemporary stone artists who blend traditional techniques with modern aesthetics.",
    careInstructions:
      "Clean with damp cloth and mild detergent. Dry thoroughly to prevent water spots.",
    material: "Black Stone",
    region: "Gujarat, India",
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    reviewCount: 11,
  },
];

// Helper functions
export const getProductsByCategory = (categoryId: string) => {
  return products.filter((product) => product.category === categoryId);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getBestsellerProducts = () => {
  return products.filter((product) => product.bestseller);
};

export const getNewArrivals = () => {
  return products.filter((product) => product.newArrival);
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};
