import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../Context/Authcontext";
import NavigationLink from "./shared/NavigationLink";

const Navbar = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                text="Go to Chat"
                to="/chat"
                textColor="black"
              ></NavigationLink>
              <NavigationLink
                bg="#51538f"
                text="Logout"
                to="/"
                textColor="white"
                onClick={auth?.logout}
              ></NavigationLink>
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                text="Signup"
                to="/signup"
                textColor="black"
              ></NavigationLink>
              <NavigationLink
                bg="#51538f"
                text="Login"
                to="/login"
                textColor="white"
              ></NavigationLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
