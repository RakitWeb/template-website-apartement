import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Star, Waves, Dumbbell, Shield,
  Car, Trees, Bell, Phone, Mail, MapPin, Clock,
  ChevronLeft, ChevronRight, Quote, Building2, Home, Users,
  ArrowLeft, Bed, Bath, Square, Check, Wifi, Camera,
  Wind, Droplets, Zap, Heart, Maximize2, Map
} from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/6281234567890';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  unit: string;
}

interface Unit {
  id: number;
  name: string;
  type: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  price: string;
  priceValue: number;
  image: string;
  gallery: string[];
  facilities: string[];
  available: number;
  floor: string;
  view: string;
}

interface FrameConfig {
  id: number;
  imageUrl: string;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  rotateY: number;
  rotateX: number;
  translateZ: number;
  speedX: number;
  speedY: number;
  scale: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Pengusaha',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text: 'Tinggal di TreePark City memberikan pengalaman luar biasa. View hijau dari balkon sangat menenangkan setiap pagi.',
    unit: 'Penthouse Suite'
  },
  {
    id: 2,
    name: 'Sari Dewi',
    role: 'Dokter',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text: 'Fasilitas lengkap dan lokasi strategis. Sangat cocok untuk profesional sibuk yang butuh kenyamanan.',
    unit: 'Deluxe Suite'
  },
  {
    id: 3,
    name: 'Ahmad Rizki',
    role: 'Arsitek',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text: 'Desain interior modern dan berkualitas. Setiap detail memperhatikan kenyamanan penghuni dengan baik.',
    unit: 'Executive Suite'
  },
  {
    id: 4,
    name: 'Maya Putri',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    rating: 5,
    text: 'Area hijau yang luas memberikan keseimbangan sempurna antara kehidupan perkotaan dan alam. Sangat direkomendasikan!',
    unit: 'Garden Suite'
  }
];

const features = [
  { icon: Waves, title: 'Infinity Pool', desc: 'Kolam renang infinity dengan pemandangan kota' },
  { icon: Dumbbell, title: 'Fitness Center', desc: 'Gym lengkap dengan peralatan modern terbaru' },
  { icon: Shield, title: '24/7 Security', desc: 'Sistem keamanan terintegrasi dengan CCTV' },
  { icon: Car, title: 'Smart Parking', desc: 'Sistem parkir otomatis dan terkontrol' },
  { icon: Trees, title: 'Urban Garden', desc: 'Taman vertikal seluas 5 hektar' },
  { icon: Bell, title: 'Concierge', desc: 'Layanan concierge 24 jam' }
];

const stats = [
  { icon: Building2, value: '25+', label: 'Tower' },
  { icon: Home, value: '1,200+', label: 'Unit Tersedia' },
  { icon: Users, value: '3,500+', label: 'Penghuni Puas' }
];

const units: Unit[] = [
  {
    id: 1,
    name: 'Studio Apartment',
    type: 'Compact',
    size: '32 m²',
    bedrooms: 1,
    bathrooms: 1,
    price: 'Rp 850Jt',
    priceValue: 850000000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'
    ],
    facilities: ['AC', 'TV', 'WiFi', 'Water Heater', 'Furniture Set', 'Wardrobe', 'Kitchen Set'],
    available: 12,
    floor: '3-10',
    view: 'City View'
  },
  {
    id: 2,
    name: 'Deluxe Suite',
    type: 'Premium',
    size: '55 m²',
    bedrooms: 2,
    bathrooms: 1,
    price: 'Rp 1.2M',
    priceValue: 1200000000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
    ],
    facilities: ['AC', 'TV', 'WiFi', 'Water Heater', 'Furniture Set', 'Balcony', 'Kitchen Set', 'Study Room'],
    available: 8,
    floor: '11-18',
    view: 'Garden View'
  },
  {
    id: 3,
    name: 'Executive Suite',
    type: 'Luxury',
    size: '78 m²',
    bedrooms: 3,
    bathrooms: 2,
    price: 'Rp 1.8M',
    priceValue: 1800000000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80'
    ],
    facilities: ['AC', 'Smart TV', 'WiFi 5G', 'Water Heater', 'Full Furniture', 'Balcony', 'Kitchen Set', 'Smart Home', 'Storage'],
    available: 5,
    floor: '19-25',
    view: 'Panoramic View'
  },
  {
    id: 4,
    name: 'Penthouse Suite',
    type: 'Elite',
    size: '120 m²',
    bedrooms: 4,
    bathrooms: 3,
    price: 'Rp 3.5M',
    priceValue: 3500000000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80'
    ],
    facilities: ['Central AC', 'Smart TV 65"', 'WiFi 5G', 'Water Heater', 'Premium Furniture', 'Private Balcony', 'Kitchen Set', 'Smart Home', 'Private Lift', 'Jacuzzi'],
    available: 2,
    floor: '26-30',
    view: 'Sky View'
  }
];

const frameImages = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80'
];

const frameConfigs: FrameConfig[] = [
  { id: 1, imageUrl: frameImages[0], initialX: -5, initialY: 10, width: 350, height: 250, rotateY: -12, rotateX: 8, translateZ: 150, speedX: 0.8, speedY: 0.3, scale: 1 },
  { id: 2, imageUrl: frameImages[1], initialX: 60, initialY: 15, width: 320, height: 220, rotateY: 15, rotateX: 5, translateZ: 250, speedX: -0.6, speedY: 0.4, scale: 1.1 },
  { id: 3, imageUrl: frameImages[2], initialX: 25, initialY: 45, width: 400, height: 280, rotateY: -8, rotateX: 12, translateZ: 350, speedX: 0.5, speedY: -0.3, scale: 1.2 },
  { id: 4, imageUrl: frameImages[3], initialX: -15, initialY: 70, width: 300, height: 200, rotateY: 18, rotateX: -6, translateZ: 450, speedX: -0.7, speedY: 0.2, scale: 0.9 },
  { id: 5, imageUrl: frameImages[4], initialX: 70, initialY: 60, width: 280, height: 190, rotateY: -15, rotateX: 10, translateZ: 550, speedX: 0.4, speedY: -0.5, scale: 1 },
  { id: 6, imageUrl: frameImages[5], initialX: 10, initialY: 85, width: 380, height: 260, rotateY: 10, rotateX: -8, translateZ: 650, speedX: -0.5, speedY: 0.6, scale: 1.15 },
  { id: 7, imageUrl: frameImages[6], initialX: 50, initialY: 5, width: 260, height: 180, rotateY: -20, rotateX: 15, translateZ: 200, speedX: 0.9, speedY: 0.2, scale: 0.95 },
  { id: 8, imageUrl: frameImages[7], initialX: -10, initialY: 35, width: 340, height: 240, rotateY: 22, rotateX: -10, translateZ: 400, speedX: -0.8, speedY: -0.4, scale: 1.05 },
  { id: 9, imageUrl: frameImages[8], initialX: 75, initialY: 40, width: 290, height: 200, rotateY: -18, rotateX: 7, translateZ: 500, speedX: 0.6, speedY: 0.5, scale: 1 },
  { id: 10, imageUrl: frameImages[9], initialX: 35, initialY: 75, width: 310, height: 210, rotateY: 14, rotateX: -12, translateZ: 600, speedX: -0.4, speedY: -0.6, scale: 1.1 }
];

function useSmoothScroll() {
  const scrollYRef = useRef(0);
  const targetScrollRef = useRef(0);
  const isLockedRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isLockedRef.current) return;

      const now = Date.now();
      if (now - lastWheelTimeRef.current < 50) return;

      const sectionHeight = window.innerHeight;
      const currentSection = Math.floor(scrollYRef.current / sectionHeight);
      const sectionProgress = (scrollYRef.current % sectionHeight) / sectionHeight;

      if (e.deltaY > 0 && sectionProgress < 0.95 && scrollYRef.current > 0) {
        isLockedRef.current = true;
        const nextSectionY = (currentSection + 1) * sectionHeight;
        targetScrollRef.current = nextSectionY;

        setTimeout(() => {
          isLockedRef.current = false;
        }, 800);
      } else if (e.deltaY > 0 && sectionProgress >= 0.95) {
        const delta = e.deltaY * 0.5;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current + delta, maxScroll));
      } else {
        const delta = e.deltaY * 0.5;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current + delta, maxScroll));
      }

      lastWheelTimeRef.current = now;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    let animationId: number;

    const animate = () => {
      const diff = targetScrollRef.current - scrollYRef.current;

      if (Math.abs(diff) > 0.5) {
        scrollYRef.current += diff * 0.08;
        window.scrollTo(0, Math.round(scrollYRef.current));
        animationId = requestAnimationFrame(animate);
      } else {
        scrollYRef.current = targetScrollRef.current;
        window.scrollTo(0, Math.round(scrollYRef.current));
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return scrollYRef;
}

function ParallaxBackground({ scrollY }: { scrollY: number }) {
  const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  return (
    <div
      className="fixed inset-0 overflow-hidden -z-10"
      style={{ perspective: '2000px', perspectiveOrigin: '50% 30%' }}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950" />

      {/* Multiple layer backgrounds for depth */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${frameImages[0]})`,
          transform: `translateY(${scrollProgress * -50}px) scale(1.2)`,
          filter: 'blur(40px)'
        }}
      />

      {/* 3D Floating Frames */}
      {frameConfigs.map((frame, index) => {
        const translateX = scrollProgress * 100 * frame.speedX;
        const translateY = scrollProgress * 150 * frame.speedY;
        const currentRotateY = frame.rotateY + scrollProgress * 15 * (index % 2 === 0 ? 1 : -1);
        const currentRotateX = frame.rotateX + scrollProgress * 10;
        const currentTranslateZ = frame.translateZ + scrollProgress * 200;
        const scale = frame.scale + Math.sin(scrollProgress * Math.PI * 2) * 0.05;

        return (
          <div
            key={frame.id}
            className="absolute overflow-hidden"
            style={{
              left: `${frame.initialX}%`,
              top: `${frame.initialY}%`,
              width: `${frame.width}px`,
              height: `${frame.height}px`,
              transform: `translate3d(${translateX}px, ${translateY}px, ${currentTranslateZ}px) rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg) scale(${scale})`,
              transformStyle: 'preserve-3d',
              opacity: 0.85,
              transition: 'transform 0.1s ease-out',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(13, 92, 70, 0.3)',
              borderRadius: '12px',
              border: '4px solid rgba(255,255,255,0.15)'
            }}
          >
            <img
              src={frame.imageUrl}
              alt={`Apartment view ${frame.id}`}
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(0.9) saturate(1.1)'
              }}
            />
            {/* Frame overlay for depth effect */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
              style={{ borderRadius: '8px' }}
            />
          </div>
        );
      })}

      {/* Additional floating particles for extra depth */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (i * 7) % 100;
        const y = (i * 11) % 100;
        const size = 2 + (i % 4);
        const floatY = Math.sin(scrollProgress * Math.PI * 4 + i) * 30;
        const opacity = 0.1 + (i % 3) * 0.05;

        return (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${x}%`,
              top: `${y + floatY}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              transform: `translateZ(${500 + i * 30}px)`,
              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          />
        );
      })}

      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 via-emerald-800/40 to-emerald-900/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
    </div>
  );
}

function Navigation({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = ['Home', 'Tentang', 'Fasilitas', 'Testimoni', 'Kontak'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center shadow-lg">
              <Trees className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className={`font-display text-lg md:text-xl font-bold transition-colors duration-500 ${
              isScrolled ? 'text-emerald-800' : 'text-white'
            }`}>
              TreePark City
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={`font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105 ${
                  isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {link}
              </button>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
            >
              Hubungi Kami
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-4 mt-2">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-emerald-50 rounded-lg"
              >
                {link}
              </button>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-4 py-3 bg-emerald-700 text-white rounded-lg font-medium"
            >
              Hubungi Kami
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function HeroSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="font-elegant text-amber-300 text-sm md:text-base lg:text-lg tracking-[0.22em] uppercase">
            Selamat Datang di
          </p>
        </div>

        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 md:mb-6 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          style={{ transitionDelay: '0.2s', textShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
        >
          Apartment TreePark City
        </h1>

        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8 px-4 leading-relaxed transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          Hunian premium di tengah kebun kota dengan konsep hijau yang berkelanjutan.
          Nikmati kehidupan luxe dalam pelukan alam.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '0.6s' }}
        >
          <button
            onClick={() => onNavigate('units')}
            className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-emerald-800 rounded-full font-bold text-base sm:text-lg hover:bg-emerald-50 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 backdrop-blur-sm"
          >
            Lihat Unit Tersedia
          </button>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-emerald-800 transition-all duration-500 transform hover:scale-105"
          >
            Hubungi Kami
          </a>
        </div>

        <div
          className={`mt-16 md:mt-20 grid grid-cols-3 gap-6 md:gap-12 max-w-lg mx-auto transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.8s' }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{stat.value}</p>
              <p className="text-sm md:text-base text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center pt-3">
          <div className="w-2 h-3 bg-white/80 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tentang" ref={sectionRef} className="py-20 md:py-32 bg-stone-50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-elegant text-emerald-700 text-base md:text-lg mb-3 tracking-[0.15em] uppercase">
            Tentang Kami
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
            Hunian Masa Depan
          </h2>
          <p className="text-gray-600 max-w-xl md:max-w-2xl mx-auto px-4 text-base md:text-lg">
            Mengintegrasikan kehidupan perkotaan dengan keindahan alam dalam sebuah mahakarya arsitektur modern.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10 p-8 md:p-10">
                <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 md:w-9 md:h-9 text-emerald-700" />
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimoni" className="py-20 md:py-32 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 overflow-hidden relative">
      <div className="absolute inset-0">
        {frameImages.slice(0, 3).map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover opacity-10"
            style={{
              backgroundImage: `url(${img})`,
              transform: `translateX(${(i - 1) * 30}%)`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-elegant text-amber-400 text-base md:text-lg mb-3 tracking-[0.15em] uppercase">
            Testimoni
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
            Apa Kata Mereka
          </h2>
          <p className="text-emerald-100/80 max-w-xl mx-auto px-4 text-base md:text-lg">
            Dengarkan pengalaman berharga dari para penghuni setia TreePark City.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl md:rounded-4xl p-8 md:p-12 lg:p-16 shadow-2xl">
                      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        <div className="flex-shrink-0 relative">
                          <div className="absolute inset-0 rounded-full bg-emerald-400/70 blur-3xl" />
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full object-cover border-4 border-emerald-100 shadow-2xl"
                          />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <Quote className="w-10 h-10 md:w-12 md:h-12 text-emerald-200 mb-4 mx-auto md:mx-0" />
                          <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-700 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
                            "{testimonial.text}"
                          </p>
                          <div className="border-t border-gray-100 pt-6">
                            <p className="font-display text-xl md:text-2xl font-bold text-gray-900">
                              {testimonial.name}
                            </p>
                            <p className="text-emerald-600 text-base md:text-lg">{testimonial.role}</p>
                            <p className="text-gray-500 text-sm md:text-base mt-2">
                              Unit: {testimonial.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-500 backdrop-blur-sm border border-white/20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all duration-700 ${
                    index === activeIndex ? 'bg-white w-8 md:w-10' : 'bg-white/40 w-3'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-500 backdrop-blur-sm border border-white/20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const message = `Halo, saya ${name}. Saya tertarik dengan Apartment TreePark City.`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="kontak" className="py-20 md:py-32 bg-stone-50 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-elegant text-emerald-700 text-base md:text-lg mb-3 tracking-[0.15em] uppercase">
            Hubungi Kami
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
            Mulai Perjalanan Anda
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          <div className="bg-white rounded-3xl md:rounded-4xl p-8 md:p-12 lg:p-16 shadow-xl">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Kirim Pesan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Nama</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                  placeholder="Nama lengkap Anda"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                  placeholder="email@contoh.com"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Pesan</label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none text-lg"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 md:py-5 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl md:rounded-4xl p-8 md:p-10 lg:p-12 shadow-xl">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Informasi Kontak
              </h3>
              <div className="space-y-6">
                {[
                  { Icon: MapPin, label: 'Alamat', value: 'Jl. Garden City No. 1, Jakarta Selatan 12345' },
                  { Icon: Phone, label: 'Telepon', value: '+62 812 3456 7890' },
                  { Icon: Mail, label: 'Email', value: 'info@treeparkcity.com' },
                  { Icon: Clock, label: 'Jam Operasional', value: 'Senin - Minggu: 09:00 - 21:00' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-emerald-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-base md:text-lg">{label}</p>
                      <p className="text-gray-600 text-base md:text-lg">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  const scrollToSection = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Trees className="w-7 h-7 text-emerald-300" />
              </div>
              <span className="font-display text-xl md:text-2xl font-bold">TreePark City</span>
            </div>
            <p className="text-emerald-100/80 max-w-md leading-relaxed text-base md:text-lg">
              Hunian premium yang mengintegrasikan kehidupan perkotaan dengan keindahan alam dalam sebuah mahakarya arsitektur modern dan berkelanjutan.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg md:text-xl font-bold mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {['Home', 'Tentang', 'Fasilitas', 'Testimoni', 'Kontak'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="text-emerald-100/80 hover:text-white transition-colors text-base md:text-lg text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg md:text-xl font-bold mb-6">Kontak</h4>
            <ul className="space-y-3 text-emerald-100/80 text-base md:text-lg">
              <li>+62 812 3456 7890</li>
              <li>info@treeparkcity.com</li>
              <li>Jl. Garden City No. 1</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-emerald-800 pt-8 text-center">
          <p className="text-emerald-100/60 text-base">
            &copy; 2024 Apartment TreePark City. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group"
      aria-label="Chat WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-40" />
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-30" />
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-700 group-hover:bg-green-600">
          <svg
            className="w-7 h-7 md:w-8 md:h-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.941 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-full right-0 mb-3 px-4 py-3 bg-gray-900 text-white text-sm rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-xl">
        Chat WhatsApp
      </div>
    </a>
  );
}

// Units Page Component - Enhanced
function UnitsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryIndices, setGalleryIndices] = useState<Record<number, number>>({});

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleInterested = (unit: Unit) => {
    const message = `Halo, saya tertarik dengan unit ${unit.name} (${unit.type}) berukuran ${unit.size} dengan harga ${unit.price}. Mohon informasi lebih lanjut.`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-emerald-900 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0">
          {frameImages.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${img})`,
                opacity: 0.4,
                transform: `translateX(${i * 25}%) scale(1.2)`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 to-emerald-800/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12 md:py-8 md:pb-16">
          <button
            onClick={() => onNavigate('home')}
            className="mb-8 md:mb-12 flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-elegant text-amber-400 text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase mb-2 md:mb-3">
              Pilihan Hunian Premium
            </p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
              Daftar Unit Tersedia
            </h1>
            <p className="text-emerald-100/80 max-w-xl text-sm md:text-base">
              Pilih unit yang sesuai dengan kebutuhan dan gaya hidup Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {units.map((unit, index) => (
            <div
              key={unit.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 group ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image with Gallery */}
              <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={unit.gallery[galleryIndices[unit.id] || 0]}
                  alt={unit.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                {/* Type Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 sm:px-4 sm:py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
                  <span className="text-xs sm:text-sm font-bold text-emerald-800">{unit.type}</span>
                </div>

                {/* Available */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-white">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium">{unit.available} unit</span>
                </div>

                {/* Gallery Navigation */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 px-4">
                  {unit.gallery.map((_, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryIndices(prev => ({ ...prev, [unit.id]: imgIdx }));
                      }}
                      className={`w-5 h-2 sm:w-6 sm:h-2.5 rounded-full transition-all duration-300 ${
                        (galleryIndices[unit.id] || 0) === imgIdx ? 'bg-white w-6 sm:w-8' : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`View image ${imgIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">
                      {unit.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-xs sm:text-sm">
                      <span className="flex items-center gap-1">
                        <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Lantai {unit.floor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {unit.view}
                      </span>
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700 whitespace-nowrap">
                    {unit.price}
                  </p>
                </div>

                {/* Specs */}
                <div className="flex items-center justify-between gap-2 mb-4 py-3 border-y border-gray-100">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
                    <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    <span className="font-semibold text-sm sm:text-base">{unit.bedrooms}</span>
                    <span className="text-gray-500 text-xs sm:text-sm hidden sm:inline">Kamar Tidur</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
                    <Bath className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    <span className="font-semibold text-sm sm:text-base">{unit.bathrooms}</span>
                    <span className="text-gray-500 text-xs sm:text-sm hidden sm:inline">Kamar Mandi</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    <span className="font-semibold text-sm sm:text-base">{unit.size}</span>
                  </div>
                </div>

                {/* Facilities */}
                <div className="mb-5">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 sm:mb-3">Fasilitas:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {unit.facilities.slice(0, 4).map((facility) => (
                      <span
                        key={facility}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-emerald-50 text-emerald-700 text-xs sm:text-sm rounded-full font-medium"
                      >
                        {facility}
                      </span>
                    ))}
                    {unit.facilities.length > 4 && (
                      <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 text-gray-600 text-xs sm:text-sm rounded-full font-medium">
                        +{unit.facilities.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleInterested(unit)}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white rounded-xl font-bold text-sm sm:text-base md:text-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group/btn"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-125 transition-transform" />
                  <span>Tanya Sekarang</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities Section */}
      <div className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-elegant text-emerald-700 text-sm md:text-lg mb-3 tracking-[0.15em] uppercase">
              Mengapa TreePark City?
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Fasilitas Premium
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-8">
            {[
              { icon: Waves, title: 'Infinity Pool', desc: '320m²' },
              { icon: Dumbbell, title: 'Gym Center', desc: '500m²' },
              { icon: Wifi, title: 'Smart WiFi', desc: '1 Gbps' },
              { icon: Shield, title: 'Security', desc: '24/7' },
              { icon: Car, title: 'Parking', desc: '200 slot' },
              { icon: Trees, title: 'Garden', desc: '5 Ha' },
            ].map((facility) => (
              <div
                key={facility.title}
                className="bg-stone-50 rounded-2xl md:rounded-3xl p-5 md:p-7 text-center hover:bg-emerald-50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                  <facility.icon className="w-7 h-7 md:w-8 md:h-8 text-emerald-600" />
                </div>
                <p className="font-bold text-gray-900 text-base md:text-lg mb-1">{facility.title}</p>
                <p className="text-emerald-600 font-medium text-sm md:text-base">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const scrollYRef = useSmoothScroll();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollY(scrollYRef.current);
    }, 16);
    return () => clearInterval(interval);
  }, [scrollYRef]);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen">
      {currentPage === 'home' && (
        <>
          <ParallaxBackground scrollY={scrollY} />
          <Navigation onNavigate={handleNavigate} />
          <HeroSection onNavigate={handleNavigate} />
          <FeaturesSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer onNavigate={handleNavigate} />
          <WhatsAppButton />
        </>
      )}

      {currentPage === 'units' && (
        <UnitsPage onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;