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
    }
}