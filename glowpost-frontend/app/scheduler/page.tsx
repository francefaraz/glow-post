"use client"

import { useState } from "react"
import { Clock, CalendarDays, Save } from "lucide-react"

const mockPosts = [
  { id: 1, title: "Summer Sale Announcement" },
  { id: 2, title: "New Product Launch" },
  { id: 3, title: "Weekly Tips & Tricks" },
  { id: 4, title: "Behind the Scenes" },
]

export default function SchedulerPage() {
  const [selectedPost, setSelectedPost] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Clock className="w-8 h-8 text-[#3B82F6]" />
          Scheduler
        </h1>
        <p className="text-gray-400">Schedule your posts for optimal engagement</p>
      </div>

      <div className="neon-card space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Select Post</label>
          <select
            value={selectedPost}
            onChange={(e) => setSelectedPost(e.target.value)}
            className="neon-input w-full cursor-pointer"
          >
            <option value="">Choose a saved post...</option>
            {mockPosts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#A855F7]" />
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="neon-input w-full cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A855F7]" />
              Select Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="neon-input w-full cursor-pointer"
            />
          </div>
        </div>

        <button className="neon-button w-full flex items-center justify-center gap-2 mt-6">
          <Save className="w-5 h-5" />
          Save Schedule
        </button>
      </div>

      {/* Upcoming Schedules Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Upcoming Scheduled Posts</h3>
        <div className="space-y-3">
          {[
            { title: "Summer Sale Announcement", date: "Nov 28, 2025", time: "10:00 AM" },
            { title: "New Product Launch", date: "Nov 30, 2025", time: "2:00 PM" },
          ].map((item, index) => (
            <div key={index} className="neon-card flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-400">
                  {item.date} at {item.time}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#A855F7] neon-glow-purple" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
