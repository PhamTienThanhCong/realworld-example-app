import axios from 'axios';

type callApiInterface = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: {},
    params?: {},
}

export const callApi = async({ method, url, data, params }: callApiInterface) => {
    // config header
    // get token from local storage
    const jwtToken = localStorage.getItem('token');
    const config = {
        baseURL: 'https://api.realworld.io/api',
        headers: {
          Authorization: !!jwtToken ? `Bearer ${jwtToken}` : '',
        },
        params: {...params}
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

export const GET = (url: string, params?: {}) =>
  callApi({ method: 'GET', url, params });

export const POST = (url: string, data?: {}) =>
  callApi({ method: 'POST', url, data });

export const PUT = (url: string, data?: {}) =>
  callApi({ method: 'PUT', url, data });

export const DELETE = (url: string) => callApi({ method: 'DELETE', url });