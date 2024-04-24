using Microsoft.AspNetCore.Mvc;

[Route("/[]")]
[ApiController]
public class AuthController : ControllerBase
{
    public IActionResult Get()
    {
        return Ok("Teste");
    }
}