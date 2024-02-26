namespace Blog.Entities
{
    public class Session
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public virtual User User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiredAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public virtual Role Role { get; set; }
    }
}
