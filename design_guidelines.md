# Ephaphatha Construction - Design Guidelines

## Design Approach
**Enterprise Professional with Bold Industry Identity**
Drawing from corporate construction leaders (Bechtel, Turner Construction) while maintaining the specified sharp, modern aesthetic. Zero border radius creates a strong, structural visual language that mirrors construction precision.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Brand Orange: `38 100% 50%` (construction signature)
- Dark Mode Primary: `38 90% 45%`

**Supporting Colors:**
- Charcoal: `220 15% 20%` (headings, primary text)
- Steel Gray: `220 10% 45%` (body text)
- Concrete: `220 8% 92%` (backgrounds, cards)
- Deep Black: `220 20% 12%` (dark mode background)

**Accent (Minimal Use):**
- Safety Yellow: `48 100% 60%` (CTAs, highlights only)

### B. Typography
**Families:**
- Headings: `Inter` (700, 800 weights) - clean, geometric, enterprise-grade
- Body: `Inter` (400, 500, 600) - optimal readability

**Hierarchy:**
- H1: 3.5rem/4rem (56px/64px), tracking-tight, font-extrabold
- H2: 2.5rem/3rem (40px/48px), tracking-tight, font-bold
- H3: 1.875rem (30px), font-bold
- Body: 1.125rem (18px), leading-relaxed

**Accent Treatment:**
Apply orange underline decoration (4px height, 8px offset) to key headings using border-bottom combined with padding-bottom for precise control.

### C. Layout System
**Spacing Primitives:** Tailwind units of 4, 8, 12, 16, 20, 24 (tight, controlled rhythm)

**Section Structure:**
- Hero: Full viewport height with image
- Content sections: py-20 desktop, py-12 mobile
- Component spacing: gap-8 for grids, gap-6 for cards
- Container: max-w-7xl mx-auto px-6

### D. Component Library

**Navigation:**
Fixed header with white background, subtle shadow, height h-20. Logo left, nav center, CTA button right. Sticky on scroll with background blur.

**Hero Section:**
Full-screen (min-h-screen) split layout: Left 50% content with h1, supporting text, dual CTA buttons. Right 50% large project image. Overlay gradient for text readability: `linear-gradient(to right, rgba(255,255,255,0.95) 50%, transparent)`.

**Service Cards:**
3-column grid (1 mobile, 3 desktop). Each card: white background, 16px padding, subtle shadow on hover (no border radius). Icon top (construction-themed), service title, 2-line description, "Learn More" text link with orange underline.

**Project Showcase:**
4-column masonry grid. Project cards: Image on top, project name and category text overlay on dark gradient bottom. Click interaction reveals modal with full details.

**Stats Section:**
4-column counter display on dark background. Large numbers (orange color), descriptive labels below (white text). Centered alignment, py-24 spacing.

**Testimonials:**
2-column layout. Each testimonial: Large quote icon, testimonial text, client name/company, optional logo. White cards with shadows, alternating layout direction.

**CTA Section:**
Full-width orange background section. Centered content: bold headline, supporting text, primary button (white bg, orange text, zero border radius).

**Footer:**
Dark background (deep black). 4-column grid: Company info + logo, Services links, Quick links, Contact info. Bottom bar with copyright and social icons. py-16 spacing.

### E. Buttons & Interactions
**Primary Button:** Orange background, white text, px-8 py-4, font-semibold, zero border radius, hover: brightness increase
**Secondary Button:** White/transparent background, orange border (2px), orange text, same padding
**Outline on Image:** White border, white text, backdrop-blur-md background

## Images

**Hero Image (Right 50%):** High-quality construction site photo showing active building project with workers and machinery. Professional, well-lit, modern construction environment.

**Service Icons:** Use Heroicons for construction-related icons (wrench, building, blueprint concepts). Display at 48px size, orange color.

**Project Gallery (8-12 images):** Completed construction projects - commercial buildings, infrastructure, residential developments. Professional photography, varied angles, showing scale and quality.

**Background Patterns:** Optional subtle grid/blueprint pattern overlay on dark sections for thematic depth.

## Page Structure (7 Sections)
1. Hero (full viewport with image)
2. Services Grid (3-column cards)
3. About/Why Choose (2-column: text + stats)
4. Projects Portfolio (masonry grid)
5. Process/Expertise (timeline or step cards)
6. Testimonials (2-column)
7. CTA + Footer

**Critical:** No border radius anywhere. Orange used strategically for impact, not overused. Every section purposeful and content-rich. Multi-column layouts for services, projects, testimonials create visual interest without clutter.