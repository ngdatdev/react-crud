import axios from "axios";

const instance = axios.create({
  baseURL: "https://reqres.in/",
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : response.status;
  },

  function (error) {
    let result = {}
    if (error.response) {
      
      result.data = error.response.data;
      result.status = error.response.status;
      result.header = error.response.header;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return result
  }
);

export default instance;
