import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3100",
  headers: {
    "Content-type": "application/json"
  }
});