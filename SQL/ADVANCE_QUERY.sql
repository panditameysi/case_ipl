--1. Find the player who participated in the highest number of winning matches. Display the Player Name along with the total number of winning matches .
SELECT p.player_name, COUNT(m.match_id) AS total_winning_matches
FROM ipl.Players p
JOIN ipl.Matches m ON p.team_id = m.winner_team_id
GROUP BY p.player_name
ORDER BY total_winning_matches DESC
LIMIT 1;
--2. Determine the venue with the highest number of matches played and the total fan engagements at that venue. Display the Venue , Total Matches , Total Fan Engagements.
SELECT m.venue, COUNT(m.match_id) AS total_matches, COUNT(fe.engagement_id) AS total_fan_engagements
FROM ipl.Matches m
JOIN ipl.Fan_Engagement fe ON m.match_id = fe.match_id
GROUP BY m.venue
ORDER BY total_matches DESC
LIMIT 1;
--3. Find the player who has the most fan engagements across all matches.Display the player name and the count of fan engagements .
SELECT p.player_name, COUNT(fe.engagement_id) AS total_fan_engagements
FROM ipl.Players p
JOIN ipl.Matches m ON p.team_id = m.team1_id OR p.team_id = m.team2_id
JOIN ipl.Fan_Engagement fe ON m.match_id = fe.match_id
GROUP BY p.player_name
ORDER BY total_fan_engagements DESC
LIMIT 1;
--4. Write an SQL query to find out which stadium and match had the highest fan engagement. The query should return the stadium name, match date, and the total number of fan engagements for that match, ordered by the latest match date .
SELECT m.venue AS stadium_name, m.match_date, COUNT(fe.engagement_id) AS total_fan_engagements
FROM ipl.Matches m
JOIN ipl.Fan_Engagement fe ON m.match_id = fe.match_id
GROUP BY m.venue, m.match_date
ORDER BY total_fan_engagements DESC, m.match_date DESC
LIMIT 1;
--5. Generate a report for the "Mumbai Indians" that includes details for each match they played:
-- a.      Match date.
-- b.     Opposing team's name.
-- c.      Venue.
-- d.     Total number of fan engagements recorded during each match.
-- e.      Name of the player from "Mumbai Indians" who has played the most matches up to the date of each match.
SELECT m.match_date,
    CASE
        WHEN m.team1_id = 1 THEN t2.team_name
        ELSE t1.team_name
    END AS opposing_team,
    m.venue,
    COUNT(f.engagement_type) AS total_fan_engagements,
    p.player_name AS top_player
FROM ipl.Matches m
JOIN ipl.Teams t1 ON m.team1_id = t1.team_id
JOIN ipl.Teams t2 ON m.team2_id = t2.team_id
JOIN ipl.Fan_Engagement f ON m.match_id = f.match_id
JOIN ipl.Players p ON p.team_id = 1
WHERE (m.team1_id = 1 OR m.team2_id = 1) 
    AND p.matches_played = (SELECT MAX(matches_played) FROM ipl.Players WHERE team_id = 1)
GROUP BY m.match_date, opposing_team, m.venue, p.player_name
ORDER BY m.match_date;
