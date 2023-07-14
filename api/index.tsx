import axios from 'axios';

export const fetchData = async () => {
  const API_KEY = process.env.API_KEY;
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`
    );
    console.log(response.data);
    return response.data;
    // Handle the response data here
  } catch (error) {
    console.error(error);
    // Handle any errors here
  }
};
