"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Star, Calendar, Users, Search, Filter, Heart, Clock, DollarSign, Globe, Mountain, Plane, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Trip {
  _id: string
  title: string
  location: string
  price: string
  duration: string
  groupSize: string
  rating: number
  image: string
  description: string
  highlights: string[]
  category?: "pakistan" | "international"
  difficulty?: "Easy" | "Moderate" | "Challenging"
  bestTime?: string
  includes?: string[]
  priceRange?: "budget" | "mid-range" | "luxury"
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.02, y: -8 },
  whileTap: { scale: 0.98 }
}

export default function ToursPage() {
  const router = useRouter()
  const [pakistanTours, setPakistanTours] = useState<Trip[]>([])
  const [internationalTours, setInternationalTours] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | "pakistan" | "international">("all")
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating" | "duration">("rating")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("http://localhost:5000/api/trips")
        const data = await res.json()

        const pakistanToursData = data.filter((trip: Trip) => trip.category === "pakistan")
        const internationalToursData = data.filter((trip: Trip) => trip.category === "international")

        setPakistanTours(pakistanToursData)
        setInternationalTours(internationalToursData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const toggleFavorite = (tourId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(tourId)) {
        newFavorites.delete(tourId)
      } else {
        newFavorites.add(tourId)
      }
      return newFavorites
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800'
      case 'Challenging': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filterAndSortTours = (tours: Trip[]) => {
    let filtered = tours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'price':
          return parseFloat(a.price.replace(/[^0-9]/g, '')) - parseFloat(b.price.replace(/[^0-9]/g, ''))
        case 'rating':
          return b.rating - a.rating
        case 'duration':
          return parseFloat(a.duration) - parseFloat(b.duration)
        default:
          return 0
      }
    })
  }

  const allTours = [...pakistanTours, ...internationalTours]
  const filteredTours = selectedCategory === "all" ? allTours :
                       selectedCategory === "pakistan" ? pakistanTours : internationalTours
  const displayTours = filterAndSortTours(filteredTours)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing tours...</p>
        </div>
      </div>
    )
  }

  const TourCard = ({ tour }: { tour: Trip }) => (
    <motion.div
      variants={fadeInUp}
      {...scaleOnHover}
      className="group"
    >
      <Card className="flex flex-col h-full overflow-hidden shadow-lg border-0 group-hover:shadow-2xl transition-all duration-500 bg-white">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Rating badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{tour.rating}</span>
          </div>
          
          {/* Category badge */}
          <Badge className={`absolute top-4 left-4 shadow-lg ${
            tour.category === 'pakistan' ? 'bg-emerald-600' : 'bg-blue-600'
          }`}>
            {tour.category === 'pakistan' ? (
              <><Mountain className="h-3 w-3 mr-1" />Pakistan North</>
            ) : (
              <><Plane className="h-3 w-3 mr-1" />International</>
            )}
          </Badge>
          
          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(tour._id)}
            className="absolute top-4 right-16 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${favorites.has(tour._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>

          {/* Difficulty badge */}
          {tour.difficulty && (
            <Badge className={`absolute bottom-4 left-4 ${getDifficultyColor(tour.difficulty)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
              {tour.difficulty}
            </Badge>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Best: {tour.bestTime || 'Year Round'}</span>
              </div>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4 mb-2">
            <CardTitle className="text-xl font-bold text-gray-900 leading-tight flex-1 group-hover:text-teal-600 transition-colors duration-300">
              {tour.title}
            </CardTitle>
            <div className="text-right">
              <span className="text-2xl font-bold text-emerald-600">{tour.price}</span>
              <div className="text-xs text-gray-500">per person</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4 text-teal-600" />
            <span className="font-medium">{tour.location}</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-purple-500" />
              <span>{tour.groupSize}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1">
          <CardDescription className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {tour.description}
          </CardDescription>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Highlights:
            </h4>
            <div className="flex flex-wrap gap-2">
              {tour.highlights.slice(0, 4).map((highlight: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors">
                  {highlight}
                </Badge>
              ))}
              {tour.highlights.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  +{tour.highlights.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {tour.includes && tour.includes.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">What's Included:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                {tour.includes.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-auto pt-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Starting from</span>
              <span className="font-medium">Free cancellation</span>
            </div>
            
            <div className="flex gap-2">
              <Link href={`/book?tour=${tour._id}`} className="flex-1">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-600 transition-all duration-300">
                  Book Now
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="px-3 hover:bg-teal-50 hover:border-teal-200">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
                {allTours.length}+ Handpicked Tours
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Tour{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Packages
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our carefully curated tour packages for unforgettable adventures in Pakistan and around the world
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Globe className="h-5 w-5 text-blue-300" />
                <span>50+ Destinations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Users className="h-5 w-5 text-green-300" />
                <span>Expert Guides</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Star className="h-5 w-5 text-yellow-300" />
                <span>5-Star Rated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Search and Filter Section */}
      <section className="py-12 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Tours</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by destination, tour name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="all">All Tours</option>
                    <option value="pakistan">Pakistan North</option>
                    <option value="international">International</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A-Z</option>
                    <option value="price">Price Low-High</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>
              </div>

              {/* Results summary */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-teal-600">{displayTours.length}</span> tours
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {displayTours.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${searchTerm}-${sortBy}`}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {displayTours.map((tour) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
              >
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No tours found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or explore our featured destinations.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Reset Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-teal-100 mb-8">
              Let our travel experts create a custom tour package just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push("/plan")}
                className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Custom Tour
              </Button>
              <Button 
                onClick={() => router.push("/contact")}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-teal-600 font-semibold px-8 py-3"
              >
                Contact Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}