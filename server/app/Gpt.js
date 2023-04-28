import fetch from 'node-fetch';

export default async function Gpt(dataJSON) {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": dataJSON.text }],
            "temperature": 0.7
        })
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const body = await response.json();
        // console.log(body);
        // console.log(body.choices[0].message.content);
        return body.choices[0].message.content;
    } catch (error) {
        throw new Error(error);
    }
}
