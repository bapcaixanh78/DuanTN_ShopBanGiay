namespace GiayPoly.Services
{
    public interface IUploadService
    {
        Task<bool> UploadMultipleImagesAsync(List<IFormFile> files);
    }
}
