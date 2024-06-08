import {
  getAuthToken,
  getOrgId,
  isAuthExpired,
} from "../components/lib/common";

export const baseURL = "http://localhost:4000/api";

// Utility function for handling errors
const errorHandler = (error) => {
  const statusCode = error.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// Utility function to create headers
const createHeaders = (isSecure = false) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (isSecure) {
    const token = getAuthToken();
    const orgId = getOrgId();

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    if (orgId) {
      headers.append("Org-Id", orgId);
    }
  }

  return headers;
};

// Utility function to make requests with fetch
const fetchData = async <T>(
  url: string,
  options = {},
  isSecure = false
): Promise<FetchResponse<T>> => {
  const config = {
    ...options,
    headers: createHeaders(isSecure),
  };

  try {
    const response = await fetch(`${baseURL}${url}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  } catch (error) {
    console.error(error);
    return errorHandler(error);
  }
};

// Example function to replicate Axios instance
export const fetchConfig = {
  get: (url, options = {}) => fetchData(url, { method: "GET", ...options }),
  post: (url, body, options = {}) =>
    fetchData(url, { method: "POST", body: JSON.stringify(body), ...options }),
  put: (url, body, options = {}) =>
    fetchData(url, { method: "PUT", body: JSON.stringify(body), ...options }),
  delete: (url, options = {}) =>
    fetchData(url, { method: "DELETE", ...options }),
  patch: (url, body, options = {}) =>
    fetchData(url, { method: "PATCH", body: JSON.stringify(body), ...options }),
};

// Secure version with token and org ID
export const fetchSecureConfig = {
  get: (url, options = {}) =>
    fetchData(url, { method: "GET", ...options }, true),
  post: (url, body, options = {}) =>
    fetchData(
      url,
      { method: "POST", body: JSON.stringify(body), ...options },
      true
    ),
  put: (url, body, options = {}) =>
    fetchData(
      url,
      { method: "PUT", body: JSON.stringify(body), ...options },
      true
    ),
  delete: (url, options = {}) =>
    fetchData(url, { method: "DELETE", ...options }, true),
  patch: (url, body, options = {}) =>
    fetchData(url, { method: "PATCH", body: JSON.stringify(body), ...options }),
};

// Type definition for the response with pagination
export type FetchResponseWithPagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  data: any;
  status: number;
  statusText: string;
  headers: Headers;
};

// Type definition for the general response
export type FetchResponse<T = any> = {
  data?: T;
  status?: number;
  statusText?: string;
  headers?: Headers;
};
