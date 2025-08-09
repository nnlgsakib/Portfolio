"use client"

import { useCallback, useEffect, useState } from "react"

type RateInfo = { limit: number; remaining: number; resetAt?: number }

type Repo = any
type Event = any

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

type GithubData = {
  profile?: any
  repos?: Repo[]
  events?: Event[]
  pinned: PinnedRepo[]
  loading: boolean
  rate?: RateInfo
  error?: string
  refreshAll: () => void
}

export function useGithubData({ username }: { username: string }): GithubData {
  const [profile, setProfile] = useState<any>()
  const [repos, setRepos] = useState<Repo[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [pinned, setPinned] = useState<PinnedRepo[]>([])
  const [rate, setRate] = useState<RateInfo | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(undefined)
    try {
      const [info, p, r, e] = await Promise.all([
        getInfo(),
        cachedGithub(`/api/github/rest/users/${username}`, { ttl: 1000 * 60 * 30 }),
        cachedGithub(`/api/github/rest/users/${username}/repos?per_page=100&sort=updated`, {
          ttl: 1000 * 60 * 10,
        }),
        cachedGithub(`/api/github/rest/users/${username}/events/public?per_page=30`, {
          ttl: 1000 * 60 * 2,
        }),
      ])
      setProfile(p.data)
      setRepos(r.data)
      setEvents(e.data)
      setRate(p.rate || r.rate || e.rate)

      const pinnedFromGraph = await getPinnedRepos(username)
      if (pinnedFromGraph.length) {
        setPinned(pinnedFromGraph)
      } else {
        // fallback: use info.json list merged with live repo data
        const fallbackNames: string[] = info?.pinnedFallback || []
        const map = new Map<string, any>(r.data.map((x: any) => [x.name.toLowerCase(), x]))
        const fromList = fallbackNames.map((name) => {
          const found = map.get(name.toLowerCase())
          if (found) return found
          return {
            name,
            full_name: `${username}/${name}`,
            description: "",
            stargazers_count: 0,
            forks_count: 0,
            html_url: `https://github.com/${username}/${name}`,
            language: "",
            updated_at: "",
          }
        })
        setPinned(fromList)
      }
    } catch (err: any) {
      setError("Failed to fetch GitHub data. You may be rate-limited.")
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  // poll for near-real-time updates with ETag
  useEffect(() => {
    const id = setInterval(fetchAll, 60_000)
    return () => clearInterval(id)
  }, [fetchAll])

  return {
    profile,
    repos,
    events,
    pinned,
    loading,
    rate,
    error,
    refreshAll: fetchAll,
  }
}

async function cachedGithub(url: string, { ttl = 60_000 } = {}) {
  const key = `ghcache:${url}`
  const cached = localStorage.getItem(key)
  const cache = cached ? JSON.parse(cached) : null
  const headers: Record<string, string> = {}
  if (cache?.etag) headers["If-None-Match"] = cache.etag

  let res: Response
  try {
    res = await fetch(url, { headers, cache: "no-store" })
  } catch (e) {
    if (cache?.data) return { data: cache.data, rate: undefined, fromCache: true }
    throw e
  }

  const rate: RateInfo | undefined = parseRate(res)

  if (res.status === 304 && cache?.data) {
    return { data: cache.data, rate, fromCache: true }
  }

  if (!res.ok) {
    if (cache?.data) return { data: cache.data, rate, fromCache: true }
    throw new Error(`GitHub error: ${res.status}`)
  }

  const data = await res.json()
  const etag = res.headers.get("ETag")
  localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), etag, data, ttl }))
  return { data, rate, fromCache: false }
}

function parseRate(res: Response): RateInfo | undefined {
  const limit = res.headers.get("X-RateLimit-Limit")
  const remaining = res.headers.get("X-RateLimit-Remaining")
  const reset = res.headers.get("X-RateLimit-Reset")
  if (!limit || !remaining) return undefined
  return {
    limit: Number(limit),
    remaining: Number(remaining),
    resetAt: reset ? Number(reset) * 1000 : undefined,
  }
}

async function getPinnedRepos(username: string): Promise<PinnedRepo[]> {
  // Use serverless GraphQL proxy; if missing token server-side, it will return 401/400 and we fallback.
  try {
    const res = await fetch("/api/github/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query($login: String!) {
            user(login: $login) {
              pinnedItems(first: 6, types: [REPOSITORY]) {
                nodes {
                  ... on Repository {
                    name
                    nameWithOwner
                    description
                    stargazerCount
                    forkCount
                    url
                    primaryLanguage { name color }
                    openGraphImageUrl
                    updatedAt
                  }
                }
              }
            }
          }
        `,
        variables: { login: username },
      }),
    })
    if (!res.ok) return []
    const json = await res.json()
    const nodes = json?.data?.user?.pinnedItems?.nodes || []
    return nodes.map((n: any) => ({
      name: n.name,
      full_name: n.nameWithOwner,
      description: n.description,
      stargazers_count: n.stargazerCount,
      forks_count: n.forkCount,
      html_url: n.url,
      primaryLanguage: n.primaryLanguage,
      updated_at: n.updatedAt,
      openGraphImageUrl: n.openGraphImageUrl,
    }))
  } catch {
    return []
  }
}

let infoCache: any | null = null
async function getInfo() {
  if (infoCache) return infoCache
  try {
    const res = await fetch("/info.json", { cache: "force-cache" })
    infoCache = await res.json()
    return infoCache
  } catch {
    return {}
  }
}
