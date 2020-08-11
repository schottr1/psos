import axios from 'axios';
 
const restServices = {
  getData() {
    // console.log(process.env);x
          return axios
             .get("http://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=80fd8afe7d1a467ca5c27eba3d36e8f8")
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return {
            error: 'Error for the endpoint newsapi.org',
            endpoint: 'newsapi.org',
            errorTrace: JSON.stringify(`${error}`),
          };
        }) 
  },
  getAllData(endpoint) {
    // NOTE: Remember to mask this token in production if running the app as a standalone URL
    const instant = axios.create({
      headers: {
        RRAuthorization:
          'xx',
      },
    });
    return instant
      .get(endpoint)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return {
          error: `Error for the following endpoint ${endpoint}`,
          endpoint: `${endpoint}`,
          errorTrace: JSON.stringify(`${error}`),
        };
      });
  },
};

// getAllNews() {
//   const instant = axios.create({
//     //  baseURL: process.env.REACT_APP_IDENTITY_URL,
//     headers: { "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTM4NzI4MDUsInN1YiI6ImJoYW53YXIuZ3VwdGFAaW4uaWJtLmNvbSIsImlhdCI6MTU2MjMzNjgwNX0.79at0CrH7l_UXveg4j7Tp6mfh5zgjn4N4u2H0YHN3p4" }
//   });
//   return instant.get("https://dev-risk.w3ibm.mybluemix.net/api/locations/supplier/all").then(res => {
//     console.log("news data", res.data);
//     return res.data;
//   });
// }

// $.ajax({
//   url: "https://dev-risk.w3ibm.mybluemix.net/api/locations/supplier/all",
// 	beforeSend: function(request) {
// 	request.setRequestHeader("RRAuthorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTM4NzI4MDUsInN1YiI6ImJoYW53YXIuZ3VwdGFAaW4uaWJtLmNvbSIsImlhdCI6MTU2MjMzNjgwNX0.79at0CrH7l_UXveg4j7Tp6mfh5zgjn4N4u2H0YHN3p4");
// 	 }
//  }).done(function(data) {
//  console.log(data);
// });

export default restServices;
