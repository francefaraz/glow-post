import { Eye, ShoppingCart, Package } from "lucide-react"

const templatePacks = [
  {
    id: 1,
    title: "Instagram Captions Pack",
    description: "50+ ready-to-use captions for engagement and growth",
    price: "₹99",
    category: "Captions",
  },
  {
    id: 2,
    title: "Carousel Templates Pack",
    description: "20 stunning carousel designs for maximum reach",
    price: "₹149",
    category: "Carousels",
  },
  {
    id: 3,
    title: "Hashtag Bundle",
    description: "500+ curated hashtags organized by niche",
    price: "₹49",
    category: "Hashtags",
  },
  {
    id: 4,
    title: "Reel Script Pack",
    description: "30 viral reel scripts with hooks and CTAs",
    price: "₹199",
    category: "Reels",
  },
  {
    id: 5,
    title: "Branding Kit",
    description: "Complete brand identity templates and guidelines",
    price: "₹299",
    category: "Branding",
  },
]

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Package className="w-8 h-8 text-[#A855F7]" />
          Paid Templates
        </h1>
        <p className="text-gray-400">Premium content packs to accelerate your growth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatePacks.map((pack) => (
          <div key={pack.id} className="neon-card group">
            <div className="mb-4">
              <span className="px-3 py-1 text-xs rounded-full bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                {pack.category}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{pack.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{pack.description}</p>
            <p className="text-2xl font-bold text-[#A855F7] mb-6">{pack.price}</p>
            <div className="flex gap-3">
              <button className="neon-button-outline flex-1 flex items-center justify-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button className="neon-button flex-1 flex items-center justify-center gap-2 text-sm">
                <ShoppingCart className="w-4 h-4" />
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
