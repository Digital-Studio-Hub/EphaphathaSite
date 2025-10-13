import { 
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContactSubmission,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private blogPosts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.seedSampleData();
  }

  private seedSampleData() {
    // Seed sample blog posts
    const post1: BlogPost = {
      id: randomUUID(),
      title: "5 Essential Tips for Planning Your Construction Project",
      slug: "5-essential-tips-construction-planning",
      excerpt: "Planning a construction project can be overwhelming. Here are five key tips to ensure your project runs smoothly from start to finish.",
      content: "Full article content here...",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop",
      author: "Ephaphatha Construction",
      createdAt: new Date("2025-09-15"),
    };
    this.blogPosts.set(post1.id, post1);

    const post2: BlogPost = {
      id: randomUUID(),
      title: "Understanding Building Regulations in South Africa",
      slug: "understanding-building-regulations-south-africa",
      excerpt: "Stay compliant with the latest building regulations. Learn what permits and approvals you need before breaking ground.",
      content: "Full article content here...",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=400&fit=crop",
      author: "Ephaphatha Construction",
      createdAt: new Date("2025-08-20"),
    };
    this.blogPosts.set(post2.id, post2);

    const post3: BlogPost = {
      id: randomUUID(),
      title: "The Benefits of Professional Waterproofing Services",
      slug: "benefits-professional-waterproofing",
      excerpt: "Protect your investment with quality waterproofing. Discover why professional waterproofing is crucial for long-term building integrity.",
      content: "Full article content here...",
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop",
      author: "Ephaphatha Construction",
      createdAt: new Date("2025-07-10"),
    };
    this.blogPosts.set(post3.id, post3);

    // Seed sample testimonials
    const test1: Testimonial = {
      id: randomUUID(),
      clientName: "John Mokoena",
      clientCompany: "MK Developers",
      testimonialText: "Ephaphatha Construction exceeded our expectations. Their professionalism, attention to detail, and commitment to quality made our commercial building project a success. Highly recommended!",
      rating: "5",
      imageUrl: null,
      createdAt: new Date("2025-09-01"),
    };
    this.testimonials.set(test1.id, test1);

    const test2: Testimonial = {
      id: randomUUID(),
      clientName: "Sarah van der Merwe",
      clientCompany: "Van Der Merwe Estates",
      testimonialText: "Working with Ephaphatha Construction was a pleasure. They delivered our residential complex on time and within budget. The team was responsive and addressed every concern promptly.",
      rating: "5",
      imageUrl: null,
      createdAt: new Date("2025-08-15"),
    };
    this.testimonials.set(test2.id, test2);

    const test3: Testimonial = {
      id: randomUUID(),
      clientName: "David Nkosi",
      clientCompany: "Nkosi Properties",
      testimonialText: "Their borehole drilling service was exceptional. The team was knowledgeable, efficient, and left the site clean. We now have a reliable water source thanks to Ephaphatha Construction.",
      rating: "5",
      imageUrl: null,
      createdAt: new Date("2025-07-20"),
    };
    this.testimonials.set(test3.id, test3);

    const test4: Testimonial = {
      id: randomUUID(),
      clientName: "Lisa Botha",
      clientCompany: "Botha Manufacturing",
      testimonialText: "Ephaphatha Construction handled our industrial facility expansion perfectly. Their expertise in electrical and plumbing work ensured everything was up to code and functioned flawlessly.",
      rating: "5",
      imageUrl: null,
      createdAt: new Date("2025-06-10"),
    };
    this.testimonials.set(test4.id, test4);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      author: insertPost.author || "Ephaphatha Construction",
      createdAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      rating: insertTestimonial.rating || "5",
      createdAt: new Date(),
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
