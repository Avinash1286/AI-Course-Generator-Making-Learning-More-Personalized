# Easy Study - AI Personalized Course Generator
## Try here: https://ai-course-generator-making-learning-more-personalized.vercel.app/

Easy Study is a web application that leverages AI to generate personalized study materials. Users can create custom courses based on topics, study types (e.g., exam preparation, job interviews), and difficulty levels. The platform then generates course outlines, detailed notes, interactive flashcards, and quizzes to aid in learning.

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)


## About The Project

Easy Study aims to make learning more efficient and personalized. Instead of sifting through generic study materials, users can generate content tailored to their specific needs. The application uses Google's Gemini AI to create comprehensive course structures and content, providing a rich learning experience with various study tools.

**(Suggestion: Add a screenshot or GIF of the application in action here)**
<!-- ![App Screenshot](path/to/your/screenshot.png) -->

## Key Features

-   **User Authentication:** Secure sign-up and sign-in functionality powered by Clerk.
-   **AI-Powered Course Generation:**
    -   **Course Outline:** Generates structured course outlines based on topic, study type, and difficulty.
    -   **Chapter Notes:** Creates detailed, HTML-formatted notes for each chapter.
    -   **Flashcards:** Produces interactive flashcards for key concepts.
    -   **Quizzes:** Generates multiple-choice quizzes to test understanding.
-   **Interactive Learning Tools:**
    -   Carousel-based flashcard viewer.
    -   Step-by-step quiz interface with feedback.
-   **User Dashboard:** Centralized place for users to manage their generated courses.
-   **Responsive Design:** Built with Tailwind CSS and Shadcn/UI for a consistent experience across devices.
-   **Database Integration:** Uses Drizzle ORM with a Neon PostgreSQL database to store user and course data.
-   **Background Task Processing:** Leverages Inngest for handling asynchronous tasks like content generation.
-   **Subscription/Payment (Planned):** Stripe integration for potential future premium features (currently "Coming Soon").

## Built With

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
-   **Authentication:** [Clerk](https://clerk.com/)
-   **Database:** [Neon](https://neon.tech/) (PostgreSQL)
-   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
-   **AI Model:** [Google Gemini](https://ai.google.dev/gemini-api)
-   **Background Jobs:** [Inngest](https://www.inngest.com/)
-   **Deployment:** Vercel

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-project-name.git
    cd your-project-name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. Obtain these keys from their respective services:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_YOUR_CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini AI
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

# Neon Database (Drizzle ORM)
# Replace with your actual Neon database connection string
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@YOUR_NEON_HOST/neondb?sslmode=require"

# Inngest
# Get these from your Inngest dashboard
INNGEST_EVENT_KEY=YOUR_INNGEST_EVENT_KEY
INNGEST_SIGNING_KEY=YOUR_INNGEST_SIGNING_KEY # If using signed webhooks

