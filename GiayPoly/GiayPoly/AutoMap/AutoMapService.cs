using AutoMapper;
using GiayPoly.Models;
using GiayPoly.ViewModels;

namespace GiayPoly.AutoMap
{
    public class AutoMapService : Profile
    {
        public AutoMapService() { 
            CreateMap<Product,ProductViewModel>().ReverseMap();
        }
    }
}
