using jwtRegisterLogin.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    //atributo de validação para verificar se o valor é um email ou número de telefone válido
    public class ValidateEmailOrPhoneNumberAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string emailOrPhoneNumber = value as string;

            //verifica se o valor é um número de telefone ou um endereço de e-mail
            if (IsValidEmail(emailOrPhoneNumber) || IsValidPhoneNumber(emailOrPhoneNumber))
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult("O campo deve ser um endereço de email ou número de telefone válido.");
            }
        }
        
        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private bool IsValidPhoneNumber(string phoneNumber)
        {
            return phoneNumber.Length == 11 && phoneNumber.All(char.IsDigit);
        }
    }

    public class UsuarioCriacaoDto
    {
        [Required(ErrorMessage = "O campo usuário é obrigatório")]
        public string Usuario { get; set; }

        [Required(ErrorMessage = "O campo email ou número de telefone é obrigatório")]
        [ValidateEmailOrPhoneNumber(ErrorMessage = "Email ou número de telefone inválido!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "O campo cargo é obrigatório")]
        public CargoEnum Cargo { get; set; }
    }
}
