# Slekco — Modern Multi-Category E-Commerce

Slekco is a modern, responsive multi-category e-commerce experience built as a frontend/backend assessment project.

The application demonstrates product discovery, search, category filtering, product details, cart management, order creation, database integration, API routes, and production deployment.

## Live Demo

https://slekco-p4m8odzg2-goris-projects-70aad66f.vercel.app

## GitHub Repository

https://github.com/gori004/slekco

---

## Features

### E-Commerce

- Modern responsive homepage
- Product listing
- Product search
- Category filtering
- Product detail pages
- Add to cart
- Remove from cart
- Increase/decrease quantity
- Cart subtotal and total calculation
- Checkout/order creation
- Contact form with validation
- Responsive navigation
- Mobile-friendly UI
- 404 page
- Error handling

### Backend

- REST-style API routes using Next.js Route Handlers
- Product API
- Product detail API
- Contact API
- Order API
- PostgreSQL database
- Prisma ORM

### Database

The application uses PostgreSQL hosted on Neon.

Main entities:

- User
- Brand
- Category
- Product
- Order
- OrderItem

---

## Technology Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Next.js App Router
- Next.js Route Handlers
- Prisma ORM
- PostgreSQL
- Neon

### State Management

- Zustand

### Validation

- Zod

### Deployment

- Vercel
- Neon PostgreSQL

---

## Architecture

The project uses the Next.js App Router architecture.

```text
Browser
   |
   v
Next.js App Router
   |
   +----------------------+
   |                      |
   v                      v
React UI              API Routes
                           |
                           v
                       Prisma ORM
                           |
                           v
                    Neon PostgreSQL
