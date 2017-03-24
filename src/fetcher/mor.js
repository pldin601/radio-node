// @flow

import { Client } from 'node-rest-client';

export type FetchResult = {
  offset: number,
  title: string,
  url: string,
};

const endpoint: string = 'http://myownradio.biz/api/v0/stream/${channelId}/now';

const fetch = (channelId: string): Promise<FetchResult> => new Promise((resolve, reject) => {
  const client = new Client();
  const req = client.get(endpoint, { path: { channelId } }, (data, response) => {
    if (response.statusCode === 200) {
      resolve(data.data);
    } else {
      reject('Error response.');
    }
  });
  req.on('error', err => reject(err));
});

export default fetch;