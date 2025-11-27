"use client"

import { useState, useEffect } from "react"
import { Palette, Save, Loader2 } from "lucide-react"
import { brandApi } from "@/lib/api"
import { toast } from "sonner"

export default function BrandSettingsPage() {
  const [defaultTone, setDefaultTone] = useState("Professional")
  const [brandKeywords, setBrandKeywords] = useState("")
  const [brandColor, setBrandColor] = useState("#A855F7")
  const [brandName, setBrandName] = useState("")
  const [brandVoice, setBrandVoice] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBrandSettings()
  }, [])

  const fetchBrandSettings = async () => {
    setLoading(true)
    try {
      const response = await brandApi.get()
      if (response.data) {
        setDefaultTone(response.data.tone || "Professional")
        setBrandKeywords(response.data.keywords || "")
        setBrandColor(response.data.brand_color || "#A855F7")
        setBrandName(response.data.brand_name || "")
        setBrandVoice(response.data.brand_voice || "")
        setTargetAudience(response.data.target_audience || "")
      }
    } catch (error) {
      // Brand settings not found, use defaults
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await brandApi.update({
        tone: defaultTone,
        keywords: brandKeywords,
        brand_color: brandColor,
        brand_name: brandName,
        brand_voice: brandVoice,
        target_audience: targetAudience,
      })
      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success("Brand settings saved successfully!")
      }
    } catch (error) {
      toast.error("Failed to save brand settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#EC4899]" />
        </div>
      </div>
    )
  }

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
          <label className="block text-sm font-medium mb-2 text-gray-300">Brand Name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Your brand name"
            className="neon-input w-full"
          />
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
          <label className="block text-sm font-medium mb-2 text-gray-300">Brand Voice</label>
          <textarea
            value={brandVoice}
            onChange={(e) => setBrandVoice(e.target.value)}
            placeholder="Describe your brand voice (e.g., friendly, professional, witty)"
            rows={2}
            className="neon-input w-full resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Target Audience</label>
          <textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Describe your target audience"
            rows={2}
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

        <button
          onClick={handleSave}
          disabled={saving}
          className="neon-button w-full flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Brand Settings
            </>
          )}
        </button>
      </div>
    </div>
  )
}
