import Vue from 'vue'
import App from './App.vue'

import router from './router' // added by router plugin
import store from './store'

// import { createProvider } from './vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import createErrorLink from "./config/apollo-error-handler";
import { ApolloLink } from "apollo-link";


import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.prototype.$toast = Toast


import VueApollo from 'vue-apollo';

Vue.config.productionTip = false;

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});



function getHeaders() {
  const headers = { Authorization: '', 'Content-Type': '' };
  const token = localStorage.getItem("currentUser");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  headers["Content-Type"] = "application/json";
  return headers;
}


const httpLink = new HttpLink({
  // uri: 'https://graphqlzero.almansi.me/api'
  uri: 'https://gjvhpurezjc2bjm7gyaoweabl4.appsync-api.us-east-1.amazonaws.com/graphql',
  fetch: (uri, options) => {
    options.headers = getHeaders();
    return fetch(uri, options);
  },
});
const errorLink = createErrorLink(Vue.prototype.$toast, router);

const apolloClient = new ApolloClient({
  // link: httpLink,
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  watchLoading (isLoading) {
    this.$store.commit('isShowLoader', isLoading)
    // loading += countModifier
    // console.log('Global loading', loading, countModifier)
  },
});

new Vue({
  router,
  store,
  apolloProvider,
  components: {
  },
  render: h => h(App),
}).$mount('#app')
