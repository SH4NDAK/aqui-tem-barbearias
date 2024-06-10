using jwtRegisterLogin.Enum;
namespace jwtRegisterLogin.Models
{
    public class BarbeariaModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public string Telefone { get; set; }
        public string? Codigo_auth { get; set; }
        public Boolean Ativo { get; set; } = true;

        public DateTime Dat_cad { get; set; } = DateTime.Now;

        public BarbeariaModel()
        {
            Codigo_auth = GenerateCodigoAuth();
        }


        private string GenerateCodigoAuth()
        {
            Random random = new Random();
            int randomNumber = random.Next(0, 1000000); // Gera um número entre 0 e 999999
            return randomNumber.ToString("D6"); // Formata o número para ser uma string de 6 dígitos, com zeros à esquerda se necessário
        }
    }
}