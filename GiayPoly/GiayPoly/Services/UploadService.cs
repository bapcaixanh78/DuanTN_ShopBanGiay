using Azure.Core;
using System.Net.Http.Headers;

namespace GiayPoly.Services
{
    public class UploadService : IUploadService
    {

        public async Task<bool> UploadMultipleImagesAsync(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return false;

            foreach (var file in files)
            {
                if (file == null || file.Length == 0)
                    return false;

                // Validate file type if needed
                if (!file.ContentType.StartsWith("image/"))
                    return false;

                var folderPath = Path.Combine("wwwroot\\media\\product");
                var pathToSave = Path.Combine(folderPath);
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            return true;

        }
    }
}
