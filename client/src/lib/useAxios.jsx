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

      axiosInstance(option)
        .then(result => {
          const { data } = result;
          setState({ ...state, data, loading: false });
        })
        .catch(error => setState({ ...state, error, loading: false }));
    }
  };
};
