import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-17c13.cloudfunctions.net/api",
});

export default instance;

// firebase cloud: https://us-central1-clone-17c13.cloudfunctions.net/api
// local: http://localhost:5001/clone-17c13/us-central1/api
