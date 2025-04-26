import axios from "axios";

export const GetAuthUserData = async (token: string) => {
  try {
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: "Bearer" + token } }
    );
    return userInfo.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};


