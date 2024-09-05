namespace IPL_API.Models
{
    public class Match
    {
        public int MatchId { get; set; }
        public DateTime MatchDate { get; set; }
        public string Venue { get; set; }
        public int Team1Id { get; set; }
        public int Team2Id { get; set; }
        public int? WinnerTeamId { get; set; }

        public Team Team1 { get; set; }
        public Team Team2 { get; set; }
        public Team WinnerTeam { get; set; }
    }
}
