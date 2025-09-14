import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  X
} from "lucide-react"

type Booking = {
  _id: string
  name: string
  email: string
  phone?: string
  category?: string
  selectedTour?: string
  tourDetails?: {
    id?: number
    price?: string
    duration?: string
    rating?: number
  }
  status?: "pending" | "confirmed" | "cancelled"
  createdAt?: string
  updatedAt?: string
}

export default function ViewBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError("")
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBookings(res.data.bookings || res.data || [])
      setFilteredBookings(res.data.bookings || res.data || [])
    } catch (err: any) {
      console.error("Error fetching bookings", err)
      setError(err.response?.data?.message || "Failed to fetch bookings")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Filter bookings based on search and filters
  useEffect(() => {
    let filtered = bookings

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.selectedTour?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(booking => booking.category === categoryFilter)
    }

    setFilteredBookings(filtered)
  }, [bookings, searchTerm, statusFilter, categoryFilter])

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleString("en-US", { 
          timeZone: "Asia/Karachi",
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'pending':
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle
      case 'cancelled': return X
      case 'pending':
      default: return Clock
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'pak': return 'bg-emerald-100 text-emerald-800'
      case 'intl': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token")
      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: newStatus as any }
            : booking
        )
      )
    } catch (err) {
      console.error("Error updating booking status", err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-teal-600" />
          <span className="text-lg text-gray-600">Loading bookings...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bookings Management</h2>
          <p className="text-gray-600 mt-1">
            View and manage all booking requests ({filteredBookings.length} total)
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchBookings} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pak">Pakistan Tours</SelectItem>
                <SelectItem value="intl">International Tours</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setCategoryFilter("all")
              }}
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bookings Table */}
      {filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600">
              {bookings.length === 0 ? "No bookings have been made yet." : "No bookings match your current filters."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking, index) => {
                    const StatusIcon = getStatusIcon(booking.status)
                    return (
                      <motion.tr
                        key={booking._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Customer Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white font-semibold text-sm">
                                {booking.name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {booking.name || "Unknown"}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {booking.email || "N/A"}
                              </div>
                              {booking.phone && (
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {booking.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Tour Details */}
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.selectedTour || "N/A"}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {booking.category && (
                                <Badge className={getCategoryColor(booking.category)}>
                                  {booking.category === 'pak' ? 'Pakistan' : booking.category === 'intl' ? 'International' : booking.category}
                                </Badge>
                              )}
                              {booking.tourDetails?.price && (
                                <span className="text-sm text-gray-500">
                                  {booking.tourDetails.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                              <StatusIcon className="h-3 w-3" />
                              {booking.status || 'pending'}
                            </Badge>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(booking.createdAt)}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Details Modal (you can implement this with a dialog component) */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>ID: {selectedBooking._id}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBooking(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Details */}
              <div>
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div><strong>Name:</strong> {selectedBooking.name}</div>
                  <div><strong>Email:</strong> {selectedBooking.email}</div>
                  {selectedBooking.phone && (
                    <div><strong>Phone:</strong> {selectedBooking.phone}</div>
                  )}
                </div>
              </div>

              {/* Tour Details */}
              <div>
                <h4 className="font-semibold mb-2">Tour Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div><strong>Tour:</strong> {selectedBooking.selectedTour}</div>
                  <div><strong>Category:</strong> {selectedBooking.category}</div>
                  {selectedBooking.tourDetails && (
                    <>
                      {selectedBooking.tourDetails.price && (
                        <div><strong>Price:</strong> {selectedBooking.tourDetails.price}</div>
                      )}
                      {selectedBooking.tourDetails.duration && (
                        <div><strong>Duration:</strong> {selectedBooking.tourDetails.duration}</div>
                      )}
                      {selectedBooking.tourDetails.rating && (
                        <div><strong>Rating:</strong> {selectedBooking.tourDetails.rating}/5</div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Booking Status */}
              <div>
                <h4 className="font-semibold mb-2">Status Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <Badge className={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status || 'pending'}
                    </Badge>
                  </div>
                  <div><strong>Submitted:</strong> {formatDate(selectedBooking.createdAt)}</div>
                  {selectedBooking.updatedAt && (
                    <div><strong>Last Updated:</strong> {formatDate(selectedBooking.updatedAt)}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}