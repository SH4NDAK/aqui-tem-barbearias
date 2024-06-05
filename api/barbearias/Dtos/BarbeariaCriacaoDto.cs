using System;
using System.ComponentModel.DataAnnotations;

namespace jwtRegisterLogin.Dtos
{
    public class BarbeariaCriacaoDto
    {
        [Required(ErrorMessage = "O campo usuário é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo email é obrigatório"), ValidateEmailOrPhoneNumber(ErrorMessage = "Email inválido!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo telefone é obrigatório"), ValidateEmailOrPhoneNumber(ErrorMessage = "Telefone inválido!")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo CNPJ é obrigatório"), ValidateCNPJ(ErrorMessage = "CNPJ inválido!")]
        public string CNPJ { get; set; }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        public string Senha { get; set; }

        public class ValidateCNPJAttribute : ValidationAttribute
        {
            public override bool IsValid(object value)
            {
                var cnpj = value as string;

                if (string.IsNullOrEmpty(cnpj))
                    return false;

                cnpj = cnpj.Replace(".", "").Replace("-", "").Replace("/", "");

                if (cnpj.Length != 14)
                    return false;

                int[] multiplier1 = {5,4,3,2,9,8,7,6,5,4,3,2};
                int[] multiplier2 = {6,5,4,3,2,9,8,7,6,5,4,3,2};

                string tempCnpj = cnpj.Substring(0, 12);
                int sum = 0;

                for (int i = 0; i < 12; i++)
                    sum += int.Parse(tempCnpj[i].ToString()) * multiplier1[i];

                int rest = (sum % 11);

                if (rest < 2)
                    rest = 0;
                else
                    rest = 11 - rest;

                string digit = rest.ToString();
                tempCnpj += digit;
                sum = 0;

                for (int i = 0; i < 13; i++)
                    sum += int.Parse(tempCnpj[i].ToString()) * multiplier2[i];

                rest = (sum % 11);

                if (rest < 2)
                    rest = 0;
                else
                    rest = 11 - rest;

                digit += rest.ToString();

                return cnpj.EndsWith(digit);
            }
        }
    }
}
