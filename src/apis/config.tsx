import axios from 'axios';

type callApiInterface = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: {},
    signal?: any,
}

export const callApi = async({ method, url, data, signal }: callApiInterface) => {
    // config header
    // get token from local storage
    const jwtToken = localStorage.getItem('token');
    const config = {
        baseURL: 'https://api.realworld.io/api',
        headers: {
          Authorization: !!jwtToken ? `Bearer ${jwtToken}` : '',
        },
        signal: signal,
      };
    try {
        const dataResponse =
            method === 'GET' ? await axios.get(url, config) :
            method === 'POST' ? await axios.post(url, data, config) :
            method === 'PUT' ? await axios.put(url, data, config) :
            method === 'DELETE' ? await axios.delete(url, config) : {};
        return dataResponse; 
    } catch (error) {
        throw error;
    }
}

export const GET = (url: string, signal?: AbortSignal) =>
  callApi({ method: 'GET', url, signal });

export const POST = (url: string, data?: {}) =>
  callApi({ method: 'POST', url, data });

export const PUT = (url: string, data?: {}) =>
  callApi({ method: 'PUT', url, data });

export const DELETE = (url: string) => callApi({ method: 'DELETE', url });