"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const scheduledDates = [3, 8, 12, 15, 22, 28]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

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
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="neon-card max-w-md w-full relative neon-glow-purple">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-[#A855F7]/20"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <h3 className="text-xl font-semibold mb-2">
              {monthNames[month]} {selectedDate}, {year}
            </h3>
            <p className="text-gray-400">
              {scheduledDates.includes(selectedDate!)
                ? "You have scheduled posts for this day."
                : "No scheduled posts for this day."}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Scheduled posts will appear here when connected to the backend.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
