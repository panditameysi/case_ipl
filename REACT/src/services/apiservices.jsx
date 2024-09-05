import axios from 'axios';

const API_BASE_URL = 'http://localhost:5247/api/IPL';

export const addPlayer = async (player) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add-player`, player);
    return response.data;
  } catch (error) {
    console.error("Error adding player:", error);
    throw error;
  }
};


export const getMatchDetailsWithFanEngagement = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/match-details-with-engagements`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match details with engagements:", error);
    throw error;
  }
};


export const getTopPlayersWithHighestFanEngagement = async (topPlayersCount) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/top-players?topPlayersCount=${topPlayersCount}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching top players:", error);
      throw error;
    }
  };

export const getMatchesByDateRange = async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/matches-by-date-range`, {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching matches by date range:", error);
      throw error;
    }
  };
