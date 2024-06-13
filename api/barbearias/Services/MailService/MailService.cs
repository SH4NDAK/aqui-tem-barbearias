using System.Net;
using System.Net.Mail;
using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Services.MailService
{
    public class MailService : IMailService
    {
        private string smtpAddress => "smtp.gmail.com";
        private int portNumber => 587;
        private string emailFromAddress => "sendmail.dotnetnapratica@gmail.com";
        private string password => "dotnet100";

        public void AddEmailsToMailMessage(MailMessage mailMessage, string[] emails)
        {
            foreach (var email in emails)
            {
                mailMessage.To.Add(email);
            }
        }

        public void SendMail(string[] emails, string subject, string body, string code, bool isHtml = false)
        {
            using(MailMessage mailMessage = new MailMessage())
            {
                mailMessage.From = new MailAddress(emailFromAddress);
                AddEmailsToMailMessage(mailMessage, emails);
                mailMessage.Subject = subject;
                mailMessage.Body = $"{body}\n\nEste é o seu código: {code}";
                mailMessage.IsBodyHtml = isHtml;
                using(SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                {
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(emailFromAddress, password);
                    smtp.Send(mailMessage);
                }
            }
        }

        public void SendMail(string[] emails, string subject, string body, string code, string oTP)
        {
            throw new NotImplementedException();
        }

        public void SendMail(string[] emails, string subject, string body, bool isHtml = false)
        {
            throw new NotImplementedException();
        }

        public void SendMail(string[] emails, string subject, string body, string oTP)
        {
            throw new NotImplementedException();
        }
    }
}
