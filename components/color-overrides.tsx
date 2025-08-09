"use client"

// Global CSS variable overrides for a premium near-black dark theme
export function ColorOverrides() {
  return (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
      /* Light can remain defaults from shadcn. Tweak only dark for a rich black look. */
      .dark {
        --background: 222 16% 6%;           /* near-black navy */
        --foreground: 210 40% 96%;
        --muted: 220 10% 14%;
        --muted-foreground: 218 12% 70%;
        --popover: 222 16% 8%;             /* slightly elevated popover */
        --popover-foreground: 210 40% 96%;
        --card: 222 14% 8.5%;               /* slightly elevated card */
        --card-foreground: 210 40% 96%;
        --border: 220 12% 18%;
        --input: 220 12% 18%;
        --primary: 217 91% 60%;             /* vivid blue */
        --primary-foreground: 0 0% 100%;
        --secondary: 220 12% 18%;
        --secondary-foreground: 210 40% 96%;
        --accent: 220 12% 18%;
        --accent-foreground: 210 40% 96%;
        --destructive: 0 84% 60%;
        --destructive-foreground: 210 40% 98%;
        --ring: 217 91% 60%;
        --chart-1: 217 91% 60%;             /* chart blues/cyans */
        --chart-2: 199 89% 48%;
        --chart-3: 173 80% 44%;
        --chart-4: 262 83% 70%;
        --chart-5: 30 100% 55%;
      }

      /* Slightly elevate borders and surfaces for depth in dark */
      .dark .border { border-color: hsl(var(--border)) !important; }
      .dark .bg-background\\/60 { background-color: color-mix(in oklab, hsl(var(--background)) 60%, transparent) !important; }
      .dark .bg-background { background-color: hsl(var(--background)) !important; }
    `,
      }}
    />
  )
}
