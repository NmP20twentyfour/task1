
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Sun, Moon, Check, ArrowRight } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/components/theme-provider";
import ChatWidget from "@/components/ChatWidget";

export default function Index() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    // Form validation
    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsFormSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsFormSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll be in touch soon!",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        licenseType: "",
        message: "",
      });
      setIsFormSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Toggle
          pressed={theme === "dark"}
          onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="rounded-full p-2"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Toggle>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Transform Your Unused Software Into Cash
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              SoftSell helps businesses recover value from unused software licenses. Simple, secure, and profitable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="animate-fade-in transition-all hover:scale-105">
                Get a Quote
              </Button>
              <Button size="lg" variant="outline" className="animate-fade-in transition-all hover:scale-105">
                Sell My Licenses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Upload License",
                description: "Submit your unused software licenses through our secure portal",
                icon: "📋",
                delay: 100
              },
              {
                title: "Get Valuation",
                description: "Receive a competitive market valuation within 24 hours",
                icon: "💰",
                delay: 200
              },
              {
                title: "Get Paid",
                description: "Accept our offer and receive payment within 3 business days",
                icon: "💳",
                delay: 300
              }
            ].map((step, index) => (
              <div 
                key={step.title}
                className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm border animate-fade-in transition-all hover:scale-105"
                style={{animationDelay: `${step.delay}ms`}}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <div className="flex items-center justify-center w-full my-3">
                  <div className="h-px bg-border flex-1"></div>
                  <span className="mx-2 text-muted-foreground font-medium">{index + 1}</span>
                  <div className="h-px bg-border flex-1"></div>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="mt-4 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Maximum Value",
                description: "Our marketplace ensures you get the best possible price for your unused licenses",
                icon: "🏆",
                delay: 100
              },
              {
                title: "Legal Compliance",
                description: "All transactions are fully compliant with software licensing regulations",
                icon: "⚖️",
                delay: 200
              },
              {
                title: "Secure Process",
                description: "Your data and transactions are protected with enterprise-grade security",
                icon: "🔒",
                delay: 300
              },
              {
                title: "Fast Turnaround",
                description: "From submission to payment in as little as 72 hours",
                icon: "⚡",
                delay: 400
              }
            ].map((feature) => (
              <div 
                key={feature.title} 
                className="flex gap-4 items-start p-6 bg-card rounded-lg shadow-sm border animate-fade-in transition-all hover:scale-105"
                style={{animationDelay: `${feature.delay}ms`}}
              >
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "IT Director",
                company: "TechCorp Inc.",
                quote: "SoftSell helped us recover over $50,000 from unused enterprise licenses. The process was surprisingly simple and the team was professional throughout.",
                delay: 100
              },
              {
                name: "Michael Chen",
                role: "CTO",
                company: "Innovate Solutions",
                quote: "As we transitioned to cloud-based solutions, SoftSell provided an excellent way to offset costs by selling our legacy software licenses. Highly recommended.",
                delay: 200
              }
            ].map((testimonial) => (
              <div 
                key={testimonial.name}
                className="p-6 bg-card rounded-lg shadow-sm border animate-fade-in transition-all hover:scale-105"
                style={{animationDelay: `${testimonial.delay}ms`}}
              >
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Get in Touch</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com" 
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input 
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="licenseType">License Type</Label>
                <select
                  id="licenseType"
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="">Select license type</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Adobe">Adobe</option>
                  <option value="Oracle">Oracle</option>
                  <option value="SAP">SAP</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can we help you?" 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full transition-all hover:scale-105"
              disabled={isFormSubmitting}
            >
              {isFormSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  Submit Request
                  <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} SoftSell. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
