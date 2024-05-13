using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;

namespace jwtRegisterLogin.Filters // Substitua 'Filters' pelo namespace onde seus filtros estão localizados
{
    public class AddHeaderParameters : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.Parameters == null)
                operation.Parameters = new List<OpenApiParameter>();

            // Verifique se o contexto corresponde ao método desejado
            if (context.ApiDescription.RelativePath.Contains("ListarServico"))
            {
                // Adicione o header apenas para o método ListarServico
                operation.Parameters.Add(new OpenApiParameter
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Schema = new OpenApiSchema { Type = "string" },
                    Required = true
                });
            }
        }
    }
}
