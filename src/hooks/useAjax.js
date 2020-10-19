import { useState } from "react";
import axios from "axios";

export default (callback) => {

  const [data, setData] = useState({});

  const request = (method, url, headers, data = "") => {
    axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    })
      .then((response) => response.data)
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  };

  return [request];
};
