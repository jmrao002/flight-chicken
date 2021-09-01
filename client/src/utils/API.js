// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// save route data for a logged in user
export const saveroute = (routeData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(routeData),
  });
};

// remove saved route data for a logged in user
export const deleteroute = (routeId, token) => {
  return fetch(`/api/users/routes/${routeId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google routes api
// https://www.googleapis.com/routes/v1/volumes?q=harry+potter
export const searchGoogleroutes = (query) => {
  return fetch(`https://www.googleapis.com/routes/v1/volumes?q=${query}`);
};
