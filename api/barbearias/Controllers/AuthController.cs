using Microsoft.AspNetCore.Mvc;

[ApiController]
public class AuthController : ControllerBase
{
    [HttpGet("auth")]
    public IActionResult Get()
    {
        return Ok("Teste");
    }
}