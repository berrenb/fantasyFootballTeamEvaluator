import axios from 'axios';

// TODO: this is a temp key. A more concrete solution should be looked into here
export const get = async (endpoint) => {
    try {
        const response = await axios.get(`https://proxy.cors.sh/https://api.myfantasyleague.com/2023/${endpoint}`, {
            headers: {
                'x-cors-api-key': 'temp_043b36aa4ade403ee2a17e620ea03c8c',
            }
        })
        return response.data;
    } catch (error) {
        throw new Error('Error in API request');
    }
};

