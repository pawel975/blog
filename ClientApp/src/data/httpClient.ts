import axios from "axios";

const httpClient = axios.create({
  baseURL: "/api",
  // headers: {
  //   Authorization: `Bearer ${process.env.EXAMPLE_APP_API_TOKEN}`,
  // },
});

export default httpClient;
