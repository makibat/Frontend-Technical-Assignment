# 🚀 Frontend-Technical-Assignment 

A Next.js application for a streamlined version of the popular Mines game.

## 💻 Tech Stack

  - Framework: <code>Next.js (App Router)</code>
    
  - State Management: <code>React Context API</code>

  - Styling: <code>SCSS</code>
    
  - Deployment: <code>Vercel</code>

## ⚙️ Getting Started
### Prerequisites

    Node.js v18+

    npm
    
### Installation
    git clone https://github.com/makibat/Frontend-Technical-Assignment.git
    cd Frontend-Technical-Assignment
    npm install
    
### Environment Variables

Create <code>.env.local</code>
```sh
NEXT_PUBLIC_BASE_URL=https://wallet-demo-435v2.ondigitalocean.app
NEXT_PUBLIC_API_KEY=TxDONKnVZslnzVq2kZHoxQt9715WTZHyYVcbij0nQQTKHKIFVYmRGZtOWUP8SnEp
NEXT_PUBLIC_CUSTOMER_ID=b3d7fe33-054d-4fdc-a98e-4461deb24b08
NEXT_PUBLIC_TOKEN=40d80626-e63d-44fa-a801-595cc4624ed3
NEXT_PUBLIC_SESSION_ID=908734530-gh53-4535-tm51-fd1486nr352
```
### Run Locally

    npm run dev

Open http://localhost:3000


## 📚 Project Structure

```sh
src
|
+-- api/                  # API client and endpoint definitions.
|
+-- app/                  # Next.js App Router entry point.
|   |                     
|   +-- (routes)/         # Application routes (page.tsx files).
|   |    +-- components/  # Route-specific components.
|   |    +-- config/      # Route-specific configurations.
|   |   
|   +-- layout.tsx        # Root layout component.
|
+-- components/           # Shared UI components used across the application.
|   +-- ui/               # Primitive components (buttons, inputs).
|   +-- layout/           # Structural components (grids, containers).
|   +-- navbar/           # Main navigation component.
|
+-- config/               # Global configurations, exported env variables etc.
|
+-- providers/            # Context providers.
|
+-- styles/               # Global styling resources.
|
+-- types/                # Shared types used across the application.
|
+-- utils/                # Shared utility functions and helpers.
```
