# Mini Project Manager (Assignment 2)

Minimal .NET 8 Web API for managing projects and tasks with JWT authentication.

How to run

1. cd mini_project_manager
2. dotnet restore
3. dotnet run

Default DB: SQLite file `mini_project_manager.db` will be created next to the app.

Endpoints

- POST /api/auth/register { username, password }
- POST /api/auth/login { username, password }
- GET /api/projects (auth)
- POST /api/projects (auth)
- GET /api/projects/{id} (auth)
- DELETE /api/projects/{id} (auth)
- POST /api/projects/{projectId}/tasks (auth)
- PUT /api/tasks/{taskId} (auth)
- DELETE /api/tasks/{taskId} (auth)

Notes
- The JWT secret is configured in `appsettings.json` under `Jwt:Key`. Change for production.
