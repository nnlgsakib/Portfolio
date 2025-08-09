"use client"

import { useEffect, useRef } from "react"

export function ParticlesBG() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = Math.max(window.innerHeight, 800))
    const DPR = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = w * DPR
    canvas.height = h * DPR
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    ctx.scale(DPR, DPR)

    const count = Math.floor((w * h) / 24000)
    const nodes: { x: number; y: number; vx: number; vy: number }[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      // glow background
      const grad = ctx.createRadialGradient(w / 2, h * 0.2, 60, w / 2, h * 0.2, Math.max(w, h))
      grad.addColorStop(0, "rgba(59,130,246,0.08)")
      grad.addColorStop(1, "transparent")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // draw lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy
        if (a.x < 0 || a.x > w) a.vx *= -1
        if (a.y < 0 || a.y > h) a.vy *= -1

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 14000) {
            const alpha = 1 - d2 / 14000
            ctx.strokeStyle = `rgba(56,189,248,${alpha * 0.35})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      // draw nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(59,130,246,0.8)"
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2)
        ctx.fill()
      }
      anim = requestAnimationFrame(draw)
    }

    let anim = requestAnimationFrame(draw)
    const onResize = () => {
      w = window.innerWidth
      h = Math.max(window.innerHeight, 800)
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.scale(DPR, DPR)
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 -z-10" aria-hidden />
}
