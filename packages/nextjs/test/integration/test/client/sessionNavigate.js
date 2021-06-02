const { expectRequestCount, waitForAll, isSessionRequest, expectSession, sleep } = require('../utils');

module.exports = async ({ page, url, requests }) => {
  await waitForAll([page.goto(`${url}/healthy`), page.waitForRequest(isSessionRequest)]);

  expectSession(requests.sessions[0], {
    init: true,
    status: 'ok',
    errors: 0,
  });

  await sleep(100);

  await waitForAll([
    page.click('a#alsoHealthy'),
    page.waitForRequest(isSessionRequest),
    page.waitForRequest(isSessionRequest),
  ]);

  expectSession(requests.sessions[1], {
    init: false,
    status: 'exited',
    errors: 0,
  });

  expectSession(requests.sessions[2], {
    init: true,
    status: 'ok',
    errors: 0,
  });

  await sleep(100);

  await waitForAll([
    page.click('a#healthy'),
    page.waitForRequest(isSessionRequest),
    page.waitForRequest(isSessionRequest),
  ]);

  expectSession(requests.sessions[3], {
    init: false,
    status: 'exited',
    errors: 0,
  });

  expectSession(requests.sessions[4], {
    init: true,
    status: 'ok',
    errors: 0,
  });

  await expectRequestCount(requests, { sessions: 5 });
};