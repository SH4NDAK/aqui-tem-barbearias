using System;
using System.Net;
using System.Net.Mail;


namespace MailSenderApi
{

    public static class SendEmail{

        public static void Send(string email)
        {
            MailMessage emailMessage = new MailMessage();
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com",587);
                smtpClient.EnableSsl = true;
                smtpClient.Timeout = 60 * 60;
                smtpClient.UseDefaultCredentials = false;
                //email da quem envia
                smtpClient.Credentials = new NetworkCredential("manualdoprogramador93@gmail.com","");
               
               
                emailMessage.From = new MailAddress("manualdoprogramador93@gmail.com", "Barbearia Aqui tem");
                //titulo
                emailMessage.Body = "aaaaaaaaaaa teste de vagabundo";
                //mensagem (codigo)
                emailMessage.Subject = "Email de senha filha da puta";
                emailMessage.IsBodyHtml = true;
                emailMessage.Priority = MailPriority.Normal;
                emailMessage.To.Add(email);

                smtpClient.Send(emailMessage);
            }
            catch(Exception ex){
                return;
            }
        }
    }
}