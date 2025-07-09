# Landing Page Builder

A visual drag-and-drop landing page builder built with **Next.js 15**, **React 19**, and **TypeScript**. This application allows users to create custom landing pages by dragging components from a sidebar into a canvas area, with real-time editing capabilities and customizable styling options.

## 🚀 Repository

[https://github.com/renanvcb/landing-page-builder.git](https://github.com/renanvcb/landing-page-builder.git)

## 🌐 Live Demo

**Try it now:** [https://landing-page-builder-rho.vercel.app/](https://landing-page-builder-rho.vercel.app/)

Experience the full functionality of the landing page builder directly in your browser. Drag components, edit content, and see the responsive design in action!

## ✨ Features

- **Drag & Drop Interface**: Intuitive component placement using react-dnd
- **Real-time Editing**: Click-to-edit functionality for text content
- **Visual Styling**: Live customization of colors, fonts, and layout
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Library**: Pre-built blocks (Heading, Paragraph, Button, Image)
- **Properties Panel**: Dynamic styling controls for selected components
- **Reordering**: Drag components within the canvas to reorder
- **Remove Components**: Easy deletion of unwanted elements

## 🛠 Tech Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with modern features
- **TypeScript 5** - Type-safe JavaScript
- **CSS Modules** - Scoped styling solution

### Key Libraries

- **react-dnd (v16.0.1)** - Drag and drop functionality
- **react-dnd-html5-backend** - HTML5 backend for desktop drag/drop
- **react-dnd-touch-backend** - Touch backend for mobile devices
- **react-device-detect** - Device detection for responsive backends
- **Next.js Image** - Optimized image handling

### Development Tools

- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **CSS Modules** - Component-scoped styling

## 🏗 Architecture & Design Patterns

### Component Architecture

The application follows a modular component architecture with clear separation of concerns:

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── Canvas/            # Main editing area
│   ├── Sidebar/           # Component library
│   ├── blocks/            # Reusable block components
│   └── DnDWrapper.tsx     # Drag & Drop context provider
├── styles/                # CSS Modules
├── types/                 # TypeScript definitions
```

### Design Patterns Used

1. **Compound Component Pattern** - Canvas and CanvasBlock work together
2. **Render Props Pattern** - Used in drag and drop monitoring
3. **Context Pattern** - DnD context for global drag state
4. **Observer Pattern** - Component state updates and re-renders
5. **Factory Pattern** - Dynamic component rendering based on type

### State Management

- **Local State** - useState for component-specific data
- **Prop Drilling** - Controlled data flow between components
- **Context API** - DnD backend switching for device responsiveness

## 📁 Project Structure

```
landing-page-builder/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   └── page.tsx            # Main application entry
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── Canvas.tsx      # Main canvas component
│   │   │   └── CanvasBlock.tsx # Individual dropped blocks
│   │   ├── Sidebar/
│   │   │   └── Sidebar.tsx     # Component library sidebar
│   │   ├── blocks/
│   │   │   ├── DraggableBlock.tsx  # Draggable source components
│   │   │   └── EditableText.tsx    # Inline editing component
│   │   ├── DnDWrapper.tsx      # Drag & Drop context
│   │   └── PropertiesPanel.tsx # Styling controls
│   ├── styles/                 # CSS Modules for styling
│   └── types/
│       └── types.ts            # TypeScript type definitions
├── next.config.ts             # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/renanvcb/landing-page-builder.git
   cd landing-page-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Usage

1. **Add Components**: Drag components from the sidebar to the canvas
2. **Edit Content**: Click on any text element to edit inline
3. **Style Components**: Select a component and use the properties panel
4. **Reorder Elements**: Drag components within the canvas to reorder
5. **Remove Components**: Click the × button on any component to delete

## 📱 Responsive Design

The application automatically detects the device type and switches between:

- **HTML5 Backend** for desktop (mouse interactions)
- **Touch Backend** for mobile devices (touch interactions)

## 🔧 Configuration

### Next.js Configuration

The project includes optimized configurations for:

- **Image Optimization**: Remote pattern support for external images
- **SVG Support**: Dangerously allow SVG for flexibility
- **TypeScript**: Strict type checking enabled

### TypeScript Configuration

- **Strict Mode**: Enabled for better type safety
- **Path Mapping**: `@/*` alias for clean imports
- **Modern Target**: ES2017 for optimal performance

## 🚫 Framework Decisions

### Astro Framework

I decided not to use the Astro Framework for generating predefined components. As I have no prior experience with Astro, I felt that the time required to properly read and understand the documentation would not allow me to implement it with the necessary attention to detail and best practices. Instead, I focused on leveraging my existing expertise with React and Next.js to deliver a robust solution.

## 🏗 Platform Development Insights

### Visual Editor Similarities

This project shares many architectural patterns with popular visual editors like:

- **WordPress Gutenberg Editor**
- **Shopify Page Builder**
- **Elementor**
- **Webflow**

### Key Learnings for Platform Development

Having built this drag-and-drop interface, I've gained valuable insights into how data flows between components to achieve the final result. The experience of managing component state, handling drag-and-drop interactions, and implementing real-time editing would be highly transferable to developing custom blocks for these platforms.

The component-to-component data flow patterns I've implemented here - particularly around:

- **Component registration and rendering**
- **Dynamic styling systems**
- **State management for editing modes**
- **Drag and drop mechanics**

Would directly apply to building custom blocks for e-commerce platforms and CMS systems. This knowledge, combined with platform-specific documentation, would enable me to create sophisticated custom blocks that integrate seamlessly with existing page builder ecosystems.

## 📄 License

This project is part of a frontend development test and is for demonstration purposes.

---

Built by [Renan Borges](https://github.com/renanvcb) with ❤️ using Next.js and React
