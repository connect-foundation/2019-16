import { useState } from "react";

export default axiosInstance => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });

  return {
    ...state,
    request: (method, url, _option) => {
      const option = {
        method,
        url,
        ..._option
      };

      setState({ loading: true, data: null, error: null });

      return axiosInstance(option)
        .then(result => {
          const { data } = result;
          setState({ ...state, data, loading: false });
          return data;
        })
        .catch(error => {
          setState({ ...state, error, loading: false });
          return error;
        });
    }
  };
};
