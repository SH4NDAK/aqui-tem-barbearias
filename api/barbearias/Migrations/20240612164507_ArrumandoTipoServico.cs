using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    /// <inheritdoc />
    public partial class ArrumandoTipoServico : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
            name: "FK_Servico_Usuario_Usuario_id",
            table: "Servico");

            // Remova a coluna
            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Servico");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Servico",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
