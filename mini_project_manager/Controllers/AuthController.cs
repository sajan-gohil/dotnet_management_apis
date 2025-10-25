using Microsoft.AspNetCore.Mvc;
using MiniProjectManager.DTOs;
using MiniProjectManager.Services;

namespace MiniProjectManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth)
    {
        _auth = auth;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        try
        {
            var res = await _auth.RegisterAsync(dto);
            return Ok(res);
        }
        catch (ApplicationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var res = await _auth.LoginAsync(dto);
            return Ok(res);
        }
        catch (ApplicationException ex)
        {
            return Unauthorized(new { error = ex.Message });
        }
    }
}
