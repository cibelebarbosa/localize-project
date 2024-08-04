export default class variaveis {
  static urlBase = "https://localhost:7082/";
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
