import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema,
  insertBlogPostSchema,
  insertTestimonialSchema
} from "@shared/schema";
import { sendContactFormNotification } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notifications without blocking the saved submission
      try {
        await sendContactFormNotification(validatedData);
        console.log("✅ Contact form email sent successfully");
      } catch (emailError) {
        console.error("⚠️ Email sending failed, but form submission was saved:", emailError);
        // Continue even if email fails - the form submission is still saved
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! We'll get back to you soon.",
        id: submission.id 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to submit contact form. Please try again." 
      });
    }
  });

  // Get all contact submissions (admin endpoint)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Failed to fetch contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  // Blog posts endpoints
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json({ success: true, post });
    } catch (error) {
      console.error("Failed to create blog post:", error);
      res.status(400).json({ success: false, message: "Failed to create blog post" });
    }
  });

  // Testimonials endpoints
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, testimonial });
    } catch (error) {
      console.error("Failed to create testimonial:", error);
      res.status(400).json({ success: false, message: "Failed to create testimonial" });
    }
  });

  // Test email endpoint (for development/testing only)
  app.post("/api/test-email", async (req, res) => {
    try {
      await sendContactFormNotification({
        fullName: "Test User",
        email: "test@example.com",
        service: "General Building",
        message: "This is a test email to verify inbound email integration is working correctly."
      });
      res.json({ success: true, message: "Test email sent successfully" });
    } catch (error) {
      console.error("Test email failed:", error);
      res.status(500).json({ success: false, message: "Test email failed", error: String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
