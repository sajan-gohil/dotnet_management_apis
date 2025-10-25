using System.ComponentModel.DataAnnotations;

namespace MiniProjectManager.DTOs;

public class RegisterDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Username { get; set; } = null!;

    [Required]
    [StringLength(100, MinimumLength = 6)]
    public string Password { get; set; } = null!;
}

public class LoginDto
{
    [Required]
    public string Username { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}

public class AuthResponseDto
{
    public string Token { get; set; } = null!;
}
