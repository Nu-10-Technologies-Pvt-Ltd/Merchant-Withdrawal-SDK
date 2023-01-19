const getAuthToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

export default getAuthToken;
