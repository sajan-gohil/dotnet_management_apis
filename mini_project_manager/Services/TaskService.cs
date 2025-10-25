using Microsoft.EntityFrameworkCore;
using MiniProjectManager.Data;
using MiniProjectManager.DTOs;
using MiniProjectManager.Models;

namespace MiniProjectManager.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _db;

    public TaskService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<TaskDto> CreateTaskAsync(int userId, int projectId, CreateTaskDto dto)
    {
        var project = await _db.Projects.SingleOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);
        if (project == null) throw new KeyNotFoundException("Project not found");

        var task = new TaskItem { Title = dto.Title, DueDate = dto.DueDate, ProjectId = projectId };
        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();

        return new TaskDto { Id = task.Id, Title = task.Title, DueDate = task.DueDate, IsCompleted = task.IsCompleted };
    }

    public async Task<TaskDto> UpdateTaskAsync(int userId, int taskId, TaskDto dto)
    {
        var task = await _db.Tasks.Include(t => t.Project).SingleOrDefaultAsync(t => t.Id == taskId);
        if (task == null || task.Project == null || task.Project.UserId != userId) throw new KeyNotFoundException("Task not found");

        task.Title = dto.Title;
        task.DueDate = dto.DueDate;
        task.IsCompleted = dto.IsCompleted;
        await _db.SaveChangesAsync();

        return new TaskDto { Id = task.Id, Title = task.Title, DueDate = task.DueDate, IsCompleted = task.IsCompleted };
    }

    public async Task DeleteTaskAsync(int userId, int taskId)
    {
        var task = await _db.Tasks.Include(t => t.Project).SingleOrDefaultAsync(t => t.Id == taskId);
        if (task == null || task.Project == null || task.Project.UserId != userId) throw new KeyNotFoundException("Task not found");

        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();
    }
}
