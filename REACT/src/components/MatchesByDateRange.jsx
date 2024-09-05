import React, { useState } from "react";
import { getMatchesByDateRange } from "../services/apiservices";

const MatchesByDateRange = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMatchesByDateRange = async () => {
    if (!startDate || !endDate) {
      setError("Both start date and end date are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getMatchesByDateRange(startDate, endDate);
      setMatches(data);
    } catch (err) {
      setError("Failed to fetch matches.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Matches by Date Range
      </h2>
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="startDate" className="block text-gray-700 mb-2">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={loading}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-gray-700 mb-2">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={loading}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <button
            onClick={fetchMatchesByDateRange}
            disabled={loading}
            className={`px-4 py-2 font-bold text-white rounded-md ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Fetch Matches"}
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Match ID</th>
              <th className="py-3 px-6 text-left">Match Date</th>
              <th className="py-3 px-6 text-left">Venue</th>
              <th className="py-3 px-6 text-left">Team 1 ID</th>
              <th className="py-3 px-6 text-left">Team 2 ID</th>
              <th className="py-3 px-6 text-left">Winner Team ID</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {matches.length > 0 ? (
              matches.map((match) => (
                <tr
                  key={match.matchId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{match.matchId}</td>
                  <td className="py-3 px-6">
                    {new Date(match.matchDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">{match.venue}</td>
                  <td className="py-3 px-6">{match.team1Id}</td>
                  <td className="py-3 px-6">{match.team2Id}</td>
                  <td className="py-3 px-6">
                    {match.winnerTeamId ? match.winnerTeamId : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No matches available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchesByDateRange;
