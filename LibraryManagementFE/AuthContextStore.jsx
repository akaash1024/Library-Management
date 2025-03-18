import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const API = "http://localhost:3000"
  // const API = `https://library-management-43dd.onrender.com`

  const api = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
  });

  let isLoggedIn = !!token;

  const storeTokenInLS = (serverToken) => {
    // Changed from storeTokenInLs to storeTokenInLS
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const userAuthentication = async () => {
    try {
      setIsLoading(true);

      const { data } = await api.get("/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user data", error);
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout functionality
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // Fetch available books
  const getBooks = async () => {
    try {
      const { data } = await api.get("/api/books");
      setBooks(data.books);
    } catch (error) {
      console.error(`Books frontend error: ${error}`);
    }
  };

  // const getBookDetails = async ({ params }) => {
  //   console.log(params);
  //   const { bookID } = params;

  //   try {
  //     const response = await api.get(`/book/${bookID}`);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Authentication effect
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
    getBooks();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        api,
        storeTokenInLS, 
        isLoggedIn,
        LogoutUser,
        user,
        books,
        isLoading,
        API, 
        authorizationToken, 
        token, // Added token
        // getBookDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
