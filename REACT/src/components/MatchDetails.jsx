import React, { useEffect, useState } from "react";
import { getMatchDetailsWithFanEngagement } from "../services/apiservices";

const MatchDetails = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const data = await getMatchDetailsWithFanEngagement();
        console.log("Fetched Match Data:", data);
        setMatches(data);
      } catch (err) {
        console.error("Failed to fetch match details:", err);
        setError("Failed to fetch match details.");
      }
    };

    fetchMatchDetails();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Match Details with Fan Engagements
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Match Date</th>
              <th className="py-3 px-6 text-left">Venue</th>
              <th className="py-3 px-6 text-left">Team 1</th>
              <th className="py-3 px-6 text-left">Team 2</th>
              <th className="py-3 px-6 text-left">Total Engagements</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {matches && matches.length > 0 ? (
              matches.map((match, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">
                    {match.matchDate
                      ? new Date(match.matchDate).toLocaleDateString()
                      : "Invalid Date"}
                  </td>
                  <td className="py-3 px-6">{match.venue || "N/A"}</td>
                  <td className="py-3 px-6">{match.team1 || "N/A"}</td>
                  <td className="py-3 px-6">{match.team2 || "N/A"}</td>
                  <td className="py-3 px-6">{match.totalEngagements || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No match details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchDetails;
