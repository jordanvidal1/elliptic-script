import * as fs from 'fs';
import {Parser} from 'json2csv';

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

    const jsonData = await fetchApi(`https://blockchain.info/rawaddr/${address}`);
    const transactions = jsonData.txs;
    delete jsonData.txs;
    const parser = new Parser({header: true});

    try {
        const csv = parser.parse(jsonData);
        const filename = `${address}.csv`;

        await new Promise<void>((resolve, reject) => {
            fs.writeFile(filename, csv, err => {
                if(err) reject(err);
                resolve();
            });
        });
    }
    catch(ex) {
        console.debug(ex);
    }

    try {
        const csv = parser.parse(transactions);
        const filename = `${address}_transactions.csv`;

        await new Promise<void>((resolve, reject) => {
            fs.writeFile(filename, csv, err => {
                if(err) reject(err);
                resolve();
            });
        });
    }
    catch(ex) {
        console.debug(ex);
    }

    console.log('Done');
})();
