using Microsoft.AspNetCore.Mvc;
using jwtRegisterLogin.Services.MailService;

namespace jwtRegisterLogin.Controllers
{
    [Route("api/mails")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailService _mailService;
        public MailController(IMailService mailService)
        {
            _mailService = mailService;
        }

         [HttpPost("send-recovery-email")]
        public IActionResult SendRecoveryEmail([FromBody] EmailRequest emailRequest)
        {
            var emails = new[] { emailRequest.RecipientEmail }; // E-mail do destinatário vindo da requisição
            var subject = "Seu Código de Recuperação";
            var body = "Aqui está o código que você solicitou:";
            _mailService.SendMail(emails, subject, body, emailRequest.OTP);
            return Ok(new { message = "Email enviado com sucesso!" });
        }
    }

    public class EmailRequest
    {
        public string OTP { get; set; }
        public string RecipientEmail { get; set; }
    }
}

