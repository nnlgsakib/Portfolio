"use client"

import { useEffect, useRef } from "react"
import { Activity } from "lucide-react"

export function RecentTicker({ events = [] as any[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let idx = 0
    const items = el.querySelectorAll<HTMLElement>("[data-item]")
    const cycle = () => {
      items.forEach((it, i) => {
        it.style.transform = `translateY(${(i - idx) * 120}%)`
        it.style.opacity = i === idx ? "1" : "0.3"
      })
      idx = (idx + 1) % items.length
    }
    const t = setInterval(cycle, 3000)
    cycle()
    return () => clearInterval(t)
  }, [events])

  if (!events.length) return null

  const top = events.slice(0, 6)

  return (
    <div className="relative h-10 overflow-hidden rounded-lg border bg-background/60 px-3 py-2" aria-live="polite">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-500">
        <Activity className="h-5 w-5" />
      </div>
      <div ref={ref} className="ml-8 flex h-full flex-col justify-center">
        {top.map((e, i) => (
          <div key={e.id || i} data-item className="transition-all duration-700 ease-out">
            <span className="text-sm">{toText(e)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function toText(e: any) {
  const type = e.type
  const repo = e.repo?.name ?? "repo"
  if (type === "PushEvent") return `Pushed to ${repo}`
  if (type === "PullRequestEvent") return `Pull request in ${repo}`
  if (type === "WatchEvent") return `Starred ${repo}`
  if (type === "ForkEvent") return `Forked ${repo}`
  return `${type} on ${repo}`
}
