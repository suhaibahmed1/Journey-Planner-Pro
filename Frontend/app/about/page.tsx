'use client'

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Heart, Globe, Shield, Star, Clock, CheckCircle, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

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
  whileHover: { scale: 1.05, y: -10 },
  whileTap: { scale: 0.95 }
}

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description: "We believe travel transforms lives and creates lasting memories that enrich the soul.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Your safety and satisfaction are our top priorities in every journey we plan.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description: "From local hidden gems to international destinations, we know the world inside out.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "Every traveler is unique, and we craft experiences tailored to your dreams and preferences.",
    color: "from-purple-500 to-indigo-500"
  },
]

const team = [
  {
    name: "Suhaib Ahmed",
    role: "Founder & CEO",
    image: "/teammem.jpg",
    description: "5+ years in travel industry with expertise in Pakistan & International tourism",
    specialties: ["Leadership", "Strategy", "International Tours"],
    experience: "5+ Years"
  },
  {
    name: "Muhammad Shayan",
    role: "International Tours Director",
    image: "/teammem.jpg",
    description: "Specialist in European and Middle Eastern destinations with cultural expertise",
    specialties: ["Europe", "Middle East", "Cultural Tours"],
    experience: "4+ Years"
  },
  {
    name: "Huzaifa Sabeeh",
    role: "Adventure Tours Manager",
    image: "/teammem.jpg",
    description: "Expert mountaineer and trekking guide for Northern Pakistan's challenging terrains",
    specialties: ["Mountaineering", "Trekking", "Adventure"],
    experience: "6+ Years"
  },
  {
    name: "Muhammad Ezaan",
    role: "Travel Consultant",
    image: "/teammem.jpg",
    description: "Dedicated to providing personalized travel advice and exceptional customer service",
    specialties: ["Consultation", "Planning", "Support"],
    experience: "3+ Years"
  },
]

const achievements = [
  {
    number: "500+",
    label: "Happy Travelers",
    description: "Satisfied customers across all destinations"
  },
  {
    number: "50+",
    label: "Destinations",
    description: "Carefully curated travel experiences"
  },
  {
    number: "3+",
    label: "Years Experience",
    description: "Building trust and expertise"
  },
  {
    number: "98%",
    label: "Satisfaction Rate",
    description: "Customer happiness guarantee"
  }
]

const milestones = [
  {
    year: "2022",
    title: "Company Founded",
    description: "Journey Planner Pro was established with a vision to revolutionize travel in Pakistan"
  },
  {
    year: "2023",
    title: "International Expansion",
    description: "Added European and Middle Eastern destinations to our portfolio"
  },
  {
    year: "2024",
    title: "Adventure Tours Launch",
    description: "Introduced specialized adventure and trekking packages for Northern Pakistan"
  },
  {
    year: "2025",
    title: "Digital Innovation",
    description: "Launched our comprehensive online booking platform and mobile experience"
  }
]

function AnimatedCounter({ number, duration = 2000 }: { number: string | number; duration?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-bold mb-2"
    >
      {number}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax Effect */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
                Trusted Travel Partner Since 2022
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Journey Planner Pro
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in creating unforgettable travel experiences across Pakistan and around the world
            </p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Star className="h-5 w-5 text-yellow-300" />
                <span>Award Winning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Trusted by 500+</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Globe className="h-5 w-5 text-blue-300" />
                <span>50+ Destinations</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section with Enhanced Design */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
                  Our Journey
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-xl text-gray-700 font-medium">
                  Founded in 2022, Journey Planner Pro began with a simple mission: to showcase the incredible beauty of
                  Pakistan while connecting travelers to amazing destinations worldwide.
                </p>
                <p>
                  What started as a passion project by a group of travel enthusiasts has grown into a trusted travel
                  company that has helped over 500 travelers create memories that last a lifetime.
                </p>
                <p>
                  We specialize in both domestic tours across Pakistan's stunning northern regions and international
                  packages including spiritual journeys, European adventures, and Southeast Asian explorations.
                </p>
                <p>
                  Our team of experienced travel professionals is dedicated to providing personalized service, ensuring
                  every journey is perfectly tailored to your dreams and preferences.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-teal-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Expert Local Knowledge</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Best Price Guarantee</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur opacity-20"></div>
                <Image
                  src="/About-Img.png"
                  alt="Journey Planner Pro team"
                  width={600}
                  height={500}
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating Stats Cards */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-teal-600">500+</div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </motion.div>
              
              <motion.div
                className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-emerald-600">98%</div>
                <div className="text-gray-600 font-medium">Satisfaction Rate</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Company Milestones</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Key moments that shaped our growth and success</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-emerald-500 transform md:-translate-x-px"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transform md:-translate-x-2 z-10"></div>
                    
                    {/* Content Card */}
                    <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-teal-100 text-teal-700 font-bold">
                              {milestone.year}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Enhanced Design */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-700 text-sm font-medium mb-4 shadow-sm">
              Our Purpose
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The driving forces behind everything we do</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              {...scaleOnHover}
              className="group"
            >
              <Card className="h-full shadow-lg border-0 group-hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To provide exceptional travel experiences that connect people with the beauty, culture, and
                    adventure that our world has to offer. We strive to make travel accessible, safe, and memorable for
                    every traveler through personalized service and local expertise.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-teal-600 border-teal-200">Excellence</Badge>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200">Safety</Badge>
                    <Badge variant="outline" className="text-cyan-600 border-cyan-200">Innovation</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              {...scaleOnHover}
              className="group"
            >
              <Card className="h-full shadow-lg border-0 group-hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To become the leading travel company in Pakistan and beyond, known for our commitment to quality, innovation,
                    and customer satisfaction. We envision a world where travel brings people together and creates
                    lasting positive impact on communities and cultures.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-purple-600 border-purple-200">Leadership</Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">Growth</Badge>
                    <Badge variant="outline" className="text-indigo-600 border-indigo-200">Impact</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 rounded-full text-sm font-medium mb-4">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                {...scaleOnHover}
                className="group"
              >
                <Card className="text-center h-full shadow-lg border-0 group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color}`}></div>
                    <div className="mb-6">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} shadow-lg`}>
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-700 text-sm font-medium mb-4 shadow-sm">
              Our Experts
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate travel experts dedicated to making your journey extraordinary
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                {...scaleOnHover}
                className="group"
              >
                <Card className="text-center shadow-lg border-0 group-hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.slice(0, 2).map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-white/90 text-gray-800">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <Badge variant="outline" className="mb-3 text-teal-600 border-teal-200">
                        {member.role}
                      </Badge>
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm">{member.description}</p>
                      
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{member.experience}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
              Our Achievements
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Numbers That Matter</h2>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Every number tells a story of trust, quality, and dedication
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                  <AnimatedCounter number={achievement.number} />
                  <div className="text-lg font-semibold text-white mb-2">{achievement.label}</div>
                  <div className="text-sm text-teal-100">{achievement.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied travelers who have experienced the world with Journey Planner Pro
            </p>
            <motion.button
              className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Plan Your Adventure
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}