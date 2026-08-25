# Slekco — Modern Multi-Category E-Commerce

Slekco is a modern, responsive multi-category e-commerce application built as a frontend and full-stack development assessment project.

The application provides a clean shopping experience across multiple categories including Fashion, Electronics, Home, Beauty, Accessories, and Sports.

It demonstrates modern UI/UX design, product discovery, search, category filtering, product details, cart management, order creation, API integration, PostgreSQL database integration, Prisma ORM, and production deployment.

---

## Live Demo

https://slekco-8ihw2xvqm-goris-projects-70aad66f.vercel.app

## GitHub Repository

https://github.com/gori004/slekco

---

# Features

## E-Commerce Features

- Modern responsive homepage
- Multi-category product marketplace
- Product listing
- Product search
- Category filtering
- Product detail pages
- Product pricing
- Sale pricing
- Product ratings
- Stock handling
- Add to cart
- Remove from cart
- Increase/decrease product quantity
- Cart subtotal calculation
- Order creation
- Responsive navigation
- Mobile-friendly layout
- Contact form
- Form validation
- Custom 404 page
- Error handling

---

# Pages

The application includes the following main pages:

### Homepage

- Hero section
- Category discovery
- Featured products
- Call-to-action sections
- Contact/newsletter section

### Shop

- Product listing
- Search
- Category filtering
- Product cards
- Product pricing
- Product ratings
- Add-to-cart functionality

### Product Details

- Product image
- Product name
- Brand
- Category
- Description
- Price
- Compare-at price
- Rating
- Stock information
- Add to cart

### Cart

- Cart item list
- Quantity controls
- Remove item
- Subtotal calculation
- Order creation
- Empty cart state

---

# Technology Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

## Backend

- Next.js App Router
- Next.js Route Handlers
- Prisma ORM
- PostgreSQL
- Neon

## State Management

- Zustand

## Validation

- Zod

## Deployment

- Vercel
- Neon PostgreSQL

---

# Architecture

The application uses the Next.js App Router architecture.

```text
                         Slekco
                           |
                           v
                    Next.js App Router
                           |
              +------------+------------+
              |                         |
              v                         v
        React UI / Pages            API Routes
              |                         |
              |                         v
              |                    Prisma ORM
              |                         |
              |                         v
              |                  Neon PostgreSQL
              |
              v
        Zustand Cart Store
