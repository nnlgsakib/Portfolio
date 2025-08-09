"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, GitFork, ExternalLink } from "lucide-react"
import Link from "next/link"

type PinnedRepo = {
  name: string
  full_name?: string
  description?: string
  stargazers_count?: number
  forks_count?: number
  html_url?: string
  language?: string
  primaryLanguage?: { name: string; color?: string }
  updated_at?: string
  openGraphImageUrl?: string
}

export function PinnedRepos({ username, pinned }: { username: string; pinned: PinnedRepo[] }) {
  const items = useMemo(() => pinned.slice(0, 6), [pinned])

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((repo, idx) => (
        <motion.div
          key={(repo.full_name || repo.name) + idx}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          viewport={{ once: true }}
        >
          <Card className="group relative overflow-hidden border-blue-500/10 bg-gradient-to-b from-blue-600/5 to-transparent transition hover:shadow-lg">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute -inset-x-10 -top-10 h-40 rotate-6 bg-gradient-to-r from-blue-600/20 via-cyan-400/20 to-transparent blur-2xl" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <span className="line-clamp-1">{repo.name}</span>
                <Badge variant="secondary" className="shrink-0">
                  {repo.primaryLanguage?.name || repo.language || "Code"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="min-h-[48px] text-sm text-foreground/80 line-clamp-3">
                {repo.description || "A repository by NLG Sakib."}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-500" />
                    {repo.stargazers_count ?? 0}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" />
                    {repo.forks_count ?? 0}
                  </span>
                </div>
                <span>{repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : ""}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={repo.html_url || `https://github.com/${username}/${repo.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Repo
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <PreviewHint />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function PreviewHint() {
  return (
    <div className="text-xs text-muted-foreground opacity-80 transition group-hover:opacity-100">
      Hover cards reveal more
    </div>
  )
}
