"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  Globe, 
  Award, 
  Clock, 
  ArrowRight,
  Mountain,
  Plane,
  Heart,
  CheckCircle,
  Phone,
  Mail
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scaleOnHover = {
    whileHover: { scale: 1.05, y: -8 },
    whileTap: { scale: 0.98 }
  };

  const featuredPackages = [
    {
      id: 1,
      title: "Hunza Valley Adventure",
      location: "Pakistan North",
      price: "PKR 35,000",
      duration: "5 Days",
      rating: 4.8,
      image: "/Hunza-Valley.jpeg",
      description: "Experience the breathtaking beauty of Hunza Valley with its stunning landscapes and rich culture.",
      category: "pakistan",
      difficulty: "Moderate",
      highlights: ["Karimabad Fort", "Altit Fort", "Eagle's Nest", "Rakaposhi View"]
    },
    {
      id: 2,
      title: "Switzerland Alpine Tour",
      location: "Europe",
      price: "PKR 400,000",
      duration: "7 Days",
      rating: 4.9,
      image: "/Alpine.jpg",
      description: "Discover the majestic Swiss Alps with pristine lakes and charming mountain villages.",
      category: "international",
      difficulty: "Easy",
      highlights: ["Matterhorn", "Jungfraujoch", "Lake Geneva", "Interlaken"]
    },
    {
      id: 3,
      title: "Umrah Package",
      location: "Saudi Arabia",
      price: "PKR 250,000",
      duration: "10 Days",
      rating: 4.7,
      image: "/Umrah.jpg",
      description: "Complete Umrah package with comfortable accommodation and guided spiritual journey.",
      category: "religious",
      difficulty: "Easy",
      highlights: ["Masjid al-Haram", "Masjid an-Nabawi", "Guided Tours", "5-Star Hotels"]
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Expert Guides",
      description: "Professional local guides with years of experience"
    },
    {
      icon: Globe,
      title: "50+ Destinations",
      description: "Carefully curated destinations worldwide"
    },
    {
      icon: CheckCircle,
      title: "100% Satisfaction",
      description: "Money-back guarantee on all our packages"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800'
      case 'Challenging': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pakistan': return <Mountain className="h-4 w-4" />
      case 'international': return <Plane className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSlider />

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Trusted by 500+ Travelers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">4.8 Average Rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="h-5 w-5 text-blue-500" />
              <span className="font-medium">3 Years Excellence</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge className="bg-teal-100 text-teal-800 px-4 py-2 text-sm font-medium mb-4">
                ✨ Most Popular
              </Badge>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Featured{" "}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Adventures
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Handpicked destinations that offer unforgettable experiences and memories to last a lifetime
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredPackages.map((pkg, index) => (
              <motion.div 
                key={pkg.id} 
                variants={fadeInUp}
                {...scaleOnHover}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform border-0 shadow-lg flex flex-col h-full bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{pkg.rating}</span>
                    </div>

                    {/* Category badge */}
                    <Badge className={`absolute top-4 left-4 shadow-lg ${
                      pkg.category === 'pakistan' ? 'bg-emerald-600' : 
                      pkg.category === 'international' ? 'bg-blue-600' : 'bg-purple-600'
                    }`}>
                      {getCategoryIcon(pkg.category)}
                      <span className="ml-1 capitalize">{pkg.category}</span>
                    </Badge>

                    {/* Difficulty badge */}
                    <Badge className={`absolute bottom-4 left-4 ${getDifficultyColor(pkg.difficulty)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      {pkg.difficulty}
                    </Badge>

                    {/* Favorite button */}
                    <button className="absolute top-4 right-16 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-teal-600 transition-colors duration-300">
                        {pkg.title}
                      </CardTitle>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-emerald-600">{pkg.price}</span>
                        <div className="text-xs text-gray-500">per person</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-teal-600" />
                        <span className="font-medium">{pkg.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow">
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {pkg.description}
                    </CardDescription>
                    
                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Highlights:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-teal-50 text-teal-700">
                            {highlight}
                          </Badge>
                        ))}
                        {pkg.highlights.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                            +{pkg.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Starting from</span>
                        <span className="font-medium">Free cancellation</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href={`/book?tour=${pkg.id}`} className="flex-1">
                          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-600 transition-all duration-300">
                            Book Now
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="px-3 hover:bg-teal-50 hover:border-teal-200">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => router.push("/tours")}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg group"
            >
              Explore All Packages
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Us?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making your travel dreams a reality with exceptional service and unforgettable experiences
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Success in Numbers
            </h2>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who trusted us with their adventures
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { number: "500+", label: "Happy Travelers", icon: Users },
              { number: "50+", label: "Destinations", icon: Globe },
              { number: "3+", label: "Years Experience", icon: Award },
              { number: "24/7", label: "Support", icon: Clock }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-teal-100 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready for Your Next{" "}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Adventure?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Let us help you create the perfect travel experience tailored to your dreams and budget. 
              Our expert team is ready to make your journey unforgettable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={() => router.push("/tours")}
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 text-lg group"
              >
                View All Packages
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => router.push("/contact")}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg group"
              >
                Contact Us
                <Phone className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@journeyplannerpro.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}