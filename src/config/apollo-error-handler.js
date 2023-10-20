import { onError } from "apollo-link-error";

const createErrorLink = ($toast, $router) => onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    $toast.error(networkError?.message);
    if(networkError?.statusCode === 401){
        localStorage.removeItem('currentUser');
        $router.push('/login')

    }
  }
});

export default createErrorLink;
