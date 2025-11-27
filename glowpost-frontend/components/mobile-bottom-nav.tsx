"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, PenSquare, Clock, Calendar, CreditCard } from "lucide-react"

const bottomNavItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Create", href: "/create-post", icon: PenSquare },
  { name: "Schedule", href: "/scheduler", icon: Clock },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A10] border-t border-[#A855F7]/20 md:hidden">
      <div className="flex items-center justify-around h-16">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all group ${
                isActive ? "text-white" : "text-gray-400"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#A855F7]/20 to-[#EC4899]/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "group-hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-all ${
                    isActive ? "text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "group-hover:text-white"
                  }`}
                />
              </div>
              <span className={`text-xs mt-1 ${isActive ? "text-[#A855F7]" : ""}`}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
