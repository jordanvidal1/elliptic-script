const address = process.env.BTC_ADDRESS || '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF';

const fetchApi = async (
    url,
) => {
    const options: any = {
        method: 'GET',
    };

    const request = await fetch(url, options);

    return await request.json();
}

(async() => {
    console.log('Starting script');

    const res = await fetchApi(`https://blockchain.info/rawaddr/${address}`);
    console.log('res', res);

    console.log('Done');
})();
