# Taag Media Frontend Assignment

## Overview
A responsive Next.js application for brand-creator matching and billing flow.

## Features
- **Brand Brief Form**: Collect campaign details with pre-filled templates
- **Match Console**: Display ranked creators with scoring and filters
- **Billing Flow**: Two-step process for brand billing and creator payout

## Setup Instructions

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open browser:**
Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm run export  # for static export
```

## Project Structure

```
app/
├── components/
│   ├── BrandBriefForm.tsx
│   ├── MatchConsole.tsx
│   └── BillingFlow.tsx
├── types.ts
├── layout.tsx
├── page.tsx
└── globals.css
```

## Key Features Implemented

### 1. Brand Brief Form
- Form validation with React Hook Form
- Pre-filled templates for quick setup
- Responsive design for mobile/desktop

### 2. Match Console
- Creator scoring algorithm (Relevance 40%, Audience 30%, Performance 20%, Platform 10%)
- Interactive score bars and reason chips
- Filtering by score, price, platform, vertical

### 3. Billing & Payout Flow
- Two-tab stepper with validation
- GSTIN, PAN, IFSC validation with regex
- GST calculation (18%)
- Download/print summary functionality

## Validation Rules
- **GSTIN**: `22AAAAA0000A1Z5` format
- **PAN**: `ABCDE1234F` format  
- **IFSC**: `HDFC0001234` format
- **UPI**: `user@paytm` format
- **Phone**: 10-digit number

## Technologies Used
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Assumptions Made
1. Sample creator data used for matching algorithm
2. Simplified scoring logic for demonstration
3. GST rate fixed at 18%
4. No real payment integration
5. Client-side validation only

## Mobile Responsiveness
- Responsive grid layouts
- Mobile-optimized forms
- Touch-friendly buttons and inputs
- Collapsible filters on mobile

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2017+ features used