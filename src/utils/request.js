import fetch from 'dva/fetch';
import qs from 'qs';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status === 499) {
    return location.href = '/';
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  if(arr != null) return decodeURIComponent(arr[2]); 
  return null;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
var log = console.log;
export default function request(url, options) {
  if (!getCookie('user') && location.hash !== '#/login') {
    location.hash = '#/login'
  }
  let temp = {
    credentials: 'include',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-Requested-with': 'XMLHttpRequest',
    },
  };
  if (options.method.toLowerCase() === 'get') {
    if (options.body && Object.keys(options.body).length) {
      // 如果是IE就加上t，防止get服务缓存
      if (window.navigator.msSaveBlob) { options.body.t = parseInt(Math.random() * 1000000, 10); }
      url += `?${Object.keys(options.body).map(item => `${item}=${options.body[item]}`).join('&')}`;
    }
  } else {
    const formData = new FormData();
    for (const key in options.body) {
      formData.append(key, options.body[key]);
    }
    options.body = `${Object.keys(options.body).map(item => `${item}=${options.body[item]}`).join('&')}`;
    temp = {
      ...options,
      ...temp,
    };
  }

  return fetch(url, temp)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      log(data)
      if (data.status !== '1') {
        alert(error_msg);
      }
      return { data }
    })
    .catch(err => ({ err }));
}
