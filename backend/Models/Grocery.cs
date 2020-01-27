namespace BackEnd.Models
{
    public class Grocery
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public string Item { get; set; }
        public string Department { get; set; }

        
    }
}