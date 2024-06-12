using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Services.MailService
{
    public interface IMailService
    {
        void SendMail(string[] emails, string subject, string body, bool isHtml = false);
    }
}
