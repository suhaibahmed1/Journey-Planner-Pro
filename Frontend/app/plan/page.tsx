'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { 
  CalendarIcon, 
  MapPin, 
  Users, 
  DollarSign, 
  Clock, 
  Star, 
  Send, 
  CheckCircle,
  Plane,
  Mountain,
  Globe,
  Heart,
  Camera,
  Compass,
  TreePine,
  Building,
  Utensils,
  Car
} from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

function getDurationText(start: Date, end: Date): string {
  const diffTime = end.getTime() - start.getTime()
  if (diffTime <= 0) return 'Invalid date range'
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const months = Math.floor(diffDays / 30)
  const days = diffDays % 30
  if (months > 0 && days > 0) return `${months} month${months > 1 ? 's' : ''} ${days} day${days > 1 ? 's' : ''}`
  if (months > 0) return `${months} month${months > 1 ? 's' : ''}`
  return `${days} day${days > 1 ? 's' : ''}`
}

export default function PlanPage() {
  const [formData, setFormData] = useState({
    destination: '',
    budget: [100000],
    travelers: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    accommodation: '',
    activities: [] as string[],
    specialRequests: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

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

  const activityOptions = [
    { id: 'sightseeing', label: 'Sightseeing', icon: Camera },
    { id: 'adventure', label: 'Adventure Sports', icon: Mountain },
    { id: 'culture', label: 'Cultural Tours', icon: Globe },
    { id: 'nature', label: 'Nature & Wildlife', icon: TreePine },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'relaxation', label: 'Relaxation & Spa', icon: Heart },
    { id: 'food', label: 'Food Tours', icon: Utensils },
    { id: 'shopping', label: 'Shopping', icon: Building },
  ]

  useEffect(() => {
    // Comment out localStorage check for now - you can uncomment when implementing auth
    // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    // if (!isLoggedIn) {
    //   localStorage.setItem('redirectAfterLogin', '/plan')
    //   router.push('/login')
    // }
  }, [router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required'
    if (!formData.travelers) newErrors.travelers = 'Number of travelers is required'
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.contactInfo.name.trim()) newErrors.name = 'Name is required'
    if (!formData.contactInfo.email.trim()) newErrors.email = 'Email is required'
    if (!formData.contactInfo.phone.trim()) newErrors.phone = 'Phone number is required'
    
    // Email validation
    if (formData.contactInfo.email && !/\S+@\S+\.\S+/.test(formData.contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const toggleActivity = (activityId: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(id => id !== activityId)
        : [...prev.activities, activityId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const response = await fetch('http://localhost:5000/api/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const result = await response.json()
        
        if (response.ok) {
          toast({
            title: 'Plan Submitted Successfully!',
            description: "We'll contact you within 24 hours with a customized itinerary.",
          })
          // Reset form
          setFormData({
            destination: '',
            budget: [100000],
            travelers: '',
            startDate: undefined,
            endDate: undefined,
            accommodation: '',
            activities: [],
            specialRequests: '',
            contactInfo: { name: '', email: '', phone: '' }
          })
          setErrors({})
        } else {
          toast({
            title: 'Error submitting the plan',
            description: result.error || 'Something went wrong. Try again.',
            variant: 'destructive',
          })
        }
      } catch (error) {
        toast({
          title: 'Network error',
          description: 'Unable to submit the plan. Try again later.',
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      toast({
        title: 'Please fill in all required fields',
        description: 'Check the form for any missing information.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-medium mb-4">
                ✨ Custom Travel Planning
              </Badge>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Make Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Own Plan
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Create a personalized travel experience tailored to your preferences, budget, and schedule
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Star className="h-5 w-5 text-yellow-300" />
                <span>Expert Planning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Clock className="h-5 w-5 text-blue-300" />
                <span>24hr Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="text-center pb-8 bg-gradient-to-r from-teal-50 to-emerald-50">
                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Plan Your Dream Trip
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Fill out the form below and our travel experts will create a customized itinerary just for you
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-8"
                  >
                    {/* Contact Information */}
                    <motion.div variants={fadeInUp} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-teal-600" />
                        Contact Information
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.contactInfo.name}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              contactInfo: { ...formData.contactInfo, name: e.target.value }
                            })}
                            className={`${errors.name ? 'border-red-500' : ''}`}
                          />
                          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.contactInfo.email}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              contactInfo: { ...formData.contactInfo, email: e.target.value }
                            })}
                            className={`${errors.email ? 'border-red-500' : ''}`}
                          />
                          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold">
                            Phone *
                          </Label>
                          <Input
                            id="phone"
                            placeholder="+92 300 1234567"
                            value={formData.contactInfo.phone}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              contactInfo: { ...formData.contactInfo, phone: e.target.value }
                            })}
                            className={`${errors.phone ? 'border-red-500' : ''}`}
                          />
                          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                      </div>
                    </motion.div>

                    {/* Destination */}
                    <motion.div variants={fadeInUp} className="space-y-3">
                      <Label htmlFor="destination" className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-teal-600" />
                        Destination *
                      </Label>
                      <Input
                        id="destination"
                        placeholder="Where would you like to go? (e.g., Northern Pakistan, Switzerland, Dubai)"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className={`text-lg py-3 ${errors.destination ? 'border-red-500' : ''}`}
                      />
                      {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
                    </motion.div>

                    {/* Budget */}
                    <motion.div variants={fadeInUp} className="space-y-4">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-teal-600" />
                        Budget Range (PKR)
                      </Label>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <Slider
                          value={formData.budget}
                          onValueChange={(value) => setFormData({ ...formData, budget: value })}
                          max={1000000}
                          min={20000}
                          step={10000}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-3">
                          <span>PKR 20,000</span>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-teal-600">
                              PKR {formData.budget[0].toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">per person</div>
                          </div>
                          <span>PKR 1,000,000+</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Travelers and Dates Row */}
                    <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6">
                      {/* Travelers */}
                      <div className="space-y-3">
                        <Label htmlFor="travelers" className="text-lg font-semibold flex items-center gap-2">
                          <Users className="h-5 w-5 text-teal-600" />
                          Travelers *
                        </Label>
                        <Select 
                          value={formData.travelers} 
                          onValueChange={(value) => setFormData({ ...formData, travelers: value })}
                        >
                          <SelectTrigger className={`text-lg py-3 ${errors.travelers ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select travelers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Person</SelectItem>
                            <SelectItem value="2">2 People</SelectItem>
                            <SelectItem value="3-4">3-4 People</SelectItem>
                            <SelectItem value="5-8">5-8 People</SelectItem>
                            <SelectItem value="9+">9+ People (Group)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.travelers && <p className="text-red-500 text-sm">{errors.travelers}</p>}
                      </div>

                      {/* Start Date */}
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-teal-600" />
                          Start Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal py-3 ${
                                !formData.startDate ? "text-muted-foreground" : ""
                              } ${errors.startDate ? 'border-red-500' : ''}`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.startDate ? format(formData.startDate, "PPP") : "Pick start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.startDate}
                              onSelect={(date) => setFormData({ ...formData, startDate: date })}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                      </div>

                      {/* End Date */}
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <Clock className="h-5 w-5 text-teal-600" />
                          End Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal py-3"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.endDate ? format(formData.endDate, "PPP") : "Pick end date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.endDate}
                              onSelect={(date) => setFormData({ ...formData, endDate: date })}
                              initialFocus
                              disabled={(date) => {
                                if (formData.startDate) {
                                  return date < new Date() || date < formData.startDate
                                }
                                return date < new Date()
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {formData.startDate && formData.endDate && (
                          <p className="text-sm text-teal-600 font-medium">
                            Duration: {getDurationText(formData.startDate, formData.endDate)}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Accommodation */}
                    <motion.div variants={fadeInUp} className="space-y-3">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Building className="h-5 w-5 text-teal-600" />
                        Accommodation Preference
                      </Label>
                      <Select 
                        value={formData.accommodation} 
                        onValueChange={(value) => setFormData({ ...formData, accommodation: value })}
                      >
                        <SelectTrigger className="text-lg py-3">
                          <SelectValue placeholder="Select accommodation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget Hotels/Hostels</SelectItem>
                          <SelectItem value="mid-range">Mid-range Hotels</SelectItem>
                          <SelectItem value="luxury">Luxury Hotels/Resorts</SelectItem>
                          <SelectItem value="mixed">Mix of Different Types</SelectItem>
                          <SelectItem value="no-preference">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Activities */}
                    <motion.div variants={fadeInUp} className="space-y-4">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Compass className="h-5 w-5 text-teal-600" />
                        Preferred Activities
                      </Label>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <p className="text-sm text-gray-600 mb-4">Select all activities that interest you:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {activityOptions.map((activity) => {
                            const IconComponent = activity.icon
                            const isSelected = formData.activities.includes(activity.id)
                            return (
                              <button
                                key={activity.id}
                                type="button"
                                onClick={() => toggleActivity(activity.id)}
                                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium flex flex-col items-center gap-2 ${
                                  isSelected 
                                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-teal-200 hover:bg-teal-50'
                                }`}
                              >
                                <IconComponent className="h-5 w-5" />
                                <span className="text-xs text-center">{activity.label}</span>
                              </button>
                            )
                          })}
                        </div>
                        {formData.activities.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Selected activities:</p>
                            <div className="flex flex-wrap gap-2">
                              {formData.activities.map((activityId) => {
                                const activity = activityOptions.find(a => a.id === activityId)
                                return (
                                  <Badge key={activityId} className="bg-teal-100 text-teal-800">
                                    {activity?.label}
                                  </Badge>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Special Requests */}
                    <motion.div variants={fadeInUp} className="space-y-3">
                      <Label htmlFor="specialRequests" className="text-lg font-semibold flex items-center gap-2">
                        <Star className="h-5 w-5 text-teal-600" />
                        Special Requests & Additional Information
                      </Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any dietary restrictions, accessibility needs, special occasions, or other preferences..."
                        rows={4}
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="resize-none"
                      />
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
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit My Plan
                            <Send className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                      <p className="text-center text-sm text-gray-500 mt-3">
                        We'll review your request and contact you within 24 hours with a detailed itinerary
                      </p>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Custom Planning?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a personalized travel experience designed just for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Star,
                title: "Personalized Experience",
                description: "Every detail tailored to your preferences and interests"
              },
              {
                icon: CheckCircle,
                title: "Expert Planning",
                description: "Professional travel consultants with local knowledge"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Continuous support before, during, and after your trip"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}