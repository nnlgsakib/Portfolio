"use client"

import type React from "react"

import { ParticlesBG } from "@/components/particles-bg"
import { SiteHeader } from "@/components/site-header"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ColorOverrides } from "@/components/color-overrides"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Instagram, Twitter, Mail, Sparkles, Code2, CircleCheck, Cat } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ColorOverrides />
      <div className="absolute inset-0 -z-10">
        <ParticlesBG />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(56,189,248,0.25),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(56,189,248,0.12),transparent)]" />
      </div>
      <SiteHeader rightSlot={<ThemeSwitcher />} />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">About</h1>
          <p className="text-sm text-muted-foreground">Background, education, and interests</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                Who I am
              </CardTitle>
              <CardDescription>Core blockchain engineer and open-source builder</CardDescription>
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
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border-blue-500/20 bg-blue-600/15 text-blue-700 dark:text-blue-300">EVM</Badge>
                <Badge variant="secondary">Solidity</Badge>
                <Badge variant="secondary">Golang</Badge>
                <Badge variant="secondary">Security</Badge>
                <Badge variant="secondary">L2s</Badge>
                <Badge variant="secondary">dApps</Badge>
              </div>
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
              </div>
              <div className="flex flex-wrap gap-2">
                <Social href="https://github.com/nnlgsakib" icon={<Github className="h-3.5 w-3.5" />} label="GitHub" />
                <Social
                  href="https://www.linkedin.com/in/nlg-sakib"
                  icon={<Linkedin className="h-3.5 w-3.5" />}
                  label="LinkedIn"
                />
                <Social
                  href="https://instagram.com/0x_sakib"
                  icon={<Instagram className="h-3.5 w-3.5" />}
                  label="Instagram"
                />
                <Social href="https://x.com/nlg_sakib_" icon={<Twitter className="h-3.5 w-3.5" />} label="X" />
                <Social href="mailto:nlgarts@outlook.com" icon={<Mail className="h-3.5 w-3.5" />} label="Email" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
              <CardDescription>Quick facts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground/80">
              <div>- Blockchain security and protocol engineering</div>
              <div>- Open-source: NPM packages, mama-lang (VS Code extension)</div>
              <div>- Loves cats and generative digital art</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
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

function Social({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
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
