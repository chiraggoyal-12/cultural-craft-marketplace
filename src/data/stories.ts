export interface Story {
  id: string;
  title: string;
  excerpt: string;
  artisan: string;
  craft: string;
  region: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  fullContent: {
    sections: {
      heading: string;
      content: string;
    }[];
  };
  relatedProducts: string[];
}

export const stories: Story[] = [
  {
    id: 'marble-artisans-banswara',
    title: "Craft & Legacy: Marble Artisans of Banswara",
    excerpt: "In the small town of Banswara, Rajasthan, where white marble has long been a symbol of purity and strength, the story of artisan Suresh Gehlot begins.",
    artisan: "Suresh Gehlot",
    craft: "Marble Inlay & Carving",
    region: "Banswara, Rajasthan",
    date: "2024-01-20",
    readTime: "8 min read",
    category: "Marble Craft",
    image: "/src/assets/products/banswara-cake-stand.jpg",
    featured: true,
    fullContent: {
      sections: [
        {
          heading: "Origins and Heritage",
          content: "In the small town of Banswara, Rajasthan, where white marble has long been a symbol of purity and strength, the story of artisan Suresh Gehlot begins. Born into a family of marble workers, Suresh grew up surrounded by the sound of chisels striking stone and the fine dust of freshly cut marble. His father and grandfather were both skilled craftsmen, and from an early age, he absorbed not just the techniques of the trade but also the pride and responsibility of carrying forward a family tradition that had lasted for generations."
        },
        {
          heading: "Crafting with Marble",
          content: "By the time Suresh formally entered the craft in 2007, he had already developed the patience and eye for detail needed to transform rough blocks of stone into finely carved works of art. With his team of about 20 workers, Suresh runs a workshop that produces a wide variety of products—from candle stands and urli bowls to soap dishes, trays, and statement décor pieces.\n\nThe process begins with the selection of marble blocks. Suresh knows that the quality of raw stone determines the beauty of the finished product. The blocks are cut, shaped, and carved using a combination of hand tools and modern equipment, but the finishing—the polishing, detailing, and final touches—remains a matter of hand skill."
        },
        {
          heading: "Challenges of the Craft",
          content: "Despite his skill, Suresh faces challenges that threaten the survival of his work. Over the years, marble mining in Banswara has become increasingly difficult. Quarries have gone deeper underground, making extraction costlier. Good-quality blocks are harder to find, and prices for raw stone have risen steeply. Mass-produced machine-made products further undervalue artisan labor."
        },
        {
          heading: "Preserving Tradition",
          content: "What keeps Suresh motivated is his belief in preserving tradition. He trains younger apprentices in his workshop and ensures that his craft continues to inspire future generations. His products have found appreciation in urban India and overseas, where customers value both craftsmanship and the story behind each piece."
        },
        {
          heading: "Impact and Meaning",
          content: "To own a piece crafted by Suresh is to hold not just a product but a part of Rajasthan's cultural heritage. His work represents resilience—the ability to carry forward centuries-old traditions even in the face of modern challenges."
        }
      ]
    },
    relatedProducts: ['banswara-cake-stand', 'wine-chiller-banswara']
  },
  {
    id: 'sikki-craft-bihar',
    title: "Golden Fibres: The Sikki Craft of Bihar",
    excerpt: "From the heartland of Bihar emerges the story of Meera Thakur, a celebrated artisan of sikki grass craft.",
    artisan: "Meera Thakur",
    craft: "Sikki Grass Weaving",
    region: "Madhubani, Bihar",
    date: "2024-01-15",
    readTime: "7 min read",
    category: "Textile Craft",
    image: "/src/assets/lifestyle-living.jpg",
    featured: false,
    fullContent: {
      sections: [
        {
          heading: "A Childhood of Craft",
          content: "From the heartland of Bihar emerges the story of Meera Thakur, a celebrated artisan of sikki grass craft. Meera learned the art as a young girl, taught by her mother in Madhubani. Using simple tools and bundles of golden-hued sikki grass, she discovered how something so fragile could be transformed into objects of elegance and cultural beauty."
        },
        {
          heading: "Transforming Grass into Gold",
          content: "Sikki grass is delicate yet versatile. Meera fashions it into boxes, baskets, ornaments, and household décor, often decorated with traditional motifs. The process involves soaking, softening, and twisting the grass, requiring immense patience. Each piece carries a sense of timelessness—representing both artistic tradition and the natural world of Bihar."
        },
        {
          heading: "Empowering Through Craft",
          content: "What makes Meera's story powerful is her decision to use craft as a tool for empowerment. Through her center, Hastakala Vikas Kendra, she has trained hundreds of women from disadvantaged backgrounds. For many of them, learning sikki craft meant financial independence and dignity in a region where opportunities for women are limited."
        },
        {
          heading: "Recognition and Legacy",
          content: "Her contribution has been nationally recognized—receiving the Seal of Excellence for Handicrafts and the Nari Shakti Puraskar, among other honors. But for Meera, the real reward lies in seeing women artisans become confident creators and entrepreneurs."
        },
        {
          heading: "Carrying Forward Tradition",
          content: "Sikki grass craft, once at risk of fading, now finds new life through her efforts. Meera's story is not only about craft but about community upliftment, resilience, and redefining women's roles in society."
        }
      ]
    },
    relatedProducts: []
  },
  {
    id: 'molela-terracotta',
    title: "Clay, Relief & Color: The Molela Terracotta Tradition",
    excerpt: "In the village of Molela, near Udaipur in Rajasthan, an ancient tradition thrives—Molela terracotta plaques.",
    artisan: "Molela Artisan Collective",
    craft: "Terracotta Relief Work",
    region: "Molela, Rajasthan",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Terracotta Craft",
    image: "/src/assets/lifestyle-spiritual.jpg",
    featured: false,
    fullContent: {
      sections: [
        {
          heading: "An Ancient Craft",
          content: "In the village of Molela, near Udaipur in Rajasthan, an ancient tradition thrives—Molela terracotta plaques. Made by the local Kumhar community of potters, these flat clay reliefs depict gods, goddesses, and scenes from everyday village life. For centuries, families from tribal areas have traveled to Molela to purchase these plaques for their shrines and temples."
        },
        {
          heading: "The Crafting Process",
          content: "The clay used comes from nearby riverbeds. Artisans shape it into slabs, carving out intricate designs with wooden or metal tools. After drying under the sun, the plaques are fired in wood kilns, gaining durability and rustic beauty. Traditionally, natural pigments are used to add color, keeping the process eco-friendly and connected to the earth."
        },
        {
          heading: "Cultural & Spiritual Significance",
          content: "Molela terracotta is not just art—it is a bridge between material craft and spiritual practice. The plaques are integral to festivals, rituals, and worship. Each piece tells a story—of devotion, rural life, or mythological symbolism."
        },
        {
          heading: "Challenges Today",
          content: "Yet, like many crafts, Molela terracotta faces challenges. Machine-made décor competes in markets, younger generations often seek alternative livelihoods, and the labor-intensive process makes it harder to sustain financially."
        },
        {
          heading: "Living Heritage",
          content: "Despite these difficulties, artisans continue to practice the craft, passing it down to their children. With its Geographical Indication (GI) tag, there is hope that Molela terracotta will gain more recognition, ensuring that this centuries-old tradition remains alive for the world to admire."
        }
      ]
    },
    relatedProducts: ['boat-ganesh']
  },
  {
    id: 'manchaha-rug-weavers',
    title: "Weaving Freedom: How Manchaha Empowers Rug Artisans",
    excerpt: "Rug weaving has long been a structured craft—artisans following pre-set patterns, often without creative input. But Jaipur Living's initiative, Manchaha, broke this mold.",
    artisan: "Manchaha Artisan Collective",
    craft: "Hand-woven Textiles",
    region: "Multiple regions, India",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Textile Craft",
    image: "/src/assets/lifestyle-dining.jpg",
    featured: false,
    fullContent: {
      sections: [
        {
          heading: "Breaking from Tradition",
          content: "Rug weaving has long been a structured craft—artisans following pre-set patterns, often without creative input. But Jaipur Living's initiative, Manchaha, broke this mold. Translating to \"from the heart,\" Manchaha allows rural weavers, many of them women, to design their own rugs freely."
        },
        {
          heading: "A New Voice for Weavers",
          content: "For artisans, this is revolutionary. Instead of simply executing someone else's design, they express their own ideas, emotions, and daily life through patterns, colors, and symbols. The rugs become autobiographical—telling stories of their villages, families, struggles, and joys."
        },
        {
          heading: "Empowerment Through Craft",
          content: "The program has given artisans fair wages, recognition, and confidence. Women who were once confined to household work now earn independently and see their creativity valued globally. Their rugs are sold internationally, turning once-anonymous weavers into celebrated designers."
        },
        {
          heading: "Social and Cultural Impact",
          content: "Beyond financial upliftment, Manchaha has fostered pride and dignity. Artisans share their stories through art, and buyers connect not just with a product but with the human spirit behind it. The initiative highlights how craft can be both a livelihood and a language of self-expression."
        },
        {
          heading: "Crafting Futures",
          content: "Manchaha proves that when artisans are given freedom and recognition, craft traditions don't just survive—they flourish. Each rug becomes a woven story, connecting rural India with global homes."
        }
      ]
    },
    relatedProducts: []
  }
];
