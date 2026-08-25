# Slekco

Modern multi-brand ecommerce assessment project.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Zod
- Next.js Route Handlers

## Features

- Responsive ecommerce homepage
- Product listing
- Search
- Category filtering
- Product detail pages
- Add/remove cart items
- Quantity controls
- Persistent cart
- API integration
- Basic server validation

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## API

```text
GET /api/products
GET /api/products?search=headphones
GET /api/products?category=Fashion
GET /api/products/[slug]
POST /api/contact
```

## Database plan

For production, connect the existing product model to PostgreSQL using Prisma. Recommended entities:

- User
- Brand
- Category
- Product
- Order
- OrderItem

OrderItem should store the purchase-time price.

## Deployment

Recommended: Vercel.

Add production environment variables such as:

```text
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
```

## AI-assisted development

AI tools can be used for scaffolding, debugging, component ideas, API boilerplate, and code review. Any generated code should be reviewed, tested, and modified by the developer.

## Next improvements

- Prisma/PostgreSQL persistence
- Authentication
- Wishlist
- Admin product management
- Real checkout/payment
- Inventory management
- Rate limiting
- Automated tests
