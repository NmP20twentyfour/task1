
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types for chat messages
type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

// Predefined FAQ responses
const faqResponses: Record<string, string> = {
  "how do i sell my license": "To sell your license, click on the 'Sell My Licenses' button at the top of our website, upload your license details, and our team will provide you with a valuation within 24 hours.",
  "how much can i get for my license": "The value of your license depends on several factors including the software type, remaining license duration, and current market demand. We typically offer 30-70% of the original price for unused licenses.",
  "how long does the process take": "Our process is quick - you'll receive a valuation within 24 hours of submission and payment within 3 business days after accepting our offer.",
  "what types of licenses do you buy": "We purchase licenses for major software providers including Microsoft, Adobe, Oracle, SAP, Autodesk, and many others. Contact us for specific information about your license.",
  "is this legal": "Yes, our process is 100% legal. We ensure all transfers comply with the license agreements and relevant laws governing software license transfers."
};

// Helper function to get answers based on user input
const getResponse = (question: string): string => {
  const normalizedQuestion = question.toLowerCase().trim();
  
  // Check for exact matches first
  if (faqResponses[normalizedQuestion]) {
    return faqResponses[normalizedQuestion];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(faqResponses)) {
    if (normalizedQuestion.includes(key)) {
      return value;
    }
  }
  
  // Default response if no match is found
  return "I don't have specific information about that. For the fastest assistance, please fill out our contact form and our team will get back to you shortly. You can also try asking about how to sell licenses, pricing, or our process.";
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "Hi there! How can I help you with software license reselling today?",
      role: "assistant"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user" as const
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with a short delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: getResponse(inputValue),
        role: "assistant" as const
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-20 right-4 w-80 sm:w-96 bg-card rounded-lg shadow-lg border z-50 flex flex-col max-h-[500px]"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="font-semibold">SoftSell Assistant</div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "assistant" 
                        ? "bg-muted text-foreground" 
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground">
                    <motion.div 
                      className="flex space-x-1"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                    >
                      <div className="h-2 w-2 bg-foreground/70 rounded-full"></div>
                      <div className="h-2 w-2 bg-foreground/70 rounded-full"></div>
                      <div className="h-2 w-2 bg-foreground/70 rounded-full"></div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="mt-2 text-xs text-muted-foreground">
                Example questions: "How do I sell my license?", "How much can I get?"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg"
        size="icon"
        aria-label="Chat with us"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </>
  );
};

export default ChatWidget;
