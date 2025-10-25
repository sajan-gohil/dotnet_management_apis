using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniProjectManager.DTOs;
using MiniProjectManager.Services;

namespace MiniProjectManager.Controllers;

[ApiController]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly ITaskService _tasks;

    public TasksController(ITaskService tasks)
    {
        _tasks = tasks;
    }

    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpPost("api/projects/{projectId}/tasks")]
    public async Task<IActionResult> Create(int projectId, [FromBody] CreateTaskDto dto)
    {
        try
        {
            var t = await _tasks.CreateTaskAsync(UserId, projectId, dto);
            return Created($"/api/tasks/{t.Id}", t);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPut("api/tasks/{taskId}")]
    public async Task<IActionResult> Update(int taskId, [FromBody] TaskDto dto)
    {
        try
        {
            var t = await _tasks.UpdateTaskAsync(UserId, taskId, dto);
            return Ok(t);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("api/tasks/{taskId}")]
    public async Task<IActionResult> Delete(int taskId)
    {
        try
        {
            await _tasks.DeleteTaskAsync(UserId, taskId);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}
