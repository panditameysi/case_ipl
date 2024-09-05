namespace IPL_API.Models
{
    public class FanEngagement
    {
        public int EngagementId { get; set; }
        public int MatchId { get; set; }
        public int FanId { get; set; }
        public string EngagementType { get; set; }
        public DateTime EngagementTime { get; set; }

        public Match Match { get; set; }
    }
}
