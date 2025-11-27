"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Menu,
  X,
  LayoutDashboard,
  PenSquare,
  Calendar,
  Clock,
  Bookmark,
  Palette,
  CreditCard,
  FileText,
  Mail,
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Create Post", href: "/create-post", icon: PenSquare },
  { name: "Scheduler", href: "/scheduler", icon: Clock },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Saved Posts", href: "/saved-posts", icon: Bookmark },
  { name: "Brand Settings", href: "/brand-settings", icon: Palette },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
  { name: "Templates", href: "/templates", icon: FileText },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function Navbar() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A10]/95 backdrop-blur-md border-b border-[#A855F7]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
                GlowPost
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors group"
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#A855F7] to-[#EC4899] transform transition-transform duration-300 ${
                      pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Spacer for mobile to balance hamburger */}
            <div className="w-10 md:hidden" />
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 md:hidden ${
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#0A0A10] border-r border-[#A855F7]/30 z-50 transform transition-transform duration-300 ease-out md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#A855F7]/20">
          <Link href="/" className="flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#EC4899] flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
              GlowPost
            </span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#A855F7]/20 to-[#EC4899]/20 text-white border border-[#A855F7]/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#A855F7]" : ""}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
