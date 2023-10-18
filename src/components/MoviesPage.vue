<template>
  <div class="hello">
    <h1>{{ 'MoviesPage' }}</h1>
    <h4>{{ msg }}</h4>

    <div v-for="movie in albums?.data" :key="movie.id">
      <div :key="movie.id">
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

import { CognitoUserPool , AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';

const GET_Albums = gql`
query Albums {
    albums {
        data {
            id
            title
        }
    }
}

`;

export default {
  name: 'MoviesPage',

  methods:{
    getUser() {
      const authenticationData = {
       ...this.user
      };
      const authenticationDetails = new AuthenticationDetails(
        authenticationData,
      );
      const poolData = {
        UserPoolId: process.env.VUE_APP_AWS_USER_POLL_ID,
        ClientId: process.env.VUE_APP_AWS_CLIENT_ID,
      };
      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Username: this.user.Username,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log("res", result);

          const accessToken = result.getAccessToken().getJwtToken();

          /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
          const idToken = result;
          // ? result?.idToken?.jwtToken : null

          console.log(accessToken, idToken);
        },

        onFailure: function (err) {
          console.log('failuare', err);

        },
      });
    }
  },
  data() {
    return {
      albums: [],
      user: {
        Username: '',
        Password: ''
      }
    };
  },
  apollo: {
    albums: {
      query: GET_Albums
    }
  },
  props: {
    msg: String,
    changeTitle: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}</style>
