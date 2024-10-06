using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using signalr_project_backend;
using signalr_project_backend.Datas;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
          options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Service SignalR
builder.Services.AddSignalR();

builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
{
    builder
        .WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
}));


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ���͡�˹���鹷ҧ���Ѻ SignalR hub
// Hub �繤�����ѡ� SignalR ���Ѵ��á��������������ҧ���͹�������������� 
app.MapHub<UserHub>("/userHub");

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
