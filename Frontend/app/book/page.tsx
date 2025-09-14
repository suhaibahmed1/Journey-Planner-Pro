'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  Users,
  CheckCircle, 
  Send, 
  Mountain, 
  Plane, 
  Globe,
  Star,
  Clock,
  ArrowRight
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const pakistanTours = [
  { id: 1, name: 'Hunza Valley Explorer', duration: '5 Days', price: 'PKR 35,000', rating: 4.8 },
  { id: 2, name: 'Skardu Adventure', duration: '6 Days', price: 'PKR 42,000', rating: 4.9 },
  { id: 3, name: 'Naran Kaghan Valley', duration: '4 Days', price: 'PKR 28,000', rating: 4.7 },
  { id: 4, name: 'Swat Valley Paradise', duration: '3 Days', price: 'PKR 22,000', rating: 4.6 },
  { id: 5, name: 'Fairy Meadows Trek', duration: '7 Days', price: 'PKR 55,000', rating: 4.9 },
  { id: 6, name: 'Neelum Valley Getaway', duration: '5 Days', price: 'PKR 38,000', rating: 4.8 },
]

const internationalTours = [
  { id: 7, name: 'Umrah Package Premium', duration: '10 Days', price: 'PKR 180,000', rating: 4.8 },
  { id: 8, name: 'Hajj Package Deluxe', duration: '15 Days', price: 'PKR 350,000', rating: 4.9 },
  { id: 9, name: 'Switzerland Alpine Tour', duration: '7 Days', price: 'PKR 400,000', rating: 4.9 },
  { id: 10, name: 'Italy Cultural Experience', duration: '8 Days', price: 'PKR 320,000', rating: 4.7 },
  { id: 11, name: 'Malaysia Singapore Delight', duration: '6 Days', price: 'PKR 120,000', rating: 4.6 },
  { id: 12, name: 'Vietnam Adventure', duration: '7 Days', price: 'PKR 95,000', rating: 4.8 },
]

export default function BookPage() {
  const [category, setCategory] = useState<'' | 'pak' | 'intl'>('')
  const [selectedTour, setSelectedTour] = useState<string>('')
  const [selectedTourDetails, setSelectedTourDetails] = useState<any>(null)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const params = useSearchParams()
  const { toast } = useToast()

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  useEffect(() => {
    const tourId = params.get('tour')
    if (tourId) {
      const allTours = [...pakistanTours, ...internationalTours]
      const found = allTours.find(t => t.id.toString() === tourId)
      if (found) {
        setSelectedTour(found.name)
        setSelectedTourDetails(found)
        setCategory(pakistanTours.some(t => t.id.toString() === tourId) ? 'pak' : 'intl')
      }
    }
  }, [params])

  const validate = () => {
    const errs: { [key: string]: string } = {}
    const phoneRegex = /^(\+92|92|0)?[0-9]{10}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name.trim()) errs.name = 'Name is required'
    else if (name.trim().length < 2) errs.name = 'Name must be at least 2 characters'

    if (!email.trim()) errs.email = 'Email is required'
    else if (!emailRegex.test(email)) errs.email = 'Please enter a valid email address'

    if (!phone.trim()) errs.phone = 'Phone number is required'
    else if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid Pakistani phone number'
    }

    if (!category) errs.category = 'Please select a tour category'
    if (!selectedTour) errs.tour = 'Please select a tour package'

    return errs
  }

  const handleTourSelection = (tourName: string) => {
    setSelectedTour(tourName)
    const allTours = [...pakistanTours, ...internationalTours]
    const tourDetails = allTours.find(t => t.name === tourName)
    setSelectedTourDetails(tourDetails)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formErrors = validate()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)
      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: name.trim(), 
            email: email.toLowerCase().trim(), 
            phone: phone.trim(), 
            category, 
            selectedTour,
            tourDetails: selectedTourDetails
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setSubmitted(true)
          toast({
            title: 'Booking Request Submitted!',
            description: 'Thank you for your interest. We\'ll contact you within 24 hours to confirm your booking.',
          })
          // Reset form
          setName('')
          setEmail('')
          setPhone('')
          setCategory('')
          setSelectedTour('')
          setSelectedTourDetails(null)
        } else {
          toast({
            title: 'Booking Failed',
            description: data.error || 'Something went wrong while processing your booking.',
            variant: 'destructive',
          })
        }
      } catch (error) {
        console.error(error)
        toast({
          title: 'Connection Error',
          description: 'Unable to submit booking. Please check your connection and try again.',
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      toast({
        title: 'Please Complete the Form',
        description: 'Fill out all required fields with valid information.',
        variant: 'destructive',
      })
    }
  }

  const filteredTours = category === 'pak' ? pakistanTours : category === 'intl' ? internationalTours : []

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <Card className="text-center shadow-xl border-0">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h2>
              <p className="text-gray-600 mb-6">
                We've received your booking request and will contact you within 24 hours to confirm the details.
              </p>
              <Button 
                onClick={() => setSubmitted(false)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Book Another Tour
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-medium mb-4">
              Easy Booking Process
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Book Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            
            <p className="text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
              Choose from our carefully curated tour packages and let us create an unforgettable experience for you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Complete Your Booking
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Fill in your details below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-6"
                  >
                    {/* Tour Selection */}
                    <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <Globe className="h-5 w-5 text-teal-600" />
                          Tour Category *
                        </Label>
                        <Select 
                          value={category} 
                          onValueChange={(value: 'pak' | 'intl') => {
                            setCategory(value)
                            setSelectedTour('')
                            setSelectedTourDetails(null)
                          }}
                        >
                          <SelectTrigger className={`text-lg py-3 ${errors.category ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Choose Pakistan or International" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pak">
                              <div className="flex items-center gap-2">
                                <Mountain className="h-4 w-4" />
                                Pakistan Tours
                              </div>
                            </SelectItem>
                            <SelectItem value="intl">
                              <div className="flex items-center gap-2">
                                <Plane className="h-4 w-4" />
                                International Tours
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                      </div>

                      {category && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-3"
                        >
                          <Label className="text-lg font-semibold flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-teal-600" />
                            Select Tour Package *
                          </Label>
                          <Select value={selectedTour} onValueChange={handleTourSelection}>
                            <SelectTrigger className={`text-lg py-3 ${errors.tour ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder="Choose your tour package" />
                            </SelectTrigger>
                            <SelectContent>
                              {filteredTours.map(tour => (
                                <SelectItem key={tour.id} value={tour.name}>
                                  <div className="flex justify-between items-center w-full">
                                    <span>{tour.name}</span>
                                    <Badge variant="secondary" className="ml-2">
                                      {tour.price}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.tour && <p className="text-red-500 text-sm">{errors.tour}</p>}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Selected Tour Details */}
                    <AnimatePresence>
                      {selectedTourDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-6 border-2 border-teal-100"
                        >
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Selected Tour Details
                          </h3>
                          <div className="grid md:grid-cols-4 gap-4 text-center">
                            <div className="bg-white rounded-lg p-3">
                              <div className="text-2xl font-bold text-teal-600">{selectedTourDetails.price}</div>
                              <div className="text-sm text-gray-600">Price per person</div>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <div className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-1">
                                <Calendar className="h-5 w-5" />
                                {selectedTourDetails.duration}
                              </div>
                              <div className="text-sm text-gray-600">Duration</div>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                                <Star className="h-5 w-5" />
                                {selectedTourDetails.rating}
                              </div>
                              <div className="text-sm text-gray-600">Rating</div>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                                <CheckCircle className="h-5 w-5" />
                                24hr
                              </div>
                              <div className="text-sm text-gray-600">Response</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Contact Information */}
                    <motion.div variants={fadeInUp} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5 text-teal-600" />
                        Your Contact Information
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className={`${errors.name ? 'border-red-500' : ''}`}
                          />
                          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={`${errors.email ? 'border-red-500' : ''}`}
                          />
                          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="03001234567"
                            className={`${errors.phone ? 'border-red-500' : ''}`}
                          />
                          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={fadeInUp} className="pt-6">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-4 text-lg font-semibold group"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing Booking...
                          </>
                        ) : (
                          <>
                            Confirm Booking Request
                            <Send className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                      <p className="text-center text-sm text-gray-500 mt-3">
                        We'll review your request and contact you within 24 hours to confirm your booking
                      </p>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Secure Booking</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-medium">24hr Response</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="font-medium">500+ Happy Customers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}