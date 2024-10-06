using Microsoft.EntityFrameworkCore;
using signalr_project_backend.Models;

namespace signalr_project_backend.Datas
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
            
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options ) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
    }
}
