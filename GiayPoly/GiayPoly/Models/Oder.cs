using System.ComponentModel.DataAnnotations;

namespace GiayPoly.Models
{
    public class Oder
    {
        [Key]
        public Guid Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Description { get; set; }
        public string? Address { get; set; }
        public int? PhoneNumber{ get; set; }
        public double? PriceOder { get; set; }
         public string? VoucherCode { get; set; }
        public string? DayOder { get; set; }
        public int? Status { get; set; } //tĩnh
        public string? ListProduct { get; set; }
    }
}
