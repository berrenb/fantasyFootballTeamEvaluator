import axios from 'axios';

// TODO: this is a temp key. A more concrete solution should be looked into here
export const get = async (endpoint) => {
    try {
        const response = await axios.get(`https://proxy.cors.sh/https://api.myfantasyleague.com/2023/${endpoint}`, {
            headers: {
                'x-cors-api-key': 'temp_200b3e3392a14e8d2cc5e531a3f6b1e1',
            }
        })
        return response.data;
    } catch (error) {
        throw new Error('Error in API request');
    }
};

