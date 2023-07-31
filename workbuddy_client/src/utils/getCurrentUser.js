const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"))?.info;
};

export default getCurrentUser;
