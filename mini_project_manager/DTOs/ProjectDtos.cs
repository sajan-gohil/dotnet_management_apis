using System.ComponentModel.DataAnnotations;
using MiniProjectManager.Models;

namespace MiniProjectManager.DTOs;

public class CreateProjectDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }
}

public class ProjectDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<TaskDto> Tasks { get; set; } = new();
}

public class CreateTaskDto
{
    [Required]
    public string Title { get; set; } = null!;
    public DateTime? DueDate { get; set; }
}

public class TaskDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }
}

public class ScheduleTaskInputDto
{
    public string Title { get; set; } = null!;
    public int EstimatedHours { get; set; }
    public DateTime DueDate { get; set; }
    public List<string> Dependencies { get; set; } = new();
}

public class ScheduleRequestDto
{
    public List<ScheduleTaskInputDto> Tasks { get; set; } = new();
}

public class ScheduleResponseDto
{
    public List<string> RecommendedOrder { get; set; } = new();
}
