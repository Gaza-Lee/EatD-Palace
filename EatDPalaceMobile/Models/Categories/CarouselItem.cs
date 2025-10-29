using CommunityToolkit.Mvvm.ComponentModel;

namespace EatDPalaceMobile.Models.Categories
{
    public class CarouselItem : ObservableObject
    {
        public string ImageUrl { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Id { get; set; }
    }
}
