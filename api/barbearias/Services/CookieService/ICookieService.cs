using System.Threading.Tasks;

namespace jwtRegisterLogin.Services.CookieService
{
    public interface ICookieService
    {
        // string GetCookie(string key);
        bool CookieExists(string key);
        Task<bool> VerificarCookie();
        void SalvarCookie(string token);
    }
}
