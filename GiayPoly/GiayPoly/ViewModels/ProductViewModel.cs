namespace GiayPoly.ViewModels
{
    public class ProductViewModel
    {
        public string? Name { get; set; }
        public int? Quantity { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string? Gallery { get; set; }
        public double? Price { get; set; }
        public string? Type { get; set; }
        public int? Sale { get; set; }
        public string? ListProductDetailId { get; set; }
    }
    public class ListID
    {
        public int Id { get; set; }
    }
    public class ListProductModel
    {
        public string ProductName { get; set; }
        public int ProductID { get; set; }
        public int AmountProduct { get; set; }

    }
}
