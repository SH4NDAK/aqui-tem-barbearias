using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Models
{
    public class AgendaModel
    {
        public int Id { get; set; } 
        public string? Descricao { get; set; }
        public string Data { get; set; }
        public string Horario { get; set; }
        public string NomeDoCliente { get; set; }
        public string? Servico { get; set; }
        public bool? Ativo { get; set; }
        public bool? Pago { get; set; }
    }
}