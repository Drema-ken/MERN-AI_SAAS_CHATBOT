import { Box, useMediaQuery } from "@mui/material";
import Typing from "../components/shared/Typing";
import { useTheme } from "@emotion/react";
import Footer from "../components/Footer";

const Home = () => {
  const theme = useTheme();
  //@ts-ignore
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
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
            width: "100%",
            display: "flex",
            flexDirection: {
              md: "row",
              sm: "column",
              xs: "column",
            },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="aiRobot.jpg"
            alt="Home robot"
            style={{ margin: "auto", width: "200px" }}
          />
          <img
            src="gemini3.png"
            alt="gemini"
            height="120px"
            className=" rotate"
            style={{ margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", mx: "auto", width: "100%" }}>
          <img
            src="chat-temp.jpg"
            alt="chat temp"
            width={isBelowMd ? "80%" : "50%"}
            style={{
              display: "flex",
              margin: "auto",
              borderRadius: 20,
              boxShadow: "-5px 5px 105px #64f3d5",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
