# My Portfolio

Welcome to my portfolio repository! This repository contains the source code for my personal portfolio website.

## Overview

This portfolio showcases my skills, projects, certifications, and experience in web development. It serves as a central hub for anyone interested in learning more about my work and capabilities.

## Deployment

The portfolio is deployed on Vercel and can be accessed [here](https://khamseaffan.com/).

Production builds run `prisma migrate deploy`, then `next build`. Set these environment variables in the Vercel project (see `.env.example`):

- `DATABASE_URL`
- `DIRECT_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Features

- **Projects**: View details about the projects I've worked on, including descriptions, technologies used, and links to GitHub repositories or live demos.
- **Certifications**: Explore the certifications I've obtained, along with brief descriptions and verification links.
- **Experience**: Learn about my professional experience, including roles, responsibilities, and achievements.
- **Tech Stack**: Discover the technologies and tools I'm proficient in, organized into categories for easy reference.
- **Carousel**: The portfolio includes a carousel component that enables smooth scrolling and navigation through project and certification cards. The carousel provides an intuitive and interactive way to explore the content.
  - **Dynamic Navigation**: Next and previous buttons are hidden by default and become visible only when overflow occurs, ensuring a clutter-free user experience while still providing easy navigation through the content.

## Technologies Used

- HTML
- CSS
- JavaScript
- React.js
- Vercel (for deployment)

## How to Contribute

If you have any suggestions, improvements, or feedback, feel free to open an issue or submit a pull request. Your contributions are highly appreciated!



