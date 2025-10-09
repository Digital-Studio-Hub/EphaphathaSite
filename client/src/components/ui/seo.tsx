import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

export function SEO({
  title = "Ephaphatha Construction - Building Excellence, Delivering Trust | Bloemfontein",
  description = "Ephaphatha Construction (Pty) Ltd - Your trusted partner for quality construction, maintenance, and supply services in Bloemfontein. B-BBEE Level 1 Contributor.",
  keywords = "construction Bloemfontein, building services, plumbing, fencing, borehole drilling, electrical maintenance, painting, waterproofing, landscaping, B-BBEE Level 1",
  ogImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
  ogType = "website",
  structuredData
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Ephaphatha Construction (Pty) Ltd');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);

    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Default structured data for the business
    const defaultStructuredData = {
      "@context": "https://schema.org",
      "@type": "ConstructionCompany",
      "name": "Ephaphatha Construction (Pty) Ltd",
      "description": "Versatile and innovative construction, maintenance, and supply services",
      "telephone": "+27680222228",
      "email": "Ephaphathac@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "37723 Freedom Square",
        "addressLocality": "Bloemfontein",
        "addressCountry": "ZA"
      },
      "areaServed": "Bloemfontein",
      "priceRange": "$$"
    };

    if (!structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(defaultStructuredData);
    }
  }, [title, description, keywords, ogImage, ogType, structuredData]);

  return null;
}
