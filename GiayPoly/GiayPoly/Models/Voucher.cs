using System.ComponentModel.DataAnnotations;

namespace GiayPoly.Models
{
    public class Voucher
    {
        [Key]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Code{ get; set; }
        public DateTime? Expiry { get; set; }
        public int ? ValueVoucher { get; set; }
        public string? ExpiryView { get; set; }
        public int ? TurnUseVoucher { get; set; }
    }
}
