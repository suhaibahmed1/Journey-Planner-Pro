"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  firstName: string
  lastName?: string
  email: string
  role?: string
  avatar?: string
  joinedDate?: string
  phone?: string
}

type Booking = {
  _id: string
  selectedTour: string
  category: string
  date?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  price?: number
  participants?: number
  location?: string
  duration?: string
  createdAt?: string
}

type Stats = {
  totalBookings: number
  upcomingTrips: number
  completedTrips: number
  totalSpent: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<Stats>({ totalBookings: 0, upcomingTrips: 0, completedTrips: 0, totalSpent: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'profile'>('overview')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (!token || !storedUser) {
      router.push("/login")
    } else {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        // Fetch user bookings
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setBookings(data.bookings)
            }
          })
          .catch((err) => {
            console.error("Failed to fetch bookings", err)
          })
      } catch {
        router.push("/login")
      }
    }

    setLoading(false)
  }, [])

  // Calculate stats
  useEffect(() => {
    const totalBookings = bookings.length
    const upcomingTrips = bookings.filter(b => 
      b.status === 'confirmed' && b.date && new Date(b.date) > new Date()
    ).length
    const completedTrips = bookings.filter(b => b.status === 'completed').length
    const totalSpent = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (b.price || 0), 0)

    setStats({ totalBookings, upcomingTrips, completedTrips, totalSpent })
  }, [bookings])

  const handleCancel = async (bookingId: string) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?")
    if (!confirmCancel) return

    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()

      if (data.success) {
        alert("Booking cancelled successfully")
        setBookings((prev) => prev.filter((b) => b._id !== bookingId))
      } else {
        alert("Failed to cancel: " + data.message)
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong.")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = bookings.filter(b => 
    filterStatus === 'all' || b.status === filterStatus
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-teal-700">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/tours')}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Browse Tours
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'bookings', label: 'My Bookings', icon: '📋' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-4 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    '👤'
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Hello, {user?.firstName}!</h2>
                  <p className="text-teal-100 mt-2">Ready for your next adventure? Explore amazing destinations with us.</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming Trips</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.upcomingTrips}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed Trips</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedTrips}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => router.push('/tours')}
                  className="p-4 text-center border border-gray-200 rounded-lg hover:bg-teal-50 hover:border-teal-200 transition"
                >
                  <span className="text-2xl block mb-2">🌍</span>
                  <span className="text-sm font-medium">Browse Tours</span>
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="p-4 text-center border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition"
                >
                  <span className="text-2xl block mb-2">📋</span>
                  <span className="text-sm font-medium">My Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="p-4 text-center border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition"
                >
                  <span className="text-2xl block mb-2">👤</span>
                  <span className="text-sm font-medium">Profile Settings</span>
                </button>
                <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition">
                  <span className="text-2xl block mb-2">💬</span>
                  <span className="text-sm font-medium">Support</span>
                </button>
              </div>
            </div>

            {/* Recent Bookings Preview */}
            {bookings.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Bookings</h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {bookings.slice(0, 3).map(booking => (
                    <div key={booking._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{booking.selectedTour}</p>
                        <p className="text-sm text-gray-600">{booking.category}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Filter by status:</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">All Bookings</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <div key={booking._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{booking.selectedTour}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Category:</span> {booking.category}
                          </div>
                          {booking.date && (
                            <div>
                              <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()}
                            </div>
                          )}
                          {booking.price && (
                            <div>
                              <span className="font-medium">Price:</span> ${booking.price.toLocaleString()}
                            </div>
                          )}
                          {booking.participants && (
                            <div>
                              <span className="font-medium">Participants:</span> {booking.participants}
                            </div>
                          )}
                        </div>

                        {booking.location && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">📍 Location:</span> {booking.location}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                          >
                            Cancel
                          </button>
                        )}
                        <button className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
                  <div className="text-6xl mb-4">🎒</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-600 mb-6">Start exploring amazing destinations and book your first adventure!</p>
                  <button
                    onClick={() => router.push('/tours')}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                  >
                    Browse Tours
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-6">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={user?.firstName || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={user?.lastName || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={user?.phone || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive booking updates and travel tips</p>
                  </div>
                  <button className="w-12 h-6 bg-teal-600 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Get important booking alerts via SMS</p>
                  </div>
                  <button className="w-12 h-6 bg-gray-300 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                  </div>
                  <button className="w-12 h-6 bg-gray-300 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}