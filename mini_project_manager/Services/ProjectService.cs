using Microsoft.EntityFrameworkCore;
using MiniProjectManager.Data;
using MiniProjectManager.DTOs;
using MiniProjectManager.Models;

namespace MiniProjectManager.Services;

public class ProjectService : IProjectService
{
    private readonly AppDbContext _db;

    public ProjectService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<ProjectDto>> GetProjectsAsync(int userId)
    {
        return await _db.Projects
            .Where(p => p.UserId == userId)
            .Include(p => p.Tasks)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                CreatedAt = p.CreatedAt,
                Tasks = p.Tasks.Select(t => new TaskDto { Id = t.Id, Title = t.Title, DueDate = t.DueDate, IsCompleted = t.IsCompleted }).ToList()
            }).ToListAsync();
    }

    public async Task<ProjectDto> CreateProjectAsync(int userId, CreateProjectDto dto)
    {
        var project = new Project { Title = dto.Title, Description = dto.Description, UserId = userId };
        _db.Projects.Add(project);
        await _db.SaveChangesAsync();
        return new ProjectDto { Id = project.Id, Title = project.Title, Description = project.Description, CreatedAt = project.CreatedAt };
    }

    public async Task<ProjectDto> GetProjectAsync(int userId, int projectId)
    {
        var p = await _db.Projects.Include(p => p.Tasks).SingleOrDefaultAsync(x => x.Id == projectId && x.UserId == userId);
        if (p == null) throw new KeyNotFoundException("Project not found");
        return new ProjectDto { Id = p.Id, Title = p.Title, Description = p.Description, CreatedAt = p.CreatedAt, Tasks = p.Tasks.Select(t => new TaskDto { Id = t.Id, Title = t.Title, DueDate = t.DueDate, IsCompleted = t.IsCompleted }).ToList() };
    }

    public async Task DeleteProjectAsync(int userId, int projectId)
    {
        var p = await _db.Projects.SingleOrDefaultAsync(x => x.Id == projectId && x.UserId == userId);
        if (p == null) throw new KeyNotFoundException("Project not found");
        _db.Projects.Remove(p);
        await _db.SaveChangesAsync();
    }
}
