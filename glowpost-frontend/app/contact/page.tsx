"use client"

import { useState } from "react"
import { Mail, MessageCircle, Send, Briefcase } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-400">We would love to hear from you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="neon-card">
          <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="neon-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="neon-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                rows={4}
                className="neon-input w-full resize-none"
              />
            </div>
            <button className="neon-button w-full flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="neon-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#A855F7]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium">support@glowpost.app</p>
              </div>
            </div>
          </div>

          <button className="neon-card w-full flex items-center gap-4 hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">Chat with us</p>
              <p className="font-medium">WhatsApp Support</p>
            </div>
          </button>

          <button className="neon-card w-full flex items-center gap-4 hover:border-[#3B82F6]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">For partnerships</p>
              <p className="font-medium">Business Inquiry</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
