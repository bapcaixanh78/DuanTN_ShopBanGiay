using GiayPoly.DBcontext;
using Microsoft.AspNetCore.Mvc;

namespace GiayPoly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly DbWebContext _context;
        public CommentController(DbWebContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetList")]
        public IActionResult GetList()
        {
            var comments = _context.Comments.ToList();
            if (comments != null)
            {
                return Ok(comments);
            }
            else { return BadRequest(null); }
        }
        [HttpGet]
        [Route("GetById")]
        public IActionResult GetById(int id)
        {
            var comment = _context.Comments.Find(id);
            if (comment != null)
            {
                return Ok(comment);
            }
            else { return BadRequest(null); }
        }
        [HttpGet]
        [Route("GetByEmail")]
        public IActionResult GetById(string email)
        {
            if (!string.IsNullOrEmpty(email))
            {
                var comment = _context.Comments.Find(email);
                if (comment != null)
                {
                    return Ok(comment);
                }
                return BadRequest(null);
            }
           
            else { return BadRequest(null); }
        }
        [HttpGet]
        [Route("GetByProductId")]
        public IActionResult GetByProductId(int id)
        {
            if (id != 0)
            {
                var comment = _context.Comments.Where(x=>x.ProductId == id).OrderByDescending(u=>u.Id).ToList();
                if (comment != null)
                {
                    return Ok(comment);
                }
                return BadRequest(null);
            }

            else { return BadRequest(null); }
        }
        [HttpPost]
        [Route("Create")]
        public IActionResult Create([FromBody] Models.Comment input)
        {
            _context.Comments.Add(input);
            _context.SaveChanges();
            return Ok(input);
        }
        [HttpPut]
        [Route("Update")]
        public IActionResult Update(int id, [FromBody] Models.Comment input)
        {
            var comment = _context.Comments.Find(id);
            if (comment != null)
            {
                comment.Content = input.Content;
                _context.SaveChanges();
                return Ok(comment);
            }
            else { return BadRequest(null); }
        }
        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(int id)
        {
            var comment = _context.Comments.Find(id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                _context.SaveChanges();
                return Ok();
            }
            else { return BadRequest(null); }
        }
    }
}
