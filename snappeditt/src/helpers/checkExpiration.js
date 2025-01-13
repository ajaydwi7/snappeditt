const setExpirationDate = (days) => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return expirationDate.toISOString();
};

const isExpired = (expirationDate) => {
  const now = new Date();
  return now.getTime() > expirationDate.getTime();
};

const getUserFromLocalStorage = () => {
  const userItem = localStorage.getItem("user");
  // Log the raw user item
  if (!userItem) {
    console.log("No user in localStorage");
    return null;
  }

  try {
    const user = JSON.parse(userItem); // Parse the string into an object
    const expirationDate = new Date(user.expirationDate);

    if (isExpired(expirationDate)) {
      console.log("User session expired");
      localStorage.removeItem("user");
      return null;
    }

    return user; // Return the parsed user object
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("user"); // Clear invalid user data
    return null;
  }
};

export { setExpirationDate, getUserFromLocalStorage };
