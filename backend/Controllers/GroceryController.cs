namespace BackEnd.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    [ApiController]
    
    public class GroceryController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _repo;

        public GroceryController(IMapper mapper, IUserRepository repo)
        {
            _mapper = mapper;
            _repo = repo;
        }
        


        [HttpPost]
        public async Task<IActionResult> AddGrocery(int userId, ChangelogForCreationDto groceryForCreationDto)
        {
            var creator = await _repo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var grocery = _mapper.Map<Grocery>(groceryForCreationDto);

            grocery.TimeStamp = DateTime.Now;

            grocery.userId = userId;

            _repo.Add(grocery);

            if (await _repo.SaveAll())
            {
                return Ok();
            }
                
            throw new Exception("Creation of grocery count failed on save");
        }

        [HttpGet(nameof="GetGrocery")]
        public async Task<IActionResult> GetGroceries(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var grocery = await _repo.GetGroceries(userId);

            var groceryForReturn = _mapper.Map<IEnumerable<GroceryForReturnDto>>(grocery);
            
            return Ok(groceryForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGrocery(int userId, int id, GroceryForCreationDto groceryForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var groceryFromRepo = await _repo.GetUniqueGrocery(id);

            _mapper.Map(groceryForUpdateDto, groceryFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetGrocery", new {userId = userId}, groceryForUpdateDto);

            throw new Exception($"Updating grocery lot {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrocery(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var groceryToDelete = await _repo.GetUniqueGrocery(id);
            
            if (userId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                _repo.Delete(groceryToDelete);
                await _repo.SaveAll();
                return Ok( "Grocery was Deleted" );
        }
        
    }
}