import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, Image as ImageIcon, Bot, User, Phone, Video, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  type: 'text' | 'options';
  options?: string[];
  timestamp: Date;
}

const PatientDashboard = () => {
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [isReporting, setIsReporting] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Namaste ${user?.name || 'Patient'}! How can I help you today?`,
      type: 'options',
      options: ['Report Side Effect', 'Book Consultation', 'Emergency Alert', 'Check Application Status'],
      timestamp: new Date()
    }
  ]);

  const addMessage = (text: string, sender: 'user' | 'bot', type: 'text' | 'options' = 'text', options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      type,
      options,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    addMessage(input, 'user');
    const userText = input;
    setInput('');

    if (isReporting) {
      setIsReporting(false);
      try {
        // Basic AI Mock Logic happens on Backend now
        await api.post('/cases/', {
          user_id: user?.id, // Assuming user context has ID
          medicine_name: "Unknown", // In a real flow, we'd ask for medicine name first
          symptoms: userText,
          source: "web"
        });
        toast.success("Report Submitted to Doctor");
        setTimeout(() => {
          addMessage("✅ I have logged your report. A doctor has been notified.", 'bot');
        }, 800);
      } catch (error) {
        console.error(error);
        toast.error("Failed to submit report");
        addMessage("❌ Sorry, I couldn't save your report. Please try again.", 'bot');
      }
    } else {
      // Simulate Bot Response (General Chat)
      setTimeout(() => {
        addMessage("I've received your message. A doctor will review it shortly.", 'bot');
      }, 1000);
    }
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');

    // Bot Logic
    setTimeout(() => {
      if (option === 'Report Side Effect') {
        setIsReporting(true);
        addMessage("Please describe the side effect you are experiencing. You can type it or send an audio message.", 'bot');
      } else if (option === 'Emergency Alert') {
        addMessage("🚨 Alert sent to nearby hospitals and your registered contacts. Help is on the way!", 'bot');
      } else {
        addMessage(`Okay, proceeding with "${option}"`, 'bot');
      }
    }, 800);
  };

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-4rem)] max-h-[800px] bg-background justify-center p-4">
      {/* Phone Frame Container */}
      <div className="w-full max-w-md bg-white border border-border shadow-xl rounded-2xl overflow-hidden flex flex-col h-full">

        {/* Header - WhatsApp Style */}
        <div className="bg-[#008069] text-white p-3 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-base leading-tight">Medicova Assistant</h2>
              <p className="text-xs text-white/80">Online</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Video className="h-5 w-5 opacity-80" />
            <Phone className="h-5 w-5 opacity-80" />
            <MoreVertical className="h-5 w-5 opacity-80" />
          </div>
        </div>

        {/* Chat Area */}
        <ScrollArea className="flex-1 bg-[#e5ddd5] p-4 relative">
          <div className="space-y-4 pb-4">
            {/* Date Divider */}
            <div className="flex justify-center">
              <span className="bg-[#e1f3fb] text-xs px-3 py-1 rounded-lg text-gray-600 shadow-sm">Today</span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full mb-2",
                  msg.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 shadow-sm relative text-sm",
                    msg.sender === 'user'
                      ? "bg-[#d9fdd3] rounded-tr-none text-black"
                      : "bg-white rounded-tl-none text-black"
                  )}
                >
                  <p>{msg.text}</p>

                  {/* Option Buttons */}
                  {msg.type === 'options' && msg.options && (
                    <div className="mt-3 grid gap-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="bg-white border border-primary/20 hover:bg-primary/5 text-primary text-sm py-2 px-3 rounded-md transition-colors font-medium shadow-sm text-center"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-gray-500 block text-right mt-1 w-full">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t">
          <Button variant="ghost" size="icon" className="text-gray-500 rounded-full h-10 w-10">
            <ImageIcon className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message"
              className="bg-white border-none rounded-full px-4 h-10 focus-visible:ring-0"
            />
          </div>

          {input.trim() ? (
            <Button onClick={handleSend} size="icon" className="bg-[#008069] hover:bg-[#006d59] rounded-full h-10 w-10 transition-transform hover:scale-105 active:scale-95">
              <Send className="h-5 w-5 text-white ml-0.5" />
            </Button>
          ) : (
            <Button size="icon" className="bg-[#008069] hover:bg-[#006d59] rounded-full h-10 w-10">
              <Mic className="h-5 w-5 text-white" />
            </Button>
          )}

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
