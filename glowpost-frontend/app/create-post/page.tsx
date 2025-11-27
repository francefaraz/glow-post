"use client"

import { useState } from "react"
import { Sparkles, Save, Wand2 } from "lucide-react"

export default function CreatePostPage() {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState("Friendly")
  const [generatedContent, setGeneratedContent] = useState("")

  const handleGenerate = () => {
    setGeneratedContent(
      `Here is your AI-generated post about "${topic || "your topic"}"!\n\n` +
        `This is a placeholder for the generated content. When connected to the backend, ` +
        `this will display real AI-generated content based on your topic, keywords, and selected tone.\n\n` +
        `#${keywords?.split(",")[0]?.trim() || "trending"} #ContentCreator #SocialMedia`,
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-[#A855F7]" />
          Create Post
        </h1>
        <p className="text-gray-400">Generate AI-powered content for your social media</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What's your post about?"
              className="neon-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords, separated by commas"
              className="neon-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="neon-input w-full cursor-pointer">
              <option value="Friendly">Friendly</option>
              <option value="Professional">Professional</option>
              <option value="Funny">Funny</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={handleGenerate} className="neon-button flex items-center gap-2 flex-1">
              <Wand2 className="w-5 h-5" />
              Generate Post
            </button>
            <button className="neon-button-outline flex items-center gap-2">
              <Save className="w-5 h-5" />
              Save Post
            </button>
          </div>
        </div>

        {/* Output Preview */}
        <div className="neon-card min-h-[300px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-[#A855F7]">Preview</h3>
          <div className="flex-1 bg-[#0A0A10] rounded-lg p-4 border border-[#A855F7]/20">
            {generatedContent ? (
              <p className="text-gray-300 whitespace-pre-wrap">{generatedContent}</p>
            ) : (
              <p className="text-gray-500 italic">Your generated content will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
