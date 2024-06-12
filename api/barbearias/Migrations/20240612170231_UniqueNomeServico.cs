using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    /// <inheritdoc />
    public partial class UniqueNomeServico : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Servico",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Servico_Nome",
                table: "Servico",
                column: "Nome",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Servico_Nome",
                table: "Servico");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Servico",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
