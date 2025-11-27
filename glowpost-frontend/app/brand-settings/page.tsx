"use client"

import { useState } from "react"
import { Palette, Save } from "lucide-react"

export default function BrandSettingsPage() {
  const [defaultTone, setDefaultTone] = useState("Professional")
  const [brandKeywords, setBrandKeywords] = useState("")
  const [brandColor, setBrandColor] = useState("#A855F7")

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Palette className="w-8 h-8 text-[#EC4899]" />
          Brand Settings
        </h1>
        <p className="text-gray-400">Customize your brand voice and visual identity</p>
      </div>

      <div className="neon-card space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Default Tone</label>
          <select
            value={defaultTone}
            onChange={(e) => setDefaultTone(e.target.value)}
            className="neon-input w-full cursor-pointer"
          >
            <option value="Friendly">Friendly</option>
            <option value="Professional">Professional</option>
            <option value="Funny">Funny</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Brand Keywords</label>
          <textarea
            value={brandKeywords}
            onChange={(e) => setBrandKeywords(e.target.value)}
            placeholder="Enter keywords that define your brand (e.g., innovative, sustainable, premium)"
            rows={3}
            className="neon-input w-full resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Brand Color</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-16 h-12 rounded-lg cursor-pointer border-2 border-[#A855F7]/40 bg-transparent"
            />
            <input
              type="text"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="neon-input flex-1"
            />
            <div className="w-12 h-12 rounded-lg neon-glow-purple" style={{ backgroundColor: brandColor }} />
          </div>
        </div>

        <button className="neon-button w-full flex items-center justify-center gap-2 mt-6">
          <Save className="w-5 h-5" />
          Save Brand Settings
        </button>
      </div>
    </div>
  )
}
