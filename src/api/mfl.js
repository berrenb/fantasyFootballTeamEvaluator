import axios from 'axios';

// TODO: this is a temp key. A more concrete solution should be looked into here
export const get = async (endpoint) => {
    try {
        const response = await axios.get(`https://proxy.cors.sh/https://api.myfantasyleague.com/2024/${endpoint}`, {
            headers: {
                'x-cors-api-key': 'temp_6f97c4476f4a07d8c0096946c4cf465f',
            }
        })
        return response.data;
    } catch (error) {
        throw new Error('Error in API request');
    }
};

