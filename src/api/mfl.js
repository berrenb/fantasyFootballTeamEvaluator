import axios from 'axios';

// TODO: this is a temp key. A more concrete solution should be looked into here
export const get = async (endpoint) => {
    try {
        const response = await axios.get(`https://proxy.cors.sh/https://api.myfantasyleague.com/2023/${endpoint}`, {
            headers: {
                'x-cors-api-key': 'temp_f55f6b1c63ba22f04ede153630279cf1',
            }
        })
        return response.data;
    } catch (error) {
        throw new Error('Error in API request');
    }
};

