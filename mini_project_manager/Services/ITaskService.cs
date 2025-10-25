using MiniProjectManager.DTOs;

namespace MiniProjectManager.Services;

public interface ITaskService
{
    Task<TaskDto> CreateTaskAsync(int userId, int projectId, CreateTaskDto dto);
    Task<TaskDto> UpdateTaskAsync(int userId, int taskId, TaskDto dto);
    Task DeleteTaskAsync(int userId, int taskId);
}
