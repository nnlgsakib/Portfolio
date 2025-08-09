import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = (params?.path || []).join("/")
  const reqUrl = req.nextUrl
  const target = new URL(`https://api.github.com/${path}`)
  target.search = reqUrl.search

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  }
  const ifNoneMatch = req.headers.get("If-None-Match")
  if (ifNoneMatch) headers["If-None-Match"] = ifNoneMatch
  const token = process.env.GITHUB_TOKEN
  if (token) headers["Authorization"] = `Bearer ${token}`

  const upstream = await fetch(target, { headers, cache: "no-store" })

  // Pass through select headers
  const h = new Headers()
  const copyHeaders = ["ETag", "X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset", "Content-Type"]
  copyHeaders.forEach((k) => {
    const v = upstream.headers.get(k)
    if (v) h.set(k, v)
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: h,
  })
}
