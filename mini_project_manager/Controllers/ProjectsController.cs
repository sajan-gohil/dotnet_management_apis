using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniProjectManager.DTOs;
using MiniProjectManager.Services;

namespace MiniProjectManager.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projects;

    public ProjectsController(IProjectService projects)
    {
        _projects = projects;
    }

    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var res = await _projects.GetProjectsAsync(UserId);
        return Ok(res);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProjectDto dto)
    {
        var p = await _projects.CreateProjectAsync(UserId, dto);
        return CreatedAtAction(nameof(GetById), new { id = p.Id }, p);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var p = await _projects.GetProjectAsync(UserId, id);
            return Ok(p);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _projects.DeleteProjectAsync(UserId, id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPost("{projectId}/schedule")]
    public async Task<IActionResult> Schedule(int projectId, [FromBody] ScheduleRequestDto request)
    {
        try
        {
            var res = await _projects.ScheduleProjectAsync(UserId, projectId, request);
            return Ok(res);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}
