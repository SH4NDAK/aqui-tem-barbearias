using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jwtRegisterLogin.Migrations
{
    /// <inheritdoc />
    public partial class ConstraintBarbeariaUsuario2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UniqueCombination",
                table: "BarbeariaUsuario",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UniqueCombination",
                table: "BarbeariaUsuario");
        }
    }
}
