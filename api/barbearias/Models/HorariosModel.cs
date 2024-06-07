using jwtRegisterLogin.Models;

namespace jwtRegisterLogin.Models
{
    public class HorariosModel
    {
        public int Id { get; set; } 
        public int BarbeiroId { get; set; }
        public DateTime Dia { get; set; }
        public string HoraMax { get; set; }
        public string HoraMin { get; set; }
    }
}