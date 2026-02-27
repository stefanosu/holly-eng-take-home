'use client'
import { useState } from "react"
import { chat } from "../actions/chat"


interface Message {
    role: 'user' | 'assistant'
    content: string
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')

    const handleSubmit = async () => {
        if(!input.trim()) return 

        const userMessage: Message = {role: 'user', content: input} 
        setMessages(prev => [...prev, userMessage])
        setInput('')

        const response = await chat(input)
        const aiMessage: Message = { role: 'assistant', content: response}
        setMessages(prev => [...prev, aiMessage])
    }

    return (
        <div className="flex flex-col h-screen p-4">
          <div className="flex-1 overflow-y-auto flex flex-col gap-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.role === 'user' ? 'self-end bg-blue-500 text-white p-2 rounded' : 'self-start bg-gray-200 p-2 rounded'}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border p-2 rounded"
              placeholder="Ask about a job..."
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 rounded">
              Send
            </button>
          </div>
        </div>
      )
    }
