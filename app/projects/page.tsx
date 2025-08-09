"use client"

import { ParticlesBG } from "@/components/particles-bg"
import { SiteHeader } from "@/components/site-header"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ProjectsGrid } from "@/components/projects-grid"
import { useGithubData } from "@/lib/github"
import { ColorOverrides } from "@/components/color-overrides"

export default function ProjectsPage() {
  const { repos } = useGithubData({ username: "nnlgsakib" })
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ColorOverrides />
      <div className="absolute inset-0 -z-10">
        <ParticlesBG />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(56,189,248,0.25),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(56,189,248,0.12),transparent)]" />
      </div>
      <SiteHeader rightSlot={<ThemeSwitcher />} />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">All repositories, sortable and filterable.</p>
        </div>
        <ProjectsGrid repos={repos ?? []} />
      </section>
    </main>
  )
}
