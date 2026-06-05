Run Command: corepack pnpm dev

This is a modern frontend web app / landing page for ORVIA. More specifically, it is a Next.js single-page marketing website with animated sections,
responsive design, image assets, and reusable React components.

It does not currently look like a full backend app with login, database, admin panel, API routes, payments, etc. It is mostly a polished frontend website.

Project Type. It is a:
	Next.js App Router project
	React component-based frontend
	TypeScript web app
	Tailwind CSS styled landing page
	Animated marketing website

The visible page is assembled from sections:
	Navigation
	HeroSection
	FeaturesSection
	StatsSection
	MissionSection
	CTASection
	Footer

These are imported in: app/page.tsx

Tech Stack Used

Main framework: Next.js 16
Next.js handles routing, page rendering, image optimization, metadata, fonts, production build, and the dev server.

Frontend library: React 19
The UI is built using React components like HeroSection, Navigation, Footer, etc.

Language: TypeScript
Files like .tsx and .ts mean the project uses typed JavaScript.

Styling: Tailwind CSS 4
Most styling is written directly in className strings using Tailwind utility classes.

Global styles and theme variables are in: app/globals.css

UI/component helpers:
	shadcn
	@base-ui/react
	class-variance-authority
	clsx
	tailwind-merge

These help create reusable, configurable UI components. For example: components/ui/button.tsx

uses Base UI, CVA, and Tailwind merging to create a reusable button component.

Animations: framer-motion
This is heavily used across the project for scroll animations, motion effects, floating elements, transitions, parallax-style movement, etc.

Icons: lucide-react
Used for icons like menu, close, leaf, recycle, arrow, mail, etc.

Images and links: next/image, next/link
These are Next.js built-in components for optimized images and routing links.

Fonts: next/font/google
The app uses Google fonts through Next.js:
	Geist
	Geist_Mono
	Playfair_Display

Analytics: @vercel/analytics

Only loaded in production: {process.env.NODE_ENV === 'production' && <Analytics />}

Package manager: pnpm
The project has: pnpm-lock.yaml
so pnpm is the intended dependency manager.

Important Folders: app/
This is the Next.js App Router folder.

Important files:
	app/layout.tsx
	app/page.tsx
	app/globals.css

layout.tsx defines the HTML shell, fonts, metadata, analytics, and global page structure.
page.tsx defines the homepage.
globals.css defines Tailwind setup, design tokens, colors, fonts, scrollbar styling, glass effects, gradients, and global theme styles.

components/
Reusable UI sections live here.
Examples:
	components/navigation.tsx
	components/hero-section.tsx
	components/features-section.tsx
	components/stats-section.tsx
	components/mission-section.tsx
	components/cta-section.tsx
	components/footer.tsx
	components/floating-elements.tsx
	components/particle-background.tsx

components/ui/
Lower-level reusable UI components, currently including: button.tsx

lib/
Shared utilities.

lib/utils.ts
contains the cn() helper, which combines Tailwind class names cleanly.

public/
Static assets like logos, icons, and placeholder images.





Concepts You Should Learn, to edit or maintain this kind of project, learn these in this order:

1. HTML, CSS, JavaScript basics
You need to understand tags, layout, styling, events, arrays, objects, functions, imports, and exports.

2. React fundamentals
	Focus on:
		Components
		Props
		State
		Hooks
		Conditional rendering
		Mapping arrays into UI
		Event handling
	
	Your project uses React heavily.

3. TypeScript basics
	Learn:
		types
		interfaces
		React component props
		type imports
		basic error reading

4. Next.js App Router
	Learn:
		app/layout.tsx
		app/page.tsx
		metadata
		server components
		client components
		"use client"
		next/image
		next/link

	The "use client" line is important. Components using browser features, state, effects, or animations need it.

5. Tailwind CSS
	This project is styled mostly with Tailwind. Learn utilities like:
		flex
		grid
		p-4
		mt-8
		text-xl
		bg-background
		rounded-xl
		max-w-7xl
		mx-auto
		md:grid-cols-2
		hover:
		transition

6. Framer Motion
	Used for animations. Learn:
		motion.div
		initial
		animate
		whileHover
		transition
		useScroll
		useTransform
		useSpring

7. Component architecture
	Understand how a page is broken into sections:
	Page -> Sections -> Smaller components -> UI primitives

8. Package management
	Learn:
		corepack pnpm install
		corepack pnpm dev
		corepack pnpm build

	Commands You Should Know

Run development server:
corepack pnpm dev

Install dependencies:
corepack pnpm install

Create production build:
corepack pnpm build

Run production build locally:
corepack pnpm start

In Simple Terms
This project is a frontend React/Next.js landing page. The most important things to learn are:
	React components
	Next.js app folder
	Tailwind CSS
	Framer Motion
	TypeScript basics

Once you understand those, you will be able to change text, replace images, edit sections, add new sections, modify animations, and maintain similar web
apps.
