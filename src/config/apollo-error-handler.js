import { onError } from "apollo-link-error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`, networkError?.statusCode);
    if(networkError?.statusCode === 401){
        localStorage.removeItem('currentUser');
        
    }
  }
});

export default errorLink;