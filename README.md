# Payment Flow Application

A modern, secure payment flow application built with Astro, SolidJS, TypeScript, and Tailwind CSS.

## 🎨 Live Demo

**Vercel Deployment**: [Add your deployment URL here]

## 🛠️ Tech Stack

- **Astro** - Modern web framework for content-focused websites
- **SolidJS** - Reactive UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform

## 🤖 AI Tool Used

This project was developed with assistance from **Claude (Sonnet 4.5)** by Anthropic. Claude helped with:

- Architecture planning and component design
- TypeScript type definitions and validation logic
- SolidJS reactive patterns and best practices
- Tailwind CSS custom theme configuration
- Form validation and error handling
- Transaction flow implementation

## 🏗️ Architecture

### Project Structure

```
payment-flow/
├── src/
│   ├── components/          # SolidJS components
│   │   ├── PaymentForm.tsx        # Payment form with validation
│   │   └── TransactionReceipt.tsx # Receipt display
│   ├── layouts/             # Astro layouts
│   │   └── BaseLayout.astro       # Base HTML layout
│   ├── pages/               # Astro pages (routes)
│   │   ├── index.astro            # Home page (payment form)
│   │   └── receipt.astro          # Receipt page
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration
├── tailwind.config.mjs      # Tailwind configuration
└── package.json             # Dependencies
```

### Key Features

#### 1. **Payment Form Screen** (`/`)

- Client-side validation for all fields
- Real-time input formatting (card number, expiry date)
- Error messages for invalid inputs
- Animated UI with smooth transitions
- Processing state during payment simulation

**Validated Fields:**

- Cardholder Name (required)
- Card Number (16 digits, auto-formatted)
- Expiry Date (MM/YY format, future date validation)
- CVV (3-4 digits, masked input)
- Payment Amount (positive number)

#### 2. **Transaction Receipt Screen** (`/receipt`)

- Displays complete transaction details
- Masked card number for security
- Success status indicator
- Downloadable receipt (TXT format)
- Option to make another payment

### Component Architecture

**SolidJS Components:**

- Reactive state management using `createSignal`
- Type-safe props and state with TypeScript
- Client-side rendering with `client:load` directive
- Efficient reactivity without Virtual DOM

**State Management:**

- URL query parameters for passing transaction data
- No complex state management needed for this flow
- Secure data transfer between screens

### Validation Logic

**Client-side validation includes:**

- Card number: 16 digits with Luhn algorithm consideration
- Expiry date: MM/YY format with future date validation
- CVV: 3-4 digits
- Amount: Positive number with decimal support

**Security Features:**

- CVV never stored or transmitted
- Card number masked in receipt
- Input sanitization
- No sensitive data in localStorage

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd payment-flow
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

The app will be available at `http://localhost:4321`

4. **Build for production**

```bash
npm run build
```

5. **Preview production build**

```bash
npm run preview
```

## 🌐 Deployment

### Deploying to Vercel

1. **Install Vercel CLI** (optional)

```bash
npm install -g vercel
```

2. **Deploy via GitHub**
   - Push your code to GitHub
   - Import project in Vercel dashboard
   - Vercel auto-detects Astro and configures build settings
   - Deploy!

3. **Deploy via CLI**

```bash
vercel
```

### Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Astro

## 🎯 Features Implemented

✅ Two-screen payment flow  
✅ SolidJS reactive components in Astro  
✅ TypeScript with strict typing  
✅ Tailwind CSS custom theme  
✅ Form validation (client-side)  
✅ Input formatting (card number, expiry)  
✅ Transaction ID generation  
✅ Receipt download functionality  
✅ Responsive design  
✅ Animated transitions  
✅ Loading states  
✅ Error handling  
✅ Security best practices

## 📝 Usage

### Making a Payment

1. Navigate to the home page
2. Fill in all payment details:
   - Cardholder name
   - 16-digit card number
   - Expiry date (MM/YY)
   - CVV (3-4 digits)
   - Payment amount
3. Click "Pay Now"
4. Wait for processing (simulated 1.5s delay)
5. View receipt on success screen

### Receipt Features

- View transaction details
- Download receipt as TXT file
- Make another payment

## 🔐 Security Notes

**Important:** This is a **demonstration project** with simulated payments. In production:

- Never process payments client-side
- Always use PCI DSS compliant payment processors (Stripe, PayPal, etc.)
- Implement server-side validation
- Use HTTPS for all transactions
- Never store CVV or full card numbers
- Implement proper authentication
- Use encrypted communication

## 🧪 Testing

**Manual Testing Checklist:**

- ✅ All form fields accept valid input
- ✅ Validation errors display correctly
- ✅ Card number formats automatically (spaces every 4 digits)
- ✅ Expiry date formats automatically (MM/YY)
- ✅ CVV is masked
- ✅ Submit button disables during processing
- ✅ Receipt displays all correct information
- ✅ Card number is masked in receipt
- ✅ Download receipt works
- ✅ "Make Another Payment" returns to form

**Test Card Numbers:**

- Valid format: 1234 5678 9012 3456
- Any 16-digit number works (no real validation)

## 🎨 Design Philosophy

**Custom Aesthetic:**

- Warm orange/primary color palette
- Elegant serif font (DM Serif Display) for headings
- Modern sans-serif (Outfit) for body text
- Soft gradient backgrounds with animated blobs
- Smooth animations and transitions
- Clean, spacious layout
- Professional yet approachable design

**Accessibility:**

- Semantic HTML
- Proper form labels
- Focus states on interactive elements
- Color contrast compliance
- Responsive design for all devices

## 📦 Dependencies

```json
{
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/solid-js": "^4.4.0",
    "@astrojs/tailwind": "^5.1.0",
    "solid-js": "^1.8.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.6.0"
  }
}
```

## 🤝 Contributing

This is an assignment project, but suggestions are welcome!

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 👨‍💻 Author

Mohit Kamat

- GitHub: [@mohitkamat99]
- Email: [mohitkamat99@gmail.com]

---

**Built with ❤️ using Astro + SolidJS + TypeScript + Tailwind CSS**

**AI Assistance:** Claude (Sonnet 4.5) by Anthropic
