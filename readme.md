# MediMart

## Medicine E-Commerce Shop

An online platform for browsing, searching, and purchasing medicines with secure authentication, prescription verification, and order tracking.

## All Link
- **Website Live Link**: <a href="https://medimart-client-one.vercel.app" target="_blank" rel="noopener noreferrer">MediMart</a>
- **GitHub Client Repository**: <a href="https://github.com/developerFarukk/MediMart-Client" target="_blank" rel="noopener noreferrer">MediMart Cient</a> <br />
**VIDIO Review Link**: <a href="https://drive.google.com/file/d/1y9zvirvIaLDjQ5o1nPifF7OZy0X3GOvM/view?usp=sharing" target="_blank" rel="noopener noreferrer">Video Presentation</a>

## Features

### Core Features
- **User Authentication**
  - JWT-based secure authentication
  - Role-based access (Customer/Admin)
  - Password hashing with bcryptjs
- **Medicine Management**
  - Detailed medicine listings with prescription requirements
  - Advanced search and filtering
  - Inventory management
- **Order Processing**
  - Prescription upload for restricted medicines
  - Secure payment integration
  - Order status tracking
- **Admin Dashboard**
  - Comprehensive management interface
  - Prescription verification system
  - Sales and inventory analytics

### Technical Highlights
- Type-safe development with TypeScript
- RESTful API architecture
- Secure payment processing
- Responsive mobile-first design

## Technology Stack

### Frontend
- **Framework**: Next.js
- **Language**: TypeScript
- **UI Library**: React
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Form Handling**: React Hook Form
- **Payment Integration**: ShurjoPay

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT
- **Security**: bcryptjs, helmet, rate limiting
- **File Upload**: Multer (for prescriptions)
- **Email**: Nodemailer


## API Endpoints

### Authentication
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | /api/auth/register | User registration          |
| POST   | /api/auth/login    | User login                 |
| GET    | /api/auth/me       | Get current user profile   |

### Medicines
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | /api/medicines    | Get all medicines          |
| POST   | /api/medicines    | Create new medicine (Admin)|
| GET    | /api/medicines/:id| Get single medicine        |
| PUT    | /api/medicines/:id| Update medicine (Admin)    |
| DELETE | /api/medicines/:id| Delete medicine (Admin)    |

### Orders
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | /api/orders       | Get user orders            |
| POST   | /api/orders       | Create new order           |
| GET    | /api/orders/:id   | Get order details          |
| PUT    | /api/orders/:id   | Update order status (Admin)|

### Admin
| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| GET    | /api/admin/users       | Get all users (Admin)      |
| GET    | /api/admin/prescriptions | Get pending prescriptions  |
| PUT    | /api/admin/verify-prescription | Verify prescription      |



## Installation

### Prerequisites
- Node.js (v16 or later)
- MongoDB Atlas account or local MongoDB installation
- Stripe/ShurjoPay developer account

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/developerFarukk/Medi-Mart-Server.git
   cd Medi-Mart-Server
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**  
    Create a `.env` file in the root directory. Refer to `.env.example` for guidance:

   ```
   NODE_ENV=development
   PORT=5001
   DATABASE_URL=<mongodb+srv://<Username>:<password>@****.***.mongodb.net/<database-name>?***=true&w=***&appName=project-name>
   BCRYPT_SALT_ROUNDS=8
   JWT_ACCESS_SECRET=*********
   JWT_ACCESS_EXPIRES_IN=<12d, 30m etc>
   
   # sender Email
   SENADER_EMAIL=*****
   SENDER_EMAIL_PASSWORD=******
   
   # Surjopay API
   SP_ENDPOINT=*********
   SP_USERNAME=**********
   SP_PASSWORD=*********
   SP_PREFIX=******
   SP_RETURN_URL=**************
   ```

   Refer to `.env.example` for additional configuration options.

## Getting Started

First, run the development server:

```bash
npm run dev
```
The app will run at `http://localhost:5001`.

## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
For issues or inquiries, reach out to [Developerfaruk](mailto:web.omarfaruk.dev@gmail.com). Thank you 💜
