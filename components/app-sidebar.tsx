"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Sparkles, BookOpenText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/practice", label: "Practice", icon: Sparkles },
  ]

  return (
    <aside className="w-64 flex-col border-r bg-card p-4">
      <div className="mb-8 flex items-center gap-2">
        <BookOpenText className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">LexiFlow</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "justify-start gap-3 px-3 text-lg",
              pathname === item.href &&
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  )
}
