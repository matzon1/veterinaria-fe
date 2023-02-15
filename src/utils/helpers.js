import { baseUrl } from "./constants";
import { toast } from "react-toastify";

export function customFetch(method, url , token ) {
  return fetch(baseUrl + url, {
    method: method,
    headers: {
       Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

export function customFetchWithBody(method, url, dataBody, token ) {
  return fetch(baseUrl + url, {
    method: method,
    body: JSON.stringify(dataBody),
    headers: {
       Authorization: "Bearer " + token, 
      "Content-Type": "application/json",
    },
  });
}


export function handleServerError(dispatcher, response) {
  if (response.status === 401) {
    toast.error("El tiempo de su sesión venció");
    setTimeout(() => {
      dispatcher.logout();
    }, 3000);
    return 401;
  }
  if (response.status === 400) {
    toast.error("Solicitud inválida");
    return 400;
  }
  if (response.status === 404) {
    toast.error("Elemento no encontrado");
    return 404;
  }
  return null;
}

export function formatUserResponse(user) {
  let object = user.reduce(
    (obj, item) => Object.assign(obj, { [item.type]: item.value }),
    {}
  );
  return object;
}

export const fullDateString = (date) => {
  date.setTime(date.getTime() + (3*60*60*1000))
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() +1 ).toString().padStart(2, '0');
  const year = date.getFullYear().toString().padStart(2, '0');

  const string = `${year}-${month}-${day}`;
  return string;
};


const locale = 'es-ES';
const addTZToIsoDate = (isoDate) => `${isoDate}T00:00:00-03:00`;
// desde date
export const displayDate = (str) => new Date(addTZToIsoDate(str)).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: '2-digit' });
// desde dateTime
export const displayDatetime = (datetime) => new Date(datetime).toLocaleString(locale);
