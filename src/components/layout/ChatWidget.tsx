import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
}

const quickActions = [
  "View Vehicles",
  "Book Test Drive",
  "Get Pricing",
  "Contact Sales",
  "Visit Showroom",
];

const botReplies: Record<string, string> = {
  "View Vehicles": "You can explore our full range of electric vehicles on the Vehicles page. We have SUVs, pickups, matatus, and buses!",
  "Book Test Drive": "Great choice! Please visit our Contact page or call us at +254 113 778 888 to schedule your test drive.",
  "Get Pricing": "Our vehicles start from competitive prices with flexible financing options. Contact our sales team for detailed pricing.",
  "Contact Sales": "You can reach our sales team at Info@transbiz.com or call +254 113 778 888. We're available Mon-Fri, 8am to 6pm.",
  "Visit Showroom": "Our showroom is located on Ngong Rd, Nairobi, Next to Rubis. We're open Mon-Sat: 8am-8pm, Sunday: 10am-4pm.",
};

const defaultReply =
  "Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call us at +254 113 778 888 or email Info@transbiz.com.";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      text: "Hello! I'm TransbizAI, your electric vehicle assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickAction = (action: string) => {
    const userMsg: Message = { id: Date.now().toString(), type: "user", text: action };
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      text: botReplies[action] || defaultReply,
    };
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), type: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), type: "bot", text: defaultReply },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand rounded-full flex items-center justify-center text-[#050505] shadow-lg animate-pulse-subtle"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 w-[380px] max-w-[calc(100vw-48px)] h-[500px] bg-bg-card border border-border-dark rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-dark">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-brand" />
                <span className="font-heading font-semibold text-white">Transbiz</span>
                <span className="flex items-center gap-1.5 text-xs text-txt-secondary ml-2">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  Online
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-txt-muted hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.type === "bot" ? "bg-brand-soft" : "bg-brand"
                    }`}
                  >
                    {msg.type === "bot" ? (
                      <Bot size={14} className="text-brand" />
                    ) : (
                      <User size={14} className="text-[#050505]" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.type === "bot"
                        ? "bg-bg-elevated text-txt-primary"
                        : "bg-brand text-[#050505]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Quick Actions */}
              {messages[messages.length - 1]?.type === "bot" && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="px-3 py-1.5 bg-brand-soft text-brand text-xs font-medium rounded-full hover:bg-brand/20 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border-dark flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-bg-elevated border border-border-dark rounded-xl text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-brand transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-[#050505] hover:bg-brand-hover transition-colors"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
