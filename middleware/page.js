export default async function({ req, error, route, $axios, params, store, redirect }) {
  let { url = '' } = params;

  const domainId = store.state.context.domain._id;
  let page = await store.dispatch('context/loadPage', { domainId, url });
  if (!page && route.name !== 'parked-domain') {
    page = await store.dispatch('context/loadPage', { domainId, error: true });
    redirect('/not-found');
    return error({ statusCode: 404, message: 'Page not found' });
  }
};
