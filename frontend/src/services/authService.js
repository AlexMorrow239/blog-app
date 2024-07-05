const BASE_API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  const response = await fetch(`${BASE_API_URL}/auth/register`, {
    method: "POST",
    headers: {},
    body: userData,
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  localStorage.setItem("user", JSON.stringify(responseData.data));
  return responseData;
};

const login = async (userData) => {
  const response = await fetch(`${BASE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  localStorage.setItem("user", JSON.stringify(responseData.data));
  return responseData;
};

const getUser = async (authorId) => {
  const response = await fetch(`${BASE_API_URL}/auth/user/${authorId}`, {
    method: "GET",
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const updateUser = async (userData) => {
  const response = await fetch(
    `${BASE_API_URL}/auth/user/${userData.get("id")}`,
    {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      body: userData,
    }
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const authService = {
  register,
  login,
  getUser,
  updateUser,
};

export default authService;
