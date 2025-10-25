using MiniProjectManager.DTOs;

namespace MiniProjectManager.Services;

public interface IProjectService
{
    Task<List<ProjectDto>> GetProjectsAsync(int userId);
    Task<ProjectDto> CreateProjectAsync(int userId, CreateProjectDto dto);
    Task<ProjectDto> GetProjectAsync(int userId, int projectId);
    Task DeleteProjectAsync(int userId, int projectId);

    Task<ScheduleResponseDto> ScheduleProjectAsync(int userId, int projectId, ScheduleRequestDto request);
}
