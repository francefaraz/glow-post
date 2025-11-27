"use client"

import { useState, useEffect } from "react"
import { Clock, CalendarDays, Save, Loader2, Trash2 } from "lucide-react"
import { postsApi, scheduleApi } from "@/lib/api"
import { toast } from "sonner"

interface Post {
  id: number
  content: string
  topic?: string
}

interface Schedule {
  id: number
  post_id: number
  scheduled_time: string
  platform?: string
  post?: Post
}

export default function SchedulerPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [selectedPost, setSelectedPost] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [postsResponse, schedulesResponse] = await Promise.all([
        postsApi.getAll(),
        scheduleApi.getAll(),
      ])

      if (postsResponse.data) setPosts(postsResponse.data)
      if (schedulesResponse.data) setSchedules(schedulesResponse.data)
    } catch (error) {
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!selectedPost || !date || !time) {
      toast.error("Please fill in all fields")
      return
    }

    const scheduledTime = new Date(`${date}T${time}`).toISOString()
    setSaving(true)
    try {
      const response = await scheduleApi.create({
        post_id: parseInt(selectedPost),
        scheduled_time: scheduledTime,
      })
      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success("Schedule created successfully!")
        setSelectedPost("")
        setDate("")
        setTime("")
        fetchData()
      }
    } catch (error) {
      toast.error("Failed to create schedule")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return

    try {
      const response = await scheduleApi.delete(id)
      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success("Schedule deleted successfully")
        fetchData()
      }
    } catch (error) {
      toast.error("Failed to delete schedule")
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#3B82F6]" />
        </div>
      </div>
    )
  }

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
            {posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.topic || `Post #${post.id}`}
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
              Save Schedule
            </>
          )}
        </button>
      </div>

      {/* Upcoming Schedules Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Upcoming Scheduled Posts</h3>
        {schedules.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No scheduled posts yet</p>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule) => {
              const { date, time } = formatDateTime(schedule.scheduled_time)
              const postTitle = schedule.post?.topic || `Post #${schedule.post_id}`
              return (
                <div key={schedule.id} className="neon-card flex items-center justify-between py-3">
                  <div className="flex-1">
                    <p className="font-medium">{postTitle}</p>
                    <p className="text-sm text-gray-400">
                      {date} at {time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#A855F7] neon-glow-purple" />
                    <button
                      onClick={() => handleDelete(schedule.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 transition-colors group"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
