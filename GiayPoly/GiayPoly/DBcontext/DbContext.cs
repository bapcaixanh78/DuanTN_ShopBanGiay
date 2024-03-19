using GiayPoly.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace GiayPoly.DBcontext
{
    public class DbWebContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbWebContext(DbContextOptions options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;

        }
         public DbSet<Oder> Oders{ get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
    }


}
