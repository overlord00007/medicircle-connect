import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types';
import { getAIResponse } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      content: "Hello! I'm your MEDICOVA AI assistant. I can help you with:\n\n• Medicine dosage information\n• Before/after food guidance\n• Allergy safety\n• Drug interactions\n• Side effects\n\nHow can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: getAIResponse(input),
      sender: 'ai',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[600px] flex-col rounded-xl border border-border bg-card shadow-medical-md">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Health Assistant</h3>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
        <div className="ml-auto flex h-2 w-2 rounded-full bg-secondary" />
      </div>

      {/* Messages */}
      <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex animate-fade-in gap-3',
                message.sender === 'user' ? 'flex-row-reverse' : ''
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                  message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                )}
              >
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-secondary-foreground" />
                )}
              </div>
              <div
                className={cn(
                  'max-w-[75%]',
                  message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                )}
              >
                <p className="whitespace-pre-line text-sm">{message.content}</p>
                <p
                  className={cn(
                    'mt-1 text-xs',
                    message.sender === 'user'
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  )}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex animate-fade-in gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Bot className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div className="chat-bubble-ai flex items-center gap-1.5">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleVoice}
            className={cn(
              'shrink-0 transition-all',
              isListening && 'mic-pulse bg-destructive text-destructive-foreground'
            )}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your medicine..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="btn-medical-primary shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
