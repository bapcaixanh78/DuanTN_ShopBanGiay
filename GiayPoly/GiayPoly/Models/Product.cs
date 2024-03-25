using System.ComponentModel.DataAnnotations;

namespace GiayPoly.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Quantity { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public double? Price { get; set; }
        public string? Type { get; set; }
        public string? ImgSlug { get; set; }
        public string? Sizes { get; set; }
        public string? ListProductDetailId { get; set; }

        public string? Gallery { get; set; }
        public string? VoucherCode { get; set; }
        public int? Sale { get; set; }
        //public int? Color{ get; set; }
        //public string? Brand { get; set; } //tĩnh
        public int? Oder { get; set; } //tĩnh
    }
}
