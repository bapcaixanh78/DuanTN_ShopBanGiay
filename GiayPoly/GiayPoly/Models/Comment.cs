using System.ComponentModel.DataAnnotations;

namespace GiayPoly.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string? CreatedBy { get; set; } = null;
        [Required(ErrorMessage = "Content is required")]
        public string? Content { get; set; } = null;
        public int ProductId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.Date;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow.Date;
    }
}
