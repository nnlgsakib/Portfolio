"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function SiteHeader({ rightSlot }: { rightSlot?: React.ReactNode }) {
  const pathname = usePathname()

  const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => {
    const active = pathname === href
    const classes =
      "rounded-md px-3 py-2 text-sm transition " +
      (active ? "bg-blue-600/15 text-foreground" : "text-foreground/80 hover:bg-blue-600/10 hover:text-foreground")
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-blue-400/40">
            <img
              src={"https://avatars.githubusercontent.com/u/107909889?v=4"}
              alt="NLG Sakib avatar"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <span className="font-semibold tracking-tight">NLG Sakib</span>
          <Badge
            variant="secondary"
            className="ml-2 border-blue-500/20 bg-blue-600/10 text-blue-700 dark:text-blue-300"
          >
            Blockchain
          </Badge>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 sm:flex">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/projects" label="Projects" />
          <NavLink href="/activity" label="Activity" />
          {rightSlot}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Keep theme button on mobile as well */}
          {rightSlot}
          <MobileMenu>
            {(close) => (
              <div className="grid gap-1">
                <NavLink href="/" label="Home" onClick={close} />
                <NavLink href="/about" label="About" onClick={close} />
                <NavLink href="/projects" label="Projects" onClick={close} />
                <NavLink href="/activity" label="Activity" onClick={close} />
              </div>
            )}
          </MobileMenu>
        </div>
      </nav>
    </header>
  )
}

function MobileMenu({ children }: { children: (close: () => void) => React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <SheetClose asChild>
            {/* We need to pass a function to close on click for each link */}
            <CloseOnClick wrapper={(close) => <div>{children(close)}</div>} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Utility component to provide close() function to children
function CloseOnClick({ wrapper }: { wrapper: (close: () => void) => React.ReactNode }) {
  // SheetClose asChild wraps one child, so we provide a button wrapper
  return (
    <div className="grid gap-1">
      {wrapper(() => {
        // This button exists only to trigger SheetClose; it will be clicked programmatically
      })}
    </div>
  )
}
