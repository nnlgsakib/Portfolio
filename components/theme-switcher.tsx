"use client"

import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme()

  const resolved = useMemo(() => {
    return theme === "system" ? systemTheme : theme
  }, [theme, systemTheme])

  function cycleTheme() {
    // Cycle: system -> dark -> light -> system
    const current = theme || "system"
    let next: "system" | "light" | "dark"
    if (current === "system") next = "dark"
    else if (current === "dark") next = "light"
    else next = "system"
    setTheme(next)
  }

  const label =
    resolved === "dark"
      ? "Switch theme (current: Dark)"
      : resolved === "light"
        ? "Switch theme (current: Light)"
        : "Switch theme (current: System)"

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label={label} title={label} className="relative">
      {/* Light icon */}
      <Sun
        className="h-5 w-5 rotate-0 scale-100 transition-all data-[visible=false]:-rotate-90 data-[visible=false]:scale-0"
        data-visible={resolved === "light"}
      />
      {/* Dark icon */}
      <Moon
        className="absolute h-5 w-5 rotate-90 scale-0 transition-all data-[visible=true]:rotate-0 data-[visible=true]:scale-100"
        data-visible={resolved === "dark"}
      />
      {/* System icon (shown when neither light nor dark is active) */}
      <Laptop
        className="absolute h-5 w-5 rotate-90 scale-0 transition-all data-[visible=true]:rotate-0 data-[visible=true]:scale-100"
        data-visible={resolved !== "light" && resolved !== "dark"}
      />
    </Button>
  )
}
