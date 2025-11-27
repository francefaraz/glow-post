"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react"
import { scheduleApi } from "@/lib/api"
import { toast } from "sonner"

interface Schedule {
  id: number
  post_id: number
  scheduled_time: string
  platform?: string
  post?: {
    id: number
    content: string
    topic?: string
  }
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSchedules()
  }, [])

  const fetchSchedules = async () => {
    setLoading(true)
    try {
      const response = await scheduleApi.getAll()
      if (response.error) {
        toast.error(response.error)
      } else if (response.data) {
        setSchedules(response.data)
      }
    } catch (error) {
      toast.error("Failed to fetch schedules")
    } finally {
      setLoading(false)
    }
  }

  const getScheduledDates = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    return schedules
      .filter((schedule) => {
        const scheduleDate = new Date(schedule.scheduled_time)
        return scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month
      })
      .map((schedule) => new Date(schedule.scheduled_time).getDate())
  }

  const getSchedulesForDate = (day: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.scheduled_time)
      return (
        scheduleDate.getFullYear() === year &&
        scheduleDate.getMonth() === month &&
        scheduleDate.getDate() === day
      )
    })
  }

  const scheduledDates = getScheduledDates()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(day)
    setShowModal(true)
  }

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-4" />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isScheduled = scheduledDates.includes(day)
    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`p-4 rounded-lg text-center transition-all relative hover:bg-[#A855F7]/20 ${
          isScheduled ? "bg-[#A855F7]/10" : ""
        }`}
      >
        <span className="text-gray-300">{day}</span>
        {isScheduled && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#A855F7] neon-glow-purple" />
        )}
      </button>,
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#A855F7]" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Calendar</h1>
        <p className="text-gray-400">View and manage your scheduled posts</p>
      </div>

      <div className="neon-card">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-[#A855F7]/20 transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#A855F7]" />
          </button>
          <h2 className="text-xl font-semibold">
            {monthNames[month]} {year}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-[#A855F7]/20 transition-colors">
            <ChevronRight className="w-5 h-5 text-[#A855F7]" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-4 text-center text-sm text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-t border-[#A855F7]/20">{days}</div>
      </div>

      {/* Modal */}
      {showModal && selectedDate !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="neon-card max-w-md w-full relative neon-glow-purple">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-[#A855F7]/20"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {monthNames[month]} {selectedDate}, {year}
            </h3>
            {(() => {
              const daySchedules = getSchedulesForDate(selectedDate)
              if (daySchedules.length === 0) {
                return <p className="text-gray-400">No scheduled posts for this day.</p>
              }
              return (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400 mb-3">
                    {daySchedules.length} scheduled post{daySchedules.length > 1 ? "s" : ""}
                  </p>
                  {daySchedules.map((schedule) => {
                    const scheduleDate = new Date(schedule.scheduled_time)
                    return (
                      <div key={schedule.id} className="border border-[#A855F7]/30 rounded-lg p-3">
                        <p className="font-medium text-sm mb-1">
                          {schedule.post?.topic || `Post #${schedule.post_id}`}
                        </p>
                        <p className="text-xs text-gray-400">
                          {scheduleDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                        {schedule.post?.content && (
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                            {schedule.post.content}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
