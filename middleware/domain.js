export default async function({ req, error, $axios, route, params, store, redirect }) {
  if (store.state.context.domain) {
    return;
  }
  const hostname = req ? (req.headers.origin || req.headers.host) : location.hostname;
  const [host, port] = hostname.split(':');

  const domain = await store.dispatch('context/loadDomain', host);
  if (!domain) {
    error.isParkedDomain = true;
    return error({ statusCode: 404, message: 'Domain not found' });
  }
};
