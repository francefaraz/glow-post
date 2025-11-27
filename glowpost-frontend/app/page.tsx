import Link from "next/link"
import { Sparkles, Calendar, Palette, Crown, Zap } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">GlowPost</span>
        </h1>
        <p className="text-gray-400">Create stunning social media content with AI</p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/create-post" className="neon-card group cursor-pointer">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#A855F7]/20 to-[#EC4899]/20 flex items-center justify-center mb-4 group-hover:neon-glow-purple transition-all">
            <Sparkles className="w-7 h-7 text-[#A855F7]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Post</h3>
          <p className="text-gray-400 text-sm">Generate AI-powered content for your social media</p>
          <button className="neon-button mt-4 w-full">Get Started</button>
        </Link>

        <Link href="/scheduler" className="neon-card group cursor-pointer">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#A855F7]/20 flex items-center justify-center mb-4 group-hover:neon-glow-blue transition-all">
            <Calendar className="w-7 h-7 text-[#3B82F6]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Schedule Post</h3>
          <p className="text-gray-400 text-sm">Plan and schedule your content for optimal engagement</p>
          <button className="neon-button mt-4 w-full">Schedule Now</button>
        </Link>

        <Link href="/brand-settings" className="neon-card group cursor-pointer">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EC4899]/20 to-[#A855F7]/20 flex items-center justify-center mb-4 group-hover:neon-glow-pink transition-all">
            <Palette className="w-7 h-7 text-[#EC4899]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Brand Settings</h3>
          <p className="text-gray-400 text-sm">Customize your brand voice and visual identity</p>
          <button className="neon-button mt-4 w-full">Configure</button>
        </Link>
      </div>

      {/* Paid Templates & Upgrade Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="neon-card border-[#3B82F6]/30 hover:border-[#3B82F6]/60">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-[#3B82F6]" />
            <h3 className="text-xl font-semibold">Paid Templates</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">Access premium content templates designed for maximum engagement</p>
          <div className="flex gap-3">
            <Link href="/templates" className="neon-button-outline flex-1 text-center">
              Browse Templates
            </Link>
          </div>
        </div>

        <div className="neon-card border-[#EC4899]/30 hover:border-[#EC4899]/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A855F7]/20 to-[#EC4899]/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-[#EC4899]" />
              <h3 className="text-xl font-semibold">Upgrade to Pro</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Unlock unlimited posts, advanced scheduling, and premium features
            </p>
            <Link href="/pricing">
              <button className="neon-button w-full neon-glow-purple">Upgrade Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
