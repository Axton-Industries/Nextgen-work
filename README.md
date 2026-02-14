# 📊 Nextgen Dashboard

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.x-22B5BF)](https://recharts.org/)

A high-performance, interactive educational analytics dashboard built with **React 19**, **TypeScript**, and **Tailwind CSS**. Designed to provide deep insights into student engagement, performance trends, and learning outcomes through beautiful data visualizations.

---

## ✨ Key Features

- **🚀 Two-Tiered Analytics**: 
  - **Overview Mode**: Class-wide analytics including engagement metrics, improvement stats, and distribution charts.
  - **Student View**: Individual deep-dives into performance trends, skill mastery, and time management.
- **📈 Advanced Visualizations**: Leverages **Recharts** for Treemaps, Bubble Charts, Scatter Plots, and multi-axis Line/Bar graphs.
- **🕒 Dynamic Filtering**: Flexible time-based filtering with support for presets (Week, Month, Year) and custom date ranges.
- **🎨 Premium UI/UX**: 
  - Modern Glassmorphic aesthetic with dark-mode optimized colors.
  - Fully responsive layout for Desktop and Tablets.
  - Interactive StatCards and custom Dashboard Tooltips for real-time data inspection.
- **⚡ Performance Optimized**: Built on **Vite** for near-instant HMR and lightning-fast builds.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/) (Primitives) & [Shadcn/UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Axton-Industries/Nextgen-work.git
   cd Nextgen-work
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── cards/       # Interactive StatCards and data tiles
│   ├── charts/      # Recharts implementations (Overview/Student specific)
│   ├── filters/     # Time and search filter components
│   ├── layout/      # Sidebar, Header, and Shell containers
│   ├── ui/          # Low-level accessible components (buttons, dialogs, etc.)
│   └── modals/      # Student selection and detail modals
├── hooks/           # Custom React hooks for data processing and state
├── constants/       # Global configuration and filter options
├── data/            # Mock data and analytics definitions
├── lib/             # Utility tool configurations (Tailwind merge, etc.)
├── types/           # TypeScript interfaces and types
└── utils/           # Helper functions for data transformation
```

---

<p align="center">Built with ❤️ by Axton Industries</p>
