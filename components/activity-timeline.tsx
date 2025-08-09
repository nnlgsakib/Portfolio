"use client"

import { motion } from "framer-motion"
import { GitCommit, GitPullRequest, Star, GitFork, AlertCircle, Link2 } from "lucide-react"
import Link from "next/link"

type Event = any

export function ActivityTimeline({ events = [] as Event[], detailed = false }) {
  if (!events.length) {
    return <div className="text-sm text-muted-foreground">No recent public activity.</div>
  }

  return (
    <ul className="space-y-4">
      {events.map((e: any, idx: number) => {
        const { title, href, meta, icon } = toDisplay(e)
        return (
          <motion.li
            key={e.id || idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.03 }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-md border bg-background p-1.5 text-blue-500">{icon}</div>
              <div className="flex-1">
                <div className="text-sm">
                  <Link href={href} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                    {title}
                  </Link>
                </div>
                <div className="text-xs text-muted-foreground">{meta}</div>
              </div>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}

function toDisplay(e: any) {
  const type = e.type
  const repo = e.repo?.name
  const created = e.created_at ? new Date(e.created_at).toLocaleString() : ""
  if (type === "PushEvent") {
    const commits = e.payload?.commits?.length || 1
    return {
      title: `Pushed ${commits} commit(s) to ${repo}`,
      href: `https://github.com/${repo}/commits`,
      meta: created,
      icon: <GitCommit className="h-4 w-4" />,
    }
  }
  if (type === "PullRequestEvent") {
    const action = e.payload?.action
    const pr = e.payload?.pull_request?.number
    return {
      title: `PR #${pr} ${action} in ${repo}`,
      href: e.payload?.pull_request?.html_url || `https://github.com/${repo}`,
      meta: created,
      icon: <GitPullRequest className="h-4 w-4" />,
    }
  }
  if (type === "IssuesEvent") {
    const action = e.payload?.action
    const num = e.payload?.issue?.number
    return {
      title: `Issue #${num} ${action} in ${repo}`,
      href: e.payload?.issue?.html_url || `https://github.com/${repo}/issues`,
      meta: created,
      icon: <AlertCircle className="h-4 w-4" />,
    }
  }
  if (type === "ForkEvent") {
    return {
      title: `Forked ${repo}`,
      href: `https://github.com/${repo}`,
      meta: created,
      icon: <GitFork className="h-4 w-4" />,
    }
  }
  if (type === "WatchEvent") {
    return {
      title: `Starred ${repo}`,
      href: `https://github.com/${repo}`,
      meta: created,
      icon: <Star className="h-4 w-4" />,
    }
  }
  return {
    title: `${type} in ${repo}`,
    href: `https://github.com/${repo}`,
    meta: created,
    icon: <Link2 className="h-4 w-4" />,
  }
}
