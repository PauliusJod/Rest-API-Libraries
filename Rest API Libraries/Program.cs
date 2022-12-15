using Rest_API_Libraries.Repositories;
using Rest_API_Libraries.Properties;
using Microsoft.AspNetCore.Identity;
//using Rest_API_Libraries.Entities;
//using Rest_API_Libraries.Auth.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Rest_API_Libraries.Auth;
using Rest_API_Libraries;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
            policy =>
            {
                policy.WithOrigins("https://localhost:44439",
                                    "http://www.contoso.com"); // add the allowed origins
            });
});
builder.Services.AddControllersWithViews();

builder.Services.AddControllers();

builder.Services.AddIdentity<LibrariesUser, IdentityRole>()
    .AddEntityFrameworkStores<LibrariesDbContext>()
    .AddDefaultTokenProviders();


builder.Services.AddDbContext<LibrariesDbContext>();
builder.Services.AddTransient<IBooksRepository, BooksRepository>();
builder.Services.AddTransient<ILibrariesRepositories, LibrariesRepositories>();
builder.Services.AddTransient<ICitiesRepositories, CitiesRepositories>();
builder.Services.AddTransient<IJwtTokenService, JwtTokenService>();



builder.Services.AddScoped<AuthDbSeeder>();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(PolicyNames.ResourceOwner, policy => policy.Requirements.Add(new ResourceOwnerRequirement()));
});
builder.Services.AddSingleton<IAuthorizationHandler, ResourceOwnerAuthorizationHandler>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"];
        options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"];
        options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]));
    });


builder.Services.AddCors(cr =>
{
    cr.AddPolicy("allowAll", cp =>
    {
        cp.AllowAnyOrigin();
        cp.AllowAnyMethod();
        cp.AllowAnyHeader();
    });
});


builder.Services.AddSwaggerGen(opts => {
    opts.AddSecurityDefinition("JWT", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    opts.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "JWT"
                }
            },
            new List<string>()
        }
    });
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("allowAll");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.UseAuthentication();    //Nauji
app.UseAuthorization();     //Nauji

app.MapFallbackToFile("index.html");

app.UseCors("allowAll");
var dbSeeder = app.Services.CreateScope().ServiceProvider.GetRequiredService<AuthDbSeeder>();
await dbSeeder.SeedAsync();
app.Run();
