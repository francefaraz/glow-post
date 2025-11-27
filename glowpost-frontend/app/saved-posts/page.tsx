"use client"

import { Edit2, Trash2, FileText } from "lucide-react"

const mockPosts = [
  {
    id: 1,
    title: "Summer Sale Announcement",
    content: "Get ready for our biggest summer sale! Up to 50% off on selected items...",
    date: "Nov 20, 2025",
    tone: "Sales",
  },
  {
    id: 2,
    title: "New Product Launch",
    content: "Introducing our latest innovation that will change the way you work...",
    date: "Nov 18, 2025",
    tone: "Professional",
  },
  {
    id: 3,
    title: "Weekly Tips & Tricks",
    content: "Here are 5 quick tips to boost your productivity this week...",
    date: "Nov 15, 2025",
    tone: "Friendly",
  },
  {
    id: 4,
    title: "Behind the Scenes",
    content: "Ever wondered what goes on behind the scenes? Let us take you on a journey...",
    date: "Nov 12, 2025",
    tone: "Friendly",
  },
]

export default function SavedPostsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <FileText className="w-8 h-8 text-[#A855F7]" />
          Saved Posts
        </h1>
        <p className="text-gray-400">Manage your saved content drafts</p>
      </div>

      <div className="space-y-4">
        {mockPosts.map((post) => (
          <div key={post.id} className="neon-card flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <span className="px-2 py-0.5 text-xs rounded-full bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                  {post.tone}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{post.content}</p>
              <p className="text-xs text-gray-500">Saved on {post.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-[#3B82F6]/20 transition-colors group">
                <Edit2 className="w-5 h-5 text-gray-400 group-hover:text-[#3B82F6]" />
              </button>
              <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors group">
                <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
