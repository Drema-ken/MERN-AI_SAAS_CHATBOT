import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/Customized-Input";
import { FiUserPlus } from "react-icons/fi";
import { useAuth } from "../Context/Authcontext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); //explain this new syntax
    const userName = formData.get("Name") as string;
    const email = formData.get("Email") as string;
    const password = formData.get("Password") as string; //what does it means to set something as string or a type
    try {
      if (!(userName === "" && email === "" && password === "")) {
        toast.loading("Signing up!", { id: "signup" });
        await auth?.signup(userName, email, password);
        navigate("/");
        toast.success("Successfully signed up!", { id: "signup" });
      }
    } catch (error: any) {
      console.log({ error: error.code, message: error.message });
      toast.error("Couldn't create account!", { id: "signup" });
    }
  };
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        m={"auto"}
        mt={16}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "5px 2px 10px #00fffc ",
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
              Signup
            </Typography>
            <CustomizedInput type="Name" label="Name" name="Name" />
            <CustomizedInput type="email" label="Email" name="Email" />
            <CustomizedInput type="password" label="Password" name="Password" />
            <Button
              type="submit"
              endIcon={<FiUserPlus />}
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
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
