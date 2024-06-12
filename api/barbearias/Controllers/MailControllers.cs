using jwtRegisterLogin.Models;
using Microsoft.AspNetCore.Mvc;
using jwtRegisterLogin.Dtos;
using jwtRegisterLogin.Models;
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

        [HttpPost]
        public IActionResult SendMail([FromBody] SendMailViewModel sendMailViewModel)
        {
            _mailService.SendMail(sendMailViewModel.Emails, sendMailViewModel.Subject, sendMailViewModel.Body,
                sendMailViewModel.IsHtml);

            return Ok();
        }
    }
}
