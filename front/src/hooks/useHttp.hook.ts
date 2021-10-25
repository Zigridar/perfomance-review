import { useCallback, useState } from 'react';

/**
 * Do http request with loading status
 * */
const useHttp = () => {

  /** loading status */
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async <T = any>(url: string, method = 'GET', body: any = null, headers: { [key: string]: string } = {}) => {
    /** start loading */
    setLoading(() => true);

    try {
      /** if body exists set it and set headers */
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      /** do request */
      const response: Response = await fetch(url, {
        method,
        body,
        headers,
      });

      /** result container */
      let result: T = {} as T;

      try {
        result = await response.json() as T;
      } catch {
        console.warn('response without body');
      }

      /** parse json data */
      return result;
    } catch (e) {
      console.error(e.message);
      throw e;
    } finally {
      /** set loading status to false */
      setLoading(() => false);
    }
  }, []);

  return { loading, request };
};

export default useHttp;