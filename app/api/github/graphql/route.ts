export async function POST(req: Request) {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token" }), { status: 400 })
  }
  const body = await req.text()
  const upstream = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
    cache: "no-store",
  })
  const text = await upstream.text()
  const headers = new Headers({ "Content-Type": "application/json" })
  return new Response(text, { status: upstream.status, headers })
}
