InsightFlow
Smart Surveys. Actionable Insights.

InsightFlow is a modern, responsive survey web application designed to help organizations collect, manage, and analyze feedback efficiently. The platform provides a seamless user experience with authentication flow simulation, dynamic survey creation, and real-time UI updates using client-side storage.

This project demonstrates strong fundamentals in frontend architecture, UI/UX design, DOM manipulation, and state management using Vanilla JavaScript.

Overview

InsightFlow enables users to:

Create and manage surveys

Add customizable answer options

Participate in survey voting

View survey statistics

Experience a structured authentication flow

Navigate enterprise and solution-focused product pages

The system is built entirely using frontend technologies and simulates authentication and persistence using the browser’s LocalStorage API.

Key Features
Authentication Simulation

Login and Signup interface

Social login simulation (Google / Apple)

Session state handling via LocalStorage

Conditional UI rendering (guest vs authenticated)

Automatic dashboard redirection for logged-in users

Survey Management

Create new surveys dynamically

Add multiple answer options

Form validation enforcement

Dynamic survey card rendering

Modal-based survey voting system

Persistent survey storage using LocalStorage

Dashboard

Survey statistics overview

Recent projects display

Question bank preview

Interactive survey cards

User Experience

Responsive navigation with dropdown menus

Mobile menu toggle

Modal interactions

Clean, modern UI with gradient branding

Smooth layout transitions

Fully responsive structure

Project Structure
InsightFlow/
│
├── index.html                # Landing page
├── login.html                # Login page
├── signup.html               # Registration page
├── welcome.html              # Welcome screen with redirect
├── personalize.html          # User personalization flow
├── dashboard.html            # Authenticated user dashboard
│
├── online-surveys.html       # Product overview
├── enterprise.html           # Enterprise solutions
├── customer-feedback.html    # Customer experience solution
├── employee-engagement.html  # HR solution
├── market-research.html      # Market research solution
├── integrations.html         # Integration ecosystem
│
├── style.css                 # Global styling system
└── script.js                 # Core application logic

Technology Stack

HTML5

CSS3

Vanilla JavaScript (ES6)

LocalStorage API

Google Fonts (Inter)

No backend framework or server environment is required.

Core Concepts Demonstrated

DOM manipulation

State management

Conditional rendering

Event handling

Modular UI structure

Form validation

Dynamic content injection

Client-side data persistence

How to Run the Project

Open the project directory.

Launch index.html in your browser.

No installation, build tools, or package managers required.

Future Enhancements

Backend integration (Node.js / Firebase)

Secure authentication system

Database integration (MongoDB / Firestore)

Data visualization with charts

Role-based access control

Admin dashboard

API-based survey analytics

Deployment with CI/CD pipeline

Use Case

This project can be used as:

Frontend portfolio showcase

UI/UX demonstration

JavaScript practice project

Internship or academic submission

Foundation for a full-stack SaaS application
