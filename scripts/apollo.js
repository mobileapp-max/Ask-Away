import { ApolloClient } from '@apollo/client';
// import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
// import { InMemoryCache } from 'apollo-cache-inmemory';
const GRAPHQL_ENDPOINT = `https://mature-humpback-99.hasura.app/v1/graphql`;
const createApolloClient = (token) => {
    // const link = new HttpLink({
    const link = new WebSocketLink({
        uri: GRAPHQL_ENDPOINT,
        options: {
            reconnect: true,
            connectionParams: {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        }
    });
    return new ApolloClient({
        link,
        cache: new InMemoryCache()
    })
}
export default createApolloClient;