using System;
using System.Data.SqlClient;


// classe de conexão com o banco de dados
public class DbConnection
{
    // variavel de conexao
    private readonly string conn;

    public DbConnection(string conn){
        this.conn = conn;
    }

    // função que executa querys que não retornam dados (insert, update, delete)
    public void ExecuteNonQuery(string query){
        using (SqlConnection connection = new SqlConnection(conn)){
            conn.Open();
        }

    }
    
}