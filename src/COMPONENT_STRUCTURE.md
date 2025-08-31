# Nexus Component Structure & Architecture

## Overview
This document summarizes the organization of the `src` folder, including key components, pages, context, and data files.

---

## Folder Structure

- **components/**
  - `chat/`: ChatMessage, ChatUserList
  - `collaboration/`: CollaborationRequestCard
  - `entrepreneur/`: EntrepreneurCard
  - `investor/`: InvestorCard
  - `layout/`: DashboardLayout, Navbar, Sidebar
  - `ui/`: Avatar, Badge, Button, Card, Input
- **context/**
  - AuthContext (authentication logic)
- **data/**
  - collaborationRequests, messages, users (mock/sample data)
- **pages/**
  - `auth/`: ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage
  - `chat/`: ChatPage
  - `dashboard/`: EntrepreneurDashboard, InvestorDashboard
  - `deals/`: DealsPage
  - `documents/`: DocumentsPage
  - `entrepreneurs/`: EntrepreneursPage
  - `help/`: HelpPage
  - `investors/`: InvestorsPage
  - `messages/`: MessagesPage
  - `notifications/`: NotificationsPage
  - `profile/`: EntrepreneurProfile, InvestorProfile
  - `settings/`: SettingsPage
- **types/**
  - index.ts (TypeScript types)
- **App.tsx**: Main app component
- **main.tsx**: Entry point
- **index.css**: Global styles

---

## Architecture Notes
- **Component-based**: UI is split into reusable components by domain (chat, collaboration, etc.) and UI primitives (Avatar, Button, etc.).
- **Context API**: Used for authentication state management.
- **Pages**: Each feature/page is separated for clarity and routing.
- **Data**: Mock data files for development/testing.
- **TypeScript**: Used for type safety across components and data.

---

## Next Steps
- Ensure all new features/components follow this structure.
- Update this document as new modules are added.
