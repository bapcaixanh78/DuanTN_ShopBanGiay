using System.ComponentModel.DataAnnotations;

namespace GiayPoly.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        public string? UserName { get; set; }
         public int? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int? role { get; set; }
    }

    public class EmailUser
    {
        public string? Email { get; set; }
    }
    public class Login
    {
        public string? Email { get; set; }
        public string Password { get; set; }
        public string? role { get; set; }
    }

}
