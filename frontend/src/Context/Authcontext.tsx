import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  createUser,
  loginUser,
  logoutUser,
} from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null); //DON'T REALLY UNDERSTAND THIS PART

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [AuthToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    try {
      const authToken = localStorage.getItem("auth_token");
      if (authToken && authToken !== "") {
        const checkStatus = async () => {
          const data = await checkAuthStatus(authToken);
          setUser({ name: data.name, email: data.email });
          setIsLoggedIn(true);
          setAuthToken(authToken);
        };
        checkStatus();
      }
    } catch (err) {
      console.log(err);
    }

    //console.log(authToken);
  }, []);

  const login: UserAuth["login"] = async (email, password) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
      localStorage.setItem("auth_token", data.token);
      setAuthToken(data.token);
    }
  };

  const signup: UserAuth["signup"] = async (name, email, password) => {
    const data = await createUser(name, email, password);
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
      localStorage.setItem("auth_token", data.token);
      setAuthToken(data.token);
    }
  };
  const logout: UserAuth["logout"] = async () => {
    try {
      await logoutUser(AuthToken);
      setUser(null);
      setIsLoggedIn(false);
      setAuthToken("");
      localStorage.setItem("auth_token", "");
      //window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    setUser,
    setIsLoggedIn,
    AuthToken,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
