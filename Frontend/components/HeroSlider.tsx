'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  MapPin, 
  Star, 
  Calendar,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const slides = [
  { 
    id: 1, 
    src: '/Makkah.jpg', 
    alt: 'Holy Kaaba, Makkah - Saudi Arabia',
    title: 'Sacred Journey to Makkah',
    subtitle: 'Experience the spiritual heart of Islam',
    description: 'Join millions of pilgrims in the holiest city with our premium Umrah packages',
    category: 'Religious Tours',
    price: 'From PKR 180,000',
    rating: 4.9,
    cta: 'Book Umrah Package'
  },
  { 
    id: 2, 
    src: '/Madina.jpg', 
    alt: 'Masjid an-Nabawi, Madina - Saudi Arabia',
    title: 'City Of The Prophet',
    subtitle: 'Visit the Prophet\'s Mosque in Madina',
    description: 'Complete your spiritual journey with guided tours of the blessed city',
    category: 'Religious Tours',
    price: 'From PKR 200,000',
    rating: 4.9,
    cta: 'Explore Hajj Packages'
  },
  { 
    id: 3, 
    src: '/k.jpg', 
    alt: 'Kumrat Valley - Pakistan',
    title: 'Kumrat Valley Paradise',
    subtitle: 'Discover Pakistan\'s hidden gem',
    description: 'Experience pristine forests, crystal-clear rivers, and breathtaking mountain views',
    category: 'Pakistan Tours',
    price: 'From PKR 35,000',
    rating: 4.8,
    cta: 'Explore Northern Areas'
  },
  { 
    id: 4, 
    src: '/Italyrome.jpg', 
    alt: 'Colosseum, Rome - Italy',
    title: 'Ancient Rome Awaits',
    subtitle: 'Walk through 2000 years of history',
    description: 'Explore the Eternal City with expert guides and exclusive access tours',
    category: 'International Tours',
    price: 'From PKR 320,000',
    rating: 4.7,
    cta: 'Discover Europe'
  },
  { 
    id: 5, 
    src: '/Malay.jpg', 
    alt: 'Petronas Towers - Kuala Lumpur, Malaysia',
    title: 'Malaysia Truly Asia',
    subtitle: 'Modern marvels meet ancient traditions',
    description: 'Experience the perfect blend of cultures in Southeast Asia\'s gem',
    category: 'International Tours',
    price: 'From PKR 120,000',
    rating: 4.6,
    cta: 'Book Malaysia Tour'
  },
  { 
    id: 6, 
    src: '/EifTower.jpg', 
    alt: 'Eiffel Tower - Paris, France',
    title: 'Paris, City of Light',
    subtitle: 'Romance and elegance in every corner',
    description: 'Fall in love with the world\'s most romantic city and its timeless charm',
    category: 'International Tours',
    price: 'From PKR 450,000',
    rating: 4.8,
    cta: 'Experience Paris'
  },
  { 
    id: 7, 
    src: '/arora.jpg', 
    alt: 'Northern Lights - Aurora Borealis',
    title: 'Chase the Northern Lights',
    subtitle: 'Nature\'s most spectacular light show',
    description: 'Witness the magical Aurora Borealis in the pristine Arctic wilderness',
    category: 'Adventure Tours',
    price: 'From PKR 650,000',
    rating: 5.0,
    cta: 'Book Arctic Adventure'
  },
]

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [swiper, setSwiper] = useState<any>(null)
  const router = useRouter()

  const handleCTA = (slideId: number) => {
    // Route based on slide category
    const slide = slides.find(s => s.id === slideId)
    if (slide?.category === 'Religious Tours') {
      router.push('/tours?category=religious')
    } else if (slide?.category === 'Pakistan Tours') {
      router.push('/tours?category=pak')
    } else {
      router.push('/tours?category=intl')
    }
  }

  const toggleAutoplay = () => {
    if (swiper) {
      if (isPlaying) {
        swiper.autoplay.stop()
      } else {
        swiper.autoplay.start()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const goToSlide = (index: number) => {
    if (swiper) {
      swiper.slideTo(index)
    }
  }

  const nextSlide = () => {
    if (swiper) {
      swiper.slideNext()
    }
  }

  const prevSlide = () => {
    if (swiper) {
      swiper.slidePrev()
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop
        effect="fade"
        speed={1000}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="w-full h-full"
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !w-8',
          bulletElement: 'div'
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index < 3}
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      {activeSlide === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="space-y-6"
                        >
                          {/* Category Badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            <Badge className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm font-medium">
                              {slide.category}
                            </Badge>
                          </motion.div>

                          {/* Title */}
                          <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                          >
                            {slide.title}
                          </motion.h1>

                          {/* Subtitle */}
                          <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl md:text-2xl text-gray-200 font-light"
                          >
                            {slide.subtitle}
                          </motion.p>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-lg text-gray-300 max-w-2xl leading-relaxed"
                          >
                            {slide.description}
                          </motion.p>

                          {/* Stats */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-6 items-center"
                          >
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                              <span className="text-white font-medium">{slide.rating}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                              <MapPin className="h-5 w-5 text-teal-400" />
                              <span className="font-medium">{slide.price}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                              <Calendar className="h-5 w-5 text-emerald-400" />
                              <span>Available Year Round</span>
                            </div>
                          </motion.div>

                          {/* CTA Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="pt-4"
                          >
                            <Button
                              onClick={() => handleCTA(slide.id)}
                              size="lg"
                              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold group shadow-2xl"
                            >
                              {slide.cta}
                              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <Button
          onClick={prevSlide}
          size="sm"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 p-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <Button
          onClick={nextSlide}
          size="sm"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 p-0"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Slide Counter & Controls */}
      <div className="absolute bottom-8 left-4 md:left-8 flex items-center gap-4 z-10">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white text-sm">
            {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
        
        <Button
          onClick={toggleAutoplay}
          size="sm"
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 p-0"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      {/* Slide Thumbnails */}
      <div className="absolute bottom-8 right-4 md:right-8 z-10">
        <div className="flex flex-col gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                activeSlide === index 
                  ? 'border-teal-400 scale-110' 
                  : 'border-white/30 hover:border-white/60'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={64}
                height={48}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        <div 
          className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-100"
          style={{ 
            width: `${((activeSlide + 1) / slides.length) * 100}%` 
          }}
        ></div>
      </div>
    </div>
  )
}