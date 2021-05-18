import http from 'k6/http';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      // rate: 1,
      // rate: 10,
      // rate: 100,
      rate: 1000,
      timeUnit: '1s', // x iterations per second, i.e. 1000 RPS (rate)
      duration: '30s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
      // maxVUs: 400, // 1000 RPS
    },
  },
};

export default () => {
  const url = '';

  const payload = JSON.stringify({
    title: 'Blue Banana',
    enrolled: 100,
    reviewcounts: '30',
    stars: '4.5',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
}