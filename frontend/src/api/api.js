const LOCAL_SERVER_URL = import.meta.env.VITE_LOCAL_SERVER_DEV_URL;
const NETWORK_SERVER_URL = import.meta.env.VITE_NETWORK_SERVER_DEV_URL;

// manually--> change the server url based on your network or local
// export const SERVER_URL = LOCAL_SERVER_URL; // for local server
// export const SERVER_URL = NETWORK_SERVER_URL; // for network server

const isLocalHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const SERVER_URL = isLocalHost ? LOCAL_SERVER_URL : NETWORK_SERVER_URL;


// user api
export const USER_API = `${SERVER_URL}/api/v1/users`;

// export const PRODUCT_API = `${SERVER_URL}/api/v1/products`;




// Agar future me v2 version aaya
// export const USER_API_V2 = `${SERVER_URL}/api/v2/users`;


