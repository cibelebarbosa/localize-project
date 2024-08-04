export default class variaveis {
  static urlBase = "http://localize-project-server-1.onrender.com:80/";
  static headers = {
    "Content-Type": "application/json",
    AllowLocalHost: "true",
  };
  static optionsGet = {
    method: "GET",
    headers: variaveis.headers,
  };
  static optionsPost = {
    method: "POST",
    headers: variaveis.headers,
  };
}
