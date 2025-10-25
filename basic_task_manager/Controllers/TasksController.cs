using Microsoft.AspNetCore.Mvc;
using DotnetManagementApis.Models;

namespace DotnetManagementApis.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static readonly List<TaskItem> _tasks = new();

    [HttpGet]
    public ActionResult<IEnumerable<TaskItem>> Get()
    {
        return Ok(_tasks);
    }

    [HttpPost]
    public ActionResult<TaskItem> Post([FromBody] TaskItem item)
    {
        if (item == null || string.IsNullOrWhiteSpace(item.Description))
            return BadRequest("Description is required.");

        item.Id = Guid.NewGuid();
        _tasks.Add(item);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpGet("{id}")]
    public ActionResult<TaskItem> GetById(Guid id)
    {
        var found = _tasks.FirstOrDefault(t => t.Id == id);
        if (found == null) return NotFound();
        return Ok(found);
    }

    [HttpPut("{id}")]
    public ActionResult<TaskItem> Put(Guid id, [FromBody] TaskItem update)
    {
        var existing = _tasks.FirstOrDefault(t => t.Id == id);
        if (existing == null) return NotFound();
        if (update == null) return BadRequest();

        existing.Description = update.Description ?? existing.Description;
        existing.IsCompleted = update.IsCompleted;

        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(Guid id)
    {
        var existing = _tasks.FirstOrDefault(t => t.Id == id);
        if (existing == null) return NotFound();
        _tasks.Remove(existing);
        return NoContent();
    }
}
