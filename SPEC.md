# Apartment TreePark City - Landing Page Specification

## 1. Project Overview

**Project Name:** Apartment TreePark City
**Type:** Modern Real Estate Landing Page
**Core Functionality:** Premium apartment sales landing page with modern UI, testimonials with 3D scroll animations, floating WhatsApp CTA, and responsive design.

## 2. Visual & Rendering Specification

### Color Palette
- **Primary:** Deep Emerald Green (#0D5C46) - represents nature/trees
- **Secondary:** Warm Gold (#C9A861) - premium accent
- **Background:** Off-white (#FEFDFB) with subtle cream tones
- **Dark:** Charcoal (#1A1A1A) for text
- **Light Gray:** #E8E6E3 for subtle borders/cards
- **Gradient Overlay:** Linear gradient from emerald to transparent for hero

### Typography
- **Headings:** Playfair Display (serif) - elegant, premium feel
- **Body:** DM Sans (sans-serif) - modern, readable
- **Accent Text:** Cormorant Garamond for taglines

### Layout Structure
1. **Navigation** - Fixed top bar with logo, nav links, CTA button
2. **Hero Section** - Full viewport height, gradient overlay, branded imagery
3. **Features Section** - Grid of apartment amenities/features
4. **Gallery Section** - Visual showcase of apartment interiors
5. **Testimonials Section** - Review cards with 3D scroll animations
6. **Contact Section** - Contact info and inquiry form
7. **Footer** - Standard footer with links and copyright

### Materials & Effects
- Smooth scroll behavior
- 3D perspective transforms on testimonial cards during scroll
- Subtle parallax effect on hero background
- Glassmorphism effects on floating elements
- Elegant hover transitions on all interactive elements

## 3. Interaction Specification

### Animations
- **Hero Entrance:** Fade-in and slide-up animations on load
- **Scroll Animations:** Cards animate in from different directions
- **3D Card Effects:** Testimonial cards rotate based on scroll position (3D transforms)
- **Hover Effects:** Scale, shadow, and subtle glow on interactive elements
- **WhatsApp Button:** Pulse animation, hover scale effect

### User Controls
- Smooth scrolling navigation
- Click on nav links → scroll to section
- Click on WhatsApp button → open WhatsApp chat
- Interactive testimonial cards with depth effect

## 4. Component Specification

### Navigation Bar
- Logo (text-based: "TreePark City")
- Nav links: Home, Tentang, Fasilitas, Testimoni, Kontak
- CTA Button: "Hubungi Kami"
- Transparent to solid background on scroll
- Mobile hamburger menu

### Hero Section
- Full-screen background with gradient overlay
- Main headline: "Hunian Premium di Tengah Kebun Kota"
- Subheadline: Description of the apartment
- CTA buttons: "Lihat Unit" and "Hubungi Kami"
- Scroll indicator animation

### Features/Amenities Section
- Grid of 6 feature cards
- Icons for each feature (pool, gym, security, parking, garden, concierge)
- Feature title and brief description
- Animated reveal on scroll

### Testimonials Section
- 4 testimonial cards in carousel/grid
- Each card contains:
  - 5-star rating
  - Review text
  - Customer name and avatar
  - Unit type purchased
- 3D scroll animation with perspective transforms
- Card tilt effect following mouse/scroll position

### Floating WhatsApp Button
- Fixed position: bottom-right corner
- WhatsApp icon (SVG)
- Pulse animation
- Links to: https://wa.me/6281234567890
- Glassmorphism background

### Footer
- Company logo and tagline
- Quick links
- Contact information
- Social media icons
- Copyright

## 5. Responsive Breakpoints
- **Desktop:** 1024px+
- **Tablet:** 768px - 1023px
- **Mobile:** < 768px

## 6. Technical Implementation
- Next.js with React 18
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Custom 3D scroll hook for card effects
- Lucide React for icons

## 7. Performance Optimization
- Lazy loading images
- Optimized font loading (Google Fonts)
- Minimal JavaScript bundle
- CSS animations over JS where possible
- Intersection Observer for scroll-triggered animations