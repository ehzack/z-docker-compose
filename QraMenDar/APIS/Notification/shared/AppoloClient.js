const { createApolloFetch } = require("apollo-fetch");
const {
  HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_ENDPOINT,
} = require("../config");
const fetch = createApolloFetch({
  uri: HASURA_GRAPHQL_ENDPOINT,
});

fetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {}; // Create the headers object if needed.
  }
  options.headers["x-hasura-admin-secret"] = HASURA_GRAPHQL_ADMIN_SECRET;

  next();
});

module.exports = fetch;
