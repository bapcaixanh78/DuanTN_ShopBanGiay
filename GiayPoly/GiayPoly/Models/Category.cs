﻿using System.ComponentModel.DataAnnotations;

namespace GiayPoly.Models
{
    public class Category
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }
    }
}
