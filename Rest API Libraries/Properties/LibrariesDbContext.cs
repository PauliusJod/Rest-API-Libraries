using Rest_API_Libraries.Auth;
using Rest_API_Libraries.Auth.Model;
using Rest_API_Libraries.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Rest_API_Libraries.Properties
{
    public class LibrariesDbContext : IdentityDbContext<LibrariesUser>
    {
        public DbSet<Library> Libraries { get; set; }
        public DbSet<User> Users { get; set; }
        //public DbSet<Book> Books { get; set; }
        //public DbSet<Ebook> Ebooks { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server =DESKTOP-A2LFQQD; Database=Libraries2Db; Trusted_Connection = True");
            optionsBuilder.UseSqlServer("Server=tcp:battleshipnewdb.database.windows.net,1433;Initial Catalog=Libraries2DB;Persist Security Info=False;User ID=CloudSA13cebd8f;Password=Paliusxxx123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }

        //Server = localhost\\MSSQLSERVER01; Database = warehouseapi; Trusted_Connection = True;
        //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLSERVER01;Database=LibrariesDb;Trusted_Connection=True;");
    }
}
