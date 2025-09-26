const axios = require('axios');

export const getLanguageById = (lang) => {
    const language = {
        'c++': 54,
        'java': 62,
        'javascript': 63
    }

    return language[lang.toLowerCase()];
}

export const submitBatch = async (submissions) => {


    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'true'
        },
        headers: {
            'x-rapidapi-key': 'dff04bd071mshb0c5707b3beccbfp16981djsnd61c52534266',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    return await fetchData();
}