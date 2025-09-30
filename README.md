# PrimeTrade Backend Developer Assignment

A scalable REST API with authentication, role-based access control, and a modern React frontend.

## 🚀 Features

### Backend
- ✅ User registration & login with JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (User & Admin)
- ✅ CRUD operations for Items (Products)
- ✅ Input validation and sanitization
- ✅ API versioning (v1)
- ✅ Error handling middleware
- ✅ MongoDB database with Mongoose ODM

### Frontend
- ✅ Modern React.js with Vite
- ✅ TailwindCSS for styling
- ✅ Role-based dashboards (Admin & User)
- ✅ JWT token management
- ✅ Responsive design
- ✅ Real-time search and filtering
- ✅ Product management interface

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/SuchitHubale/Store-Management.git
cd Store-Management
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGOURL=your_mongodb_connection_string
secretKey=your_jwt_secret_key
expire=7d
```

Start the backend server:

```bash
npm run dev
```

Backend will run on `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Update the API base URL in your frontend components:
- `AdminDashboard.jsx`: Update `API_BASE_URL` to `http://localhost:8000/api/v1`
- `UserDashboard.jsx`: Update `API_BASE_URL` to `http://localhost:8000/api/v1`

Start the frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "1234567890",
  "password": "password123"
}
```

#### Login User
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful ✅",
  "token": "jwt_token_here",
  "user": {
    "userId": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "contact": "1234567890",
    "role": "user"
  }
}
```

### Item Endpoints (Protected)

#### Get All Items (Public)
```http
GET /api/v1/items
```

#### Get Item by ID (Public)
```http
GET /api/v1/items/:id
```

#### Create Item (Admin Only)
```http
POST /api/v1/items
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "itemName": "Product Name",
  "quantity": 10,
  "description": "Product description",
  "category": "Electronics"
}
```

#### Update Item (Admin Only)
```http
PUT /api/v1/items/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "itemName": "Updated Name",
  "quantity": 15,
  "description": "Updated description",
  "category": "Electronics"
}
```

#### Delete Item (Admin Only)
```http
DELETE /api/v1/items/:id
Authorization: Bearer <jwt_token>
```

### Health Check
```http
GET /api/v1/health
```

## 🔐 Authentication & Authorization

- JWT tokens are required for protected routes
- Include token in Authorization header: `Bearer <token>`
- Admin role required for Create, Update, Delete operations
- Users can view items without authentication
- Token and user data stored in localStorage
- Automatic logout clears localStorage

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  contact: String (required),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user')
}
```

### Item Schema
```javascript
{
  itemName: String (required),
  quantity: Number (required, min: 1),
  description: String,
  category: String (required),
  timestamps: true
}
```

## 🧪 Testing

### Create Admin User

To create an admin user, manually update the role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or register normally and update via MongoDB Compass/Atlas.

### Test the Application

1. **Register a new user** at `/register`
2. **Login** with credentials at `/login`
3. **User Dashboard**: Browse and search products
4. **Admin Dashboard**: Add, edit, and delete products (requires admin role)

## 📁 Project Structure

```
primetrade-assignment/
├── backend/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── ItemController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── model/
│   │   ├── User.js
│   │   └── Item.js
│   ├── routes/
│   │   ├── user.router.js
│   │   └── ItemRouter.js
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── UserDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
├── README.md
├── SCALABILITY.md
└── API_DOCUMENTATION.md
```

## 🎨 Frontend Features

### Admin Dashboard
- **Navigation**: Home, Add Products, Logout
- **Add Product Form**: Create new products with validation
- **Product Table**: View all products with edit/delete actions
- **Edit Mode**: Update existing products
- **Delete Confirmation**: Prevent accidental deletions
- **Real-time Updates**: Automatic refresh after CRUD operations

### User Dashboard
- **Navigation**: Home, Products, Logout
- **Search Bar**: Find products by name or description
- **Category Filter**: Filter products by category
- **Product Cards**: Beautiful grid layout with product details
- **Product Modal**: Detailed view of individual products
- **Responsive Design**: Works on all screen sizes

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables:
   - `PORT`
   - `MONGOURL`
   - `secretKey`
   - `expire`
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository
3. Update API base URL to production backend URL
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy

## 🔒 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token authentication with expiration
- Input validation and sanitization
- Role-based access control
- Protected routes with middleware
- CORS enabled
- Environment variable protection
- Secure logout (clears localStorage)

## 📈 Scalability

See [SCALABILITY.md](SCALABILITY.md) for detailed scalability approach including:
- Horizontal scaling with load balancing
- Database optimization and sharding
- Caching strategies with Redis
- Microservices architecture
- CDN integration
- Message queues
- Monitoring and logging

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB connection string is correct
- Ensure PORT is not already in use
- Verify all environment variables are set

**Frontend can't connect to backend:**
- Update `API_BASE_URL` in components
- Check if backend is running
- Verify CORS is enabled on backend

**Authentication not working:**
- Check if JWT secret key is set
- Verify token is being sent in Authorization header
- Ensure token hasn't expired

**Admin features not accessible:**
- Verify user role is set to 'admin' in database
- Check if Authorization header includes token
- Ensure token is valid and not expired

## 📊 API Response Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation Error) |
| 401 | Unauthorized (Invalid/Missing Token) |
| 403 | Forbidden (Insufficient Permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🔄 Logout Implementation

The logout functionality removes authentication data:

```javascript
const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    // Remove token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    window.location.href = '/login';
  }
};
```

## 👨‍💻 Author

**Suchit Hubale**
- GitHub: [@SuchitHubale](https://github.com/SuchitHubale)
- Email: suchithubale@gmail.com

## 📄 License

This project is created as part of PrimeTrade Backend Developer Internship Assignment.

## 🙏 Acknowledgments

- Express.js for the backend framework
- React.js and Vite for the frontend
- MongoDB for the database
- TailwindCSS for styling
- Lucide React for icons

---

**Happy Coding! 🚀**