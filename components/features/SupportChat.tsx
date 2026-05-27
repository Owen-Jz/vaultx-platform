'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  time: string
}

function getTime(): string {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const BOT_RESPONSE =
  "Thanks for reaching out! Our team will contact you at your registered email within 24 hours."

const INITIAL_MESSAGES: Message[] = [
  {
    id: 0,
    text: 'Hello! How can we help you today?',
    sender: 'bot',
    time: getTime(),
  },
]

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isBotTyping, setIsBotTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  function handleSend() {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      time: getTime(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsBotTyping(true)

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: BOT_RESPONSE,
        sender: 'bot',
        time: getTime(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsBotTyping(false)
    }, 1000)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open support chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent-gold flex items-center justify-center shadow-glow animate-glow-pulse hover:bg-accent-gold/90 transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-bg-primary" />
        ) : (
          <MessageCircle className="w-6 h-6 text-bg-primary" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-bg-elevated rounded-2xl shadow-elevated border border-border-default flex flex-col overflow-hidden">
          {/* Panel header */}
          <div className="px-4 py-3 bg-accent-gold/10 border-b border-border-default flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-bg-primary" />
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm">VaultX Support</p>
              <p className="text-status-success text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success inline-block" />
                Online
              </p>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-72 min-h-40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-0.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-accent-gold text-bg-primary rounded-tr-sm'
                      : 'bg-bg-card text-text-primary rounded-tl-sm border border-border-default'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-text-muted text-xs">{msg.time}</span>
              </div>
            ))}

            {isBotTyping && (
              <div className="flex items-start">
                <div className="bg-bg-card border border-border-default rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="px-4 py-3 border-t border-border-default flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              className="flex-1 bg-bg-card border border-border-default rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-lg bg-accent-gold flex items-center justify-center hover:bg-accent-gold/90 transition-colors disabled:opacity-40 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-bg-primary" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
