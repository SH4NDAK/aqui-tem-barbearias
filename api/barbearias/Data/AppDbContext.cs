using jwtRegisterLogin.Models;
using Microsoft.EntityFrameworkCore;

namespace jwtRegisterLogin.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UsuarioModel> Usuario { get; set; }

        public DbSet<ServicoModel> Servico { get; set; }

        public DbSet<AgendaModel> Agenda { get; set; }

        public DbSet<TokenModel> TokenDb { get; set; }
        public DbSet<BarbeariaModel> Barbearia { get; set; }
        public DbSet<BarbeariaUsuarioModel> BarbeariaUsuario { get; set; }
        public DbSet<ServicoUsuarioModel> ServicoUsuario { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BarbeariaUsuarioModel>()
                .HasAlternateKey(c => new { c.Id_usuario, c.Id_barbearia });

            modelBuilder.Entity<ServicoUsuarioModel>()
                .HasAlternateKey(c => new { c.Id_usuario, c.Id_tipo_servico });

            modelBuilder.Entity<ServicoModel>()
                .HasIndex(s => s.Nome)
                .IsUnique();
        }
    }
}
