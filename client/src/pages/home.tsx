import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Goal, 
  Rocket, 
  Building2, 
  Wrench, 
  Fence, 
  Caravan, 
  Waves, 
  Plug, 
  PaintRoller, 
  PenSquare, 
  Sparkles, 
  Sprout, 
  Trash2, 
  BadgeCheck, 
  ShieldCheck, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  Facebook,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema } from "@shared/schema";
import { SEO } from "@/components/ui/seo";
import logoPath from "@assets/WhatsApp Image 2025-10-03 at 14.25.08_4b18e548_1760004153354.jpg";
import heroImage from "@assets/construction-site-sunset_1760006430190.webp";
import aboutImage from "@assets/civil-engineer-construction-worker-manager-holding-digital-tablet-blueprints-talking-planing-about-construction-site-cooperation-teamwork-concept_1760006430189.webp";
import contactImage from "@assets/afro-american-builders-wearing-helmets-face-masks-while-measuring-wall_1760006430189.webp";

interface ContactFormData {
  fullName: string;
  email: string;
  service: string;
  message: string;
}

const services = [
  { id: "general-building", name: "General Building", icon: Building2, description: "New constructions and renovations." },
  { id: "plumbing", name: "Plumbing Services", icon: Wrench, description: "Routine maintenance and full installations." },
  { id: "fencing", name: "Fencing Solutions", icon: Fence, description: "Durable and secure fencing installations." },
  { id: "paving", name: "Paving", icon: Caravan, description: "Residential and commercial paving." },
  { id: "borehole", name: "Borehole Drilling", icon: Waves, description: "Access to natural water resources." },
  { id: "electrical", name: "Electrical Maintenance", icon: Plug, description: "Wiring, repairs, and installations." },
  { id: "painting", name: "Painting & Waterproofing", icon: PaintRoller, description: "Property protection and beautification." },
  { id: "stationery", name: "Stationery & Furniture Supply", icon: PenSquare, description: "Office, school, and home supplies." },
  { id: "cleaning", name: "Cleaning Services", icon: Sparkles, description: "For homes, offices, and commercial properties." },
  { id: "landscaping", name: "Landscaping", icon: Sprout, description: "Professional garden design and maintenance." },
  { id: "waste", name: "Waste Removal", icon: Trash2, description: "Site clearing and waste management." },
];

const trustFeatures = [
  {
    icon: BadgeCheck,
    title: "B-BBEE Level 1 Contributor",
    description: "We are proud to be a Level 1 B-BBEE contributor, committed to economic empowerment."
  },
  {
    icon: ShieldCheck,
    title: "Tax Compliant",
    description: "Fully compliant with SARS, ensuring professionalism and peace of mind."
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "We build lasting relationships by putting your needs first."
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      service: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message,
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit contact form. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const targetPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <SEO />
      <div className="bg-white text-gray-800">
        {/* Navigation */}
        <nav className="sticky-nav fixed top-0 left-0 right-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={logoPath} 
                  alt="Ephaphatha Construction Logo" 
                  className="h-16 w-auto" 
                  data-testid="logo-image"
                />
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                  data-testid="nav-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                  data-testid="nav-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                  data-testid="nav-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                  data-testid="nav-contact"
                >
                  Contact
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary px-6 py-2.5 font-semibold"
                  data-testid="btn-quote-desktop"
                >
                  Get a Free Quote
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700 hover:text-primary"
                  data-testid="btn-mobile-menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t" data-testid="mobile-menu">
              <div className="px-4 py-3 space-y-3">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block text-gray-700 hover:text-primary font-medium w-full text-left"
                  data-testid="nav-mobile-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block text-gray-700 hover:text-primary font-medium w-full text-left"
                  data-testid="nav-mobile-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="block text-gray-700 hover:text-primary font-medium w-full text-left"
                  data-testid="nav-mobile-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block text-gray-700 hover:text-primary font-medium w-full text-left"
                  data-testid="nav-mobile-contact"
                >
                  Contact
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary px-6 py-2.5 font-semibold"
                  data-testid="btn-quote-mobile"
                >
                  Get a Free Quote
                </Button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative pt-20 min-h-screen flex items-center" data-testid="hero-section">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="Construction site at sunset" 
              className="w-full h-full object-cover"
              data-testid="hero-background-image"
            />
            <div className="hero-overlay absolute inset-0"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight" data-testid="hero-title">
                Building Excellence, Delivering Trust
              </h1>
              <div className="h-1 w-24 bg-primary-light mb-8"></div>
              <p className="tagline text-xl sm:text-2xl lg:text-3xl mb-12 max-w-4xl leading-relaxed" data-testid="hero-subtitle">
                Ephaphatha Construction offers versatile and innovative construction, maintenance, and supply services across Bloemfontein — your trusted partner for quality and reliability.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Button 
                  onClick={() => scrollToSection('services')}
                  className="btn-primary px-10 py-6 text-base"
                  data-testid="btn-hero-services"
                >
                  Explore Our Services
                </Button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  variant="outline"
                  className="btn-secondary px-10 py-6 text-base border-2 border-white text-white hover:bg-white hover:text-primary"
                  data-testid="btn-hero-contact"
                >
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-white" data-testid="about-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5"></div>
                <img 
                  src={aboutImage} 
                  alt="Civil engineer and construction worker collaborating" 
                  className="relative w-full h-[500px] object-cover enterprise-shadow-lg"
                  data-testid="about-image"
                />
              </div>
              
              {/* Right: Content */}
              <div>
                <div className="mb-12">
                  <h2 className="section-title text-4xl sm:text-5xl text-gray-900 mb-6" data-testid="about-title">
                    Your Vision, Built with Integrity
                  </h2>
                  <div className="h-1 w-20 bg-primary mb-8"></div>
                  <p className="text-lg text-gray-700 leading-relaxed" data-testid="about-description">
                    Ephaphatha Construction is a versatile and innovative company based in Bloemfontein, dedicated to delivering high-quality services across multiple sectors. We serve businesses, households, and public institutions with a commitment to excellence, professionalism, and building long-term client relationships.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {/* Vision */}
                  <div className="border-l-4 border-primary-light pl-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary-light p-2">
                        <Goal className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      To become a premier provider in general construction, maintenance, and supply services in South Africa, recognized for our integrity, quality, and a customer-centric approach.
                    </p>
                  </div>
                  
                  {/* Mission */}
                  <div className="border-l-4 border-primary pl-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary p-2">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      To provide efficient, cost-effective, and high-quality services that enhance the living and working environments of our clients and to be a trusted partner in the Bloemfontein community and beyond.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-neutral-light" data-testid="services-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="section-title text-4xl sm:text-5xl text-gray-900 mb-6" data-testid="services-title">
                Our Comprehensive Services
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed" data-testid="services-subtitle">
                From construction to maintenance, we provide end-to-end solutions for all your building needs across Bloemfontein.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                const bgColors = ['bg-primary-light', 'bg-primary', 'bg-primary-dark'];
                const bgColor = bgColors[index % bgColors.length];
                
                return (
                  <Card 
                    key={service.id} 
                    className="service-card enterprise-shadow bg-white border-0"
                    data-testid={`service-card-${service.id}`}
                  >
                    <CardContent className="p-6">
                      <div className={`icon-box ${bgColor} w-16 h-16 flex items-center justify-center mb-5`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">{service.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust & Compliance Section */}
        <section className="py-24 bg-gradient-to-br from-primary-dark to-primary" data-testid="trust-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="section-title text-4xl sm:text-5xl text-white mb-6" data-testid="trust-title">
                Why Choose Us?
              </h2>
              <div className="h-1 w-20 bg-white mx-auto mb-6"></div>
              <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed" data-testid="trust-subtitle">
                We combine expertise with integrity to deliver exceptional results every time.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {trustFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-10 text-center border-2 border-white/20 hover:bg-white/15 transition-all"
                    data-testid={`trust-feature-${index}`}
                  >
                    <div className="bg-white w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-white/95 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white" data-testid="contact-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="section-title text-4xl sm:text-5xl text-gray-900 mb-6" data-testid="contact-title">
                Let's Build Something Together
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed" data-testid="contact-subtitle">
                Get in touch with us today to discuss your project and receive a free quote.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column: Contact Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Contact Information</h3>
                  
                  {/* Phone */}
                  <div className="flex items-start gap-5 mb-8 group" data-testid="contact-phone">
                    <div className="bg-primary-light p-4 group-hover:bg-primary transition-colors">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 tracking-tight">Phone</h4>
                      <a 
                        href="tel:+27680222228" 
                        className="text-gray-700 hover:text-primary transition-colors text-lg"
                        data-testid="link-phone"
                      >
                        +27 68 022 2228
                      </a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start gap-5 mb-8 group" data-testid="contact-email">
                    <div className="bg-primary p-4 group-hover:bg-primary-dark transition-colors">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 tracking-tight">Email</h4>
                      <a 
                        href="mailto:Ephaphathac@gmail.com" 
                        className="text-gray-700 hover:text-primary transition-colors text-lg break-all"
                        data-testid="link-email"
                      >
                        Ephaphathac@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start gap-5 group" data-testid="contact-address">
                    <div className="bg-primary-dark p-4 group-hover:bg-primary transition-colors">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 tracking-tight">Address</h4>
                      <p className="text-gray-700 text-lg">37723 Freedom Square, Bloemfontein</p>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-hidden enterprise-shadow-lg">
                  <img 
                    src={contactImage} 
                    alt="Construction workers collaborating" 
                    className="w-full h-80 object-cover"
                    data-testid="contact-image"
                  />
                </div>
              </div>
              
              {/* Right Column: Contact Form */}
              <div className="bg-neutral-light p-10 enterprise-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Send Us a Message</h3>
                
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" data-testid="contact-form">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      {...form.register("fullName")}
                      className="focus:ring-2 focus:ring-primary focus:border-primary"
                      data-testid="input-fullname"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...form.register("email")}
                      className="focus:ring-2 focus:ring-primary focus:border-primary"
                      data-testid="input-email"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="service" className="text-sm font-semibold text-gray-700 mb-2">
                      Service of Interest
                    </Label>
                    <Select onValueChange={(value) => form.setValue("service", value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-primary focus:border-primary" data-testid="select-service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.service && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.service.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your project..."
                      {...form.register("message")}
                      className="focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      data-testid="textarea-message"
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="btn-primary w-full py-5 text-base"
                    disabled={contactMutation.isPending}
                    data-testid="btn-submit-form"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 border-t-4 border-primary" data-testid="footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-400" data-testid="footer-copyright">
                  © 2025 Ephaphatha Construction (Pty) Ltd. All Rights Reserved.
                </p>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 hover:bg-primary transition-colors" 
                  aria-label="Facebook"
                  data-testid="link-facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 hover:bg-primary transition-colors" 
                  aria-label="LinkedIn"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
