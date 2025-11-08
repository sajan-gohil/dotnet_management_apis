# Dotnet Management APIs & Mini Project Manager

## Overview
This repository contains two full-stack applications developed as part of home assignments (made with co-pilot assistance):

1. **Basic Task Manager**
2. **Mini Project Manager**

Both projects use C# (.NET 8) for the backend and React + TypeScript for the frontend. All required functionalities have been implemented, including scheduling. The applications have not been deployed yet.

---

## Home Assignment 1 – Basic Task Manager
**Credits:** 10

### Objective
Build a simple full-stack application to manage tasks, demonstrating fundamental backend and frontend skills.

### Functional Requirements
- Display a list of tasks
- Add a new task with a description
- Mark a task as completed or uncompleted
- Delete a task

### Backend (C# .NET 8)
- RESTful API using .NET 8 Core
- In-memory data storage (no database)
- Task model with required properties
- Endpoints for CRUD operations

### Frontend (React + TypeScript)
- Single-page application
- List all tasks
- UI for adding, toggling, and deleting tasks
- API integration using Axios or Fetch
- State management with React Hooks

### Enhancements
- Task filtering (All / Completed / Active)
- Basic design
- Save tasks in localStorage

---

## Home Assignment 2 – Mini Project Manager
**Credits:** 20

### Objective
Build a minimal project management system with authentication, entity relationships, and modular code structure.

### Core Features
#### Authentication
- User registration and login (JWT)
- Users access only their own data

#### Projects
- Multiple projects per user
- Project: Title (required), Description (optional), Creation date (auto)

#### Tasks
- Multiple tasks per project
- Task: Title (required), Due date (optional), Completion status, Reference to parent project

### Backend (C# .NET 8)
- REST API with .NET 8 Core & Entity Framework Core
- In-memory or SQLite storage
- JWT authentication
- DataAnnotations for validation
- Separation of concerns (DTOs, services, models)

### Frontend (React + TypeScript)
- Login/Register page
- Dashboard (list of projects)
- Project details (task list)
- Create/delete projects
- Add/update/delete tasks
- Toggle task completion
- Form validation & error handling
- JWT storage for authenticated requests
- React Router for navigation

### Enhancements
- Loading indicators & user feedback
- Mobile-friendly design
- (Not yet deployed) Deployment instructions for backend (Render) and frontend (Vercel)

---

## Smart Scheduler API (Enhancement)
**Credits:** 10

### Feature
Endpoint to help users plan work automatically:

**POST** `/api/v1/projects/{projectId}/schedule`

#### Example Input/Output
Input: List of tasks with due dates
Output: Optimized schedule for task completion

---

## Deployment
The applications have not been deployed yet.

---

## Repository Structure
- `basic_task_manager/` – Basic Task Manager (backend & frontend)
- `mini_project_manager/` – Mini Project Manager (backend & frontend)
