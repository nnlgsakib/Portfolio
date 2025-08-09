"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, GitFork, ExternalLink, Filter } from "lucide-react"
import Link from "next/link"

type Repo = {
  id: number
  name: string
  full_name: string
  description?: string
  stargazers_count: number
  forks_count: number
  html_url: string
  language?: string
  updated_at: string
  topics?: string[]
}

export function ProjectsGrid({ repos = [] as Repo[] }) {
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState<string>("all")
  const [sort, setSort] = useState<string>("stars")

  const languages = useMemo(() => {
    const set = new Set<string>()
    repos.forEach((r) => r.language && set.add(r.language))
    return ["all", ...Array.from(set).sort()]
  }, [repos])

  const filtered = useMemo(() => {
    let list = repos
    if (language !== "all") list = list.filter((r) => r.language === language)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((r) => (r.name + " " + (r.description || "")).toLowerCase().includes(q))
    }
    if (sort === "stars") list = [...list].sort((a, b) => b.stargazers_count - a.stargazers_count)
    if (sort === "updated") list = [...list].sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
    return list
  }, [repos, query, language, sort])

  const featured = useMemo(
    () => [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10),
    [repos],
  )

  return (
    <div className="space-y-6">
      {/* Featured horizontal drag row */}
      <div className="rounded-xl border bg-background/60 p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-medium">Featured</div>
          <div className="text-xs text-muted-foreground">Drag to scroll</div>
        </div>
        <DragRow>
          {featured.map((repo, idx) => (
            <RepoCard key={repo.id} repo={repo} layoutIdx={idx} horizontal />
          ))}
        </DragRow>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search repositories..."
            className="w-72"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="hidden text-sm text-muted-foreground md:block">{filtered.length} results</div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="updated">Last updated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((repo, idx) => (
          <RepoCard key={repo.id} repo={repo} layoutIdx={idx} />
        ))}
      </div>
    </div>
  )
}

function DragRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let isDown = false
    let startX = 0
    let scrollLeft = 0
    const onDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
      el.classList.add("cursor-grabbing")
    }
    const onLeaveUp = () => {
      isDown = false
      el.classList.remove("cursor-grabbing")
    }
    const onMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.2
      el.scrollLeft = scrollLeft - walk
    }
    el.addEventListener("mousedown", onDown)
    el.addEventListener("mouseleave", onLeaveUp)
    el.addEventListener("mouseup", onLeaveUp)
    el.addEventListener("mousemove", onMove)
    return () => {
      el.removeEventListener("mousedown", onDown)
      el.removeEventListener("mouseleave", onLeaveUp)
      el.removeEventListener("mouseup", onLeaveUp)
      el.removeEventListener("mousemove", onMove)
    }
  }, [])
  return (
    <div ref={ref} className="flex gap-3 overflow-x-auto pb-2 pt-1 cursor-grab">
      {children}
    </div>
  )
}

function RepoCard({ repo, layoutIdx, horizontal = false }: { repo: Repo; layoutIdx: number; horizontal?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: layoutIdx * 0.02 }}
      viewport={{ once: true }}
      className={horizontal ? "min-w-[340px]" : ""}
    >
      <Card className="group h-full overflow-hidden border-blue-500/10 bg-gradient-to-b from-blue-600/5 to-transparent transition hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="line-clamp-1">{repo.name}</span>
            <Badge variant="secondary" className="shrink-0">
              {repo.language || "Code"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="min-h-[48px] text-sm text-foreground/80 line-clamp-3">
            {repo.description || "A repository by NLG Sakib."}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-yellow-500" />
                {repo.stargazers_count}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" />
                {repo.forks_count}
              </span>
            </div>
            <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
          <div className="mt-4">
            <Button asChild size="sm" variant="outline">
              <Link href={repo.html_url} target="_blank" rel="noreferrer">
                Open
                <ExternalLink className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
