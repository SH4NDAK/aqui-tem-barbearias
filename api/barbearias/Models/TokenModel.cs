namespace jwtRegisterLogin.Models
{
    public class TokenModel
    {
        public int Id { get; set; }
        public string? Token { get; set; }
        
        public string CriadaEm { get; set; }

        public string ExpiraEm { get; set; }

        public int IdUsuario { get; set; }
    }

}