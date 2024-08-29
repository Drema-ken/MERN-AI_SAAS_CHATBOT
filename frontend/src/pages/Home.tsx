import { Box } from "@mui/material";
import Typing from "../components/shared/Typing";

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"} flex={"flex"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Box>
          <Typing />
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: {
              md: "row",
              sm: "column",
              xs: "column",
              gap: 5,
              my: 10,
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <img
            src="aiRobot.jpg"
            alt="Home robot"
            style={{ marginTop: "auto" }}
          />
          <img
            src="gemini3.png"
            alt="gemini"
            height="120px"
            className=" rotate"
          />
        </Box>
        <Box>
          <img
            src="chat-temp.jpg"
            alt="chat template"
            style={{ boxShadow: "1px 1px 20px #00fffc", borderRadius: "10px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
