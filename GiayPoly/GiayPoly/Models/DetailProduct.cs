namespace GiayPoly.Models
{
    public class DetailProduct
    {
        public Guid Id { get; set; }
        public string SizeName { get; set; }

        public int? Quantity { get; set; }

        public int ProductId { get; set; } = 0;

        //public string Description { get; set; }

    }
}
