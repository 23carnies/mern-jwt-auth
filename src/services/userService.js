import tokenService from "../services/tokenService";
const BASE_URL = "/api/users/";

export function getAllUsers() {
    return fetch(
      BASE_URL,
      {
        headers: { Authorization: "Bearer " + tokenService.getToken() },
      },
      { mode: "cors" }
    ).then((res) => res.json());
  }

  //this function now prevents the list of users from being visible to those not logged in
  