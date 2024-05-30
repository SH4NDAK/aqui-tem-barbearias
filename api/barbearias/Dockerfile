FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
RUN dotnet tool install --global dotnet-ef
COPY ["jwtRegisterLogin.csproj", "./"]
RUN dotnet restore "jwtRegisterLogin.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "jwtRegisterLogin.csproj" -c Release -o /app/build

FROM build AS migrations
WORKDIR /src
RUN dotnet ef database update

FROM build AS publish
WORKDIR /src
RUN dotnet publish "jwtRegisterLogin.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "jwtRegisterLogin.dll", "--urls", "http://0.0.0.0:5028"]
