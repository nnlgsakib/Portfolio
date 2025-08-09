"use client"

import type React from "react"

import { useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Shield,
  Code2,
  Sparkles,
  ArrowRight,
  CircleCheck,
  Activity,
  Cat,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import Galaxy from "@/components/galaxy";
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ActivityTimeline } from "@/components/activity-timeline"
import { PinnedRepos } from "@/components/pinned-repos"
import { ContactForm } from "@/components/contact-form"
import { RecentTicker } from "@/components/recent-ticker"
import { useGithubData } from "@/lib/github"
import { SiteHeader } from "@/components/site-header"
import { ColorOverrides } from "@/components/color-overrides"

export default function Page() {
  const username = "nnlgsakib"
  const { profile, events, pinned } = useGithubData({ username })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })

  // Service worker registration for basic app-shell caching
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch(() => {})
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ColorOverrides />
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"
      />
      <div className="absolute inset-0 -z-10">
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <Galaxy mouseRepulsion={true} mouseInteraction={true} density={1.5} glowIntensity={0.5} saturation={0.8} hueShift={240} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(56,189,248,0.25),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(56,189,248,0.12),transparent)]" />
      </div>

      <SiteHeader rightSlot={<ThemeSwitcher />} />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Shield className="h-3.5 w-3.5 text-blue-500" />
              Chief Blockchain Developer @ Web3twenty
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              <span className="bg-gradient-to-b from-blue-500 to-blue-800 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400">
                NLG Sakib
              </span>
              <span className="block text-3xl font-semibold text-foreground/70 md:text-5xl">
                Core Blockchain Engineer
              </span>
            </h1>
            {/* <p className="mt-5 max-w-2xl text-base text-foreground/80 md:text-lg">
              Passionate blockchain enthusiast and professional core blockchain developer building custom chains, L2s,
              dApps, smart contracts, tokens, and NFTs. EVM, Solidity, Golang, and security. Open-source contributor to
              NPM and <span className="whitespace-nowrap font-medium">"mama-lang".</span> Also known as{" "}
              <span className="font-mono font-semibold">@nnlgsakib</span> — the self-proclaimed "Young Buterine".
            </p> */}
            <p className="mt-5 max-w-2xl text-base text-foreground/80 md:text-lg">
  Passionate blockchain enthusiast and professional core blockchain developer specializing in custom chains, L2 solutions,
  dApps, smart contracts, tokens, and NFTs. Expertise in EVM, Solidity, Golang, and security. Active open-source contributor
  in the blockchain ecosystem. Also known as <span className="font-mono font-semibold">@nnlgsakib</span> — the self-proclaimed "Young Buterine".
</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <InfoPill icon={<MapPin className="h-3.5 w-3.5" />} text="Khulna, Bangladesh" />
              <InfoPill
                icon={<Mail className="h-3.5 w-3.5" />}
                text="nlgarts@outlook.com"
                href="mailto:nlgarts@outlook.com"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SocialLink href="https://github.com/nnlgsakib" label="GitHub" icon={<Github className="h-5 w-5" />} />
              <SocialLink
                href="https://www.linkedin.com/in/nlg-sakib"
                label="LinkedIn"
                icon={<Linkedin className="h-5 w-5" />}
              />
              <SocialLink
                href="https://instagram.com/0x_sakib"
                label="Instagram"
                icon={<Instagram className="h-5 w-5" />}
              />
              <SocialLink href="https://x.com/nlg_sakib_" label="X (Twitter)" icon={<Twitter className="h-5 w-5" />} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="group bg-gradient-to-r from-blue-600 to-cyan-500">
                <Link href="/projects">
                  Explore Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">About</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/activity">Activity</Link>
              </Button>
            </div>

            <div className="mt-10 rounded-xl border bg-background/60 p-4 backdrop-blur">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border-blue-500/20 bg-blue-600/15 text-blue-700 dark:text-blue-300">EVM</Badge>
                <Badge variant="secondary">Solidity</Badge>
                <Badge variant="secondary">Golang</Badge>
                <Badge variant="secondary">Security</Badge>
                <Badge variant="secondary">L2s</Badge>
                <Badge variant="secondary">dApps</Badge>
                <Badge variant="secondary">Smart Contracts</Badge>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="relative rounded-3xl border bg-gradient-to-b from-blue-600/15 to-transparent p-2">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={profile?.avatar_url ?? "https://avatars.githubusercontent.com/u/107909889?v=4"}
                  alt="NLG Sakib"
                  className="h-[360px] w-full object-cover"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Stat label="Repos" value={profile?.public_repos ?? 0} />
                <Stat label="Followers" value={profile?.followers ?? 0} />
                <Stat label="Following" value={profile?.following ?? 0} />
              </div>
            </div>
            <div className="mt-3 rounded-xl border bg-background/60 p-3 text-xs text-muted-foreground backdrop-blur">
              <span>Contributor heatmap</span>
              <img
                src={
                  "https://github-contributor-stats.vercel.app/api?username=nnlgsakib&limit=5&theme=dark&combine_all_yearly_contributions=true" ||
                  "/placeholder.svg" ||
                  "/placeholder.svg"
                }
                alt="GitHub Contributor Stats for NLG Sakib"
                className="mt-2 rounded-md border"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Pinned Repos */}
        <div className="mt-16">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Pinned Work</h2>
            <p className="text-sm text-muted-foreground">Live from GitHub (with smart fallback).</p>
          </div>
          <PinnedRepos username={username} pinned={pinned} />
        </div>

        {/* Activities Ticker */}
        <div className="mt-8">
          <RecentTicker events={events ?? []} />
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                About
              </CardTitle>
              <CardDescription>Background, education, and interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <p>
                I&apos;m a core blockchain developer with a focus on custom blockchain design, Layer 2 solutions,
                decentralized applications, and security engineering. I love building the foundations that power the
                future of trustless systems.
              </p>
              <p>
                I contribute to open-source libraries on NPM and maintain an experimental language/tool called{" "}
                <b>mama-lang</b>. My stack spans EVM, Solidity, Golang, cryptography, and secure systems design.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <AboutItem icon={<Code2 className="h-4 w-4" />} title="Professional">
                  Chief Blockchain Developer @ Web3twenty. Specialized in core chain dev, dApps, smart contracts,
                  and security.
                </AboutItem>
                <AboutItem icon={<CircleCheck className="h-4 w-4" />} title="Education">
                  BN School and College (Khulna). Currently at Khulna Government College.
                </AboutItem>
                <AboutItem icon={<Cat className="h-4 w-4" />} title="Interests">
                  Digital artist on OpenSea. Felinophile (cat lover).
                </AboutItem>
                <AboutItem icon={<Activity className="h-4 w-4" />} title="OSS">
                  Active on GitHub & NPM. Encryption libs, mama-lang, and more.
                </AboutItem>
              </div>
              <div className="flex flex-wrap gap-2">
                <SocialChip
                  href="https://github.com/nnlgsakib"
                  icon={<Github className="h-3.5 w-3.5" />}
                  label="GitHub"
                />
                <SocialChip
                  href="https://www.linkedin.com/in/nlg-sakib"
                  icon={<Linkedin className="h-3.5 w-3.5" />}
                  label="LinkedIn"
                />
                <SocialChip
                  href="https://instagram.com/0x_sakib"
                  icon={<Instagram className="h-3.5 w-3.5" />}
                  label="Instagram"
                />
                <SocialChip href="https://x.com/nlg_sakib_" icon={<Twitter className="h-3.5 w-3.5" />} label="X" />
                <SocialChip href="mailto:nlgarts@outlook.com" icon={<Mail className="h-3.5 w-3.5" />} label="Email" />
              </div>
            </CardContent>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-600/10 to-transparent" />
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Live Activity
              </CardTitle>
              <CardDescription>Recent GitHub events</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[420px] overflow-y-auto pr-2">
              <ActivityTimeline events={events ?? []} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto mt-20 max-w-7xl px-4">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="text-sm text-muted-foreground">Reach out directly or use the form.</p>
        </div>
        <ContactForm />
      </section>

      <footer className="relative mt-24 border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NLG Sakib. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/nnlgsakib" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/nlg-sakib" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://x.com/nlg_sakib_" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">X</span>
            </Link>
            <div className="relative h-6 w-6">
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-600/40 blur"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 rounded-full border border-blue-500/30" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function InfoPill({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs backdrop-blur">
      <span className="text-blue-500">{icon}</span>
      {text}
    </span>
  )
  if (href)
    return (
      <a href={href} className="hover:opacity-90">
        {content}
      </a>
    )
  return content
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
      <a href={href} target="_blank" rel="noreferrer">
        {icon}
        {label}
      </a>
    </Button>
  )
}

function SocialChip({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-foreground/80 hover:bg-blue-600/10"
    >
      <span className="text-blue-500">{icon}</span>
      {label}
    </a>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-background/60 p-3 text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function AboutItem({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-background/60 p-3">
      <div className="mb-1 flex items-center gap-2 font-medium">
        <span className="text-blue-500">{icon}</span>
        {title}
      </div>
      <div className="text-sm text-foreground/80">{children}</div>
    </div>
  )
}
