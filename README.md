# 🌍 Journey Planner Pro

Journey Planner Pro is a **full-stack travel management application** that allows users to explore, filter, and plan tours across **Pakistan** and **International destinations**.

It features a beautiful, interactive UI powered by **Next.js + TailwindCSS + Framer Motion** and a backend built with **Node.js + Express + MongoDB Atlas (via Mongoose)**.

---

## 🚀 Features

- **Frontend (Next.js + Tailwind + Framer Motion)**
  - Modern, responsive UI
  - Search tours by title, location, or description
  - Filter by category (Pakistan / International)
  - Sort by rating, price, duration, or name
  - Toggle favorite tours
  - Smooth animations and transitions

- **Backend (Node.js + Express + MongoDB Atlas)**
  - REST API for fetching and managing trips
  - Organized routes, controllers, and models
  - MongoDB Atlas database connection using Mongoose
  - Environment variables support (`.env`)
  - Ready for authentication and bookings

---

## 📂 Project Structure

```
journey-planner-pro/
│── frontend/            # Next.js + Tailwind frontend
│── backend/             # Express + MongoDB backend
│   ├── routes/          # API endpoints
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB models
│   ├── .env             # Environment variables
│── package.json         # Root config
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/journey-planner-pro.git
cd journey-planner-pro
```

---

### 2️⃣ Backend Setup

Go to backend folder:

```bash
cd backend
```

#### Install dependencies:

```bash
npm install express cors dotenv mongoose mongodb nodemon
```

Setup Environment Variables (.env file)

Inside a .env file in the backend folder add your MongoDB Atlas Cluster Link:
-------------------------------------------------------------------------------------
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
--------------------------------------------------------------------------------------
👉 Example MONGO_URI (replace <username>, <password>, and <dbname>):

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
--------------------------------------------------------------------------------------
--Steps to Create Cluster in MongoDB Atlas--
Go to MongoDB Atlas

Create a free cluster

Add your username/password and allow your IP (0.0.0.0/0 for testing)

Copy the connection string and replace in .env

#### Run backend:

```bash
npm run dev
```

👉 The backend runs on **http://localhost:5000**

---

### 3️⃣ Frontend Setup

Go to frontend folder:

```bash
cd ../frontend
```

#### Install dependencies:

```bash
npm install next react react-dom tailwindcss framer-motion lucide-react @radix-ui/react-icons
```

#### Run frontend:

```bash
npm run dev
```

👉 The frontend runs on **http://localhost:3000**

---

## 📦 Dependencies

### 🔹 Backend
- **express** → Web framework  
- **cors** → Enable cross-origin requests  
- **dotenv** → Load environment variables  
- **mongoose** → ODM for MongoDB  
- **mongodb** → MongoDB driver  
- **nodemon** → Auto restart server (dev only)

### 🔹 Frontend
- **next** → React framework  
- **react, react-dom** → Core React  
- **tailwindcss** → Styling framework  
- **framer-motion** → Animations  
- **lucide-react** → Icons  
- **@radix-ui/react-icons** → Additional UI icons  
- **shadcn/ui** → Prebuilt UI components  

---

## 🛠️ Scripts

### Backend (`backend/package.json`):
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Frontend (`frontend/package.json`):
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```
## 📂 Tour Data (Trips Collection)

All tours (Pakistan & International) are stored in **MongoDB Atlas** inside the `trips` collection.

The project already includes a file called `trips.txt` which contains the tour documents.

### Adding Tours to MongoDB Atlas

1. Open [MongoDB Atlas](https://cloud.mongodb.com/).
2. Go to your **Cluster → Database → Collections**.
3. Create a new collection named `trips` (if it doesn’t already exist).
4. Open `trips.txt` from this project.
5. Copy the JSON content from the file.
6. In Atlas, click **Insert Document** → paste the JSON → Save.

Now, your **Trips Page** will load the tours directly from MongoDB Atlas.

---

## 🌟 Roadmap

- ✅ Tour filtering, sorting, and favorites  
- ✅ MongoDB Atlas integration  
- 🔜 Authentication & User Accounts  
- 🔜 Booking & Payments  

---



