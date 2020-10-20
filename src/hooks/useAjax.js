import { useState } from "react";
import axios from "axios";

export default () => {

  const [data, setData] = useState({});


  const request = (method, url, headers = null, data = "") => {

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

  return [data, request];
};
