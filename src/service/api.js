import axios from "axios";
import { CONTENT_TYPE } from '@/common/constant';

const api = axios.create({
  // baseURL: "",
  headers: {
    "Content-Type": CONTENT_TYPE.ApplicationJSON,
  },
});

export default api;