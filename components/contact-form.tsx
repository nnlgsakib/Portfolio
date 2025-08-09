"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !email.trim()) {
      toast({ title: "Please fill email and message", variant: "destructive" })
      return
    }
    const subject = `Portfolio Contact from ${name || "Anonymous"}`
    const body = `${message}\n\nFrom: ${name || "Anonymous"} <${email}>`
    window.location.href = `mailto:nlgarts@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body,
    )}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message</CardTitle>
        <CardDescription>Fully client-side via your default mail app.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="How can I help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
