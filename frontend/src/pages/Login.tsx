import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/Customized-Input";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../Context/Authcontext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); //explain this new syntax
    const email = formData.get("Email") as string;
    const password = formData.get("Password") as string; //what does it means to set something as string or a type
    try {
      toast.loading("Signing in!", { id: "login" });
      await auth?.login(email, password);
      navigate("/");
      toast.success("Successfully signed In!", { id: "login" });
    } catch (error: any) {
      console.log({ error: error.code, message: error.message });
      toast.error("Signing In Failed!", { id: "login" });
    }
  };
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="aiRobot4.jpg"
          className="image-with-background"
          alt="Robot"
          style={{ width: "400px" }}
        />
        {/*change this image to the ai robot so it can look way cooler*/}
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" label="Email" name="Email" />
            <CustomizedInput type="password" label="Password" name="Password" />
            <Button
              type="submit"
              endIcon={<IoIosLogIn />}
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
