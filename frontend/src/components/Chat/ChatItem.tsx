import { Avatar, Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const isCodeBlock = (str: string) => {
  if (str.includes("Explanation")) return false;
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
};
const extractCode = (str: string) => {
  if (str.includes("```")) {
    const blocks = str.split("```");
    return blocks;
  }
};

const formatResponse = (str: string) => {
  const newStr = str
    .split("**")

    .map((e, i) => {
      if (i % 2 !== 0) {
        return `<b style={{color:'red'}}> ${e}</b >`;
      }
      return `${e}`;
    })
    .join();
  console.log(newStr);
  return newStr;
};

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "model";
}) => {
  const messageBlocks = extractCode(content);
  return role === "user" ? (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#004d56",
          my: 2,
          p: 3,
          gap: 2,
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <Avatar sx={{ alignSelf: "start", bgcolor: "black", color: "white" }}>
          id
        </Avatar>
        <Box sx={{}}>{content}</Box>
      </Box>
    </>
  ) : (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#004d5613",
          my: 2,
          p: 3,
          gap: 2,
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <Avatar sx={{ alignSelf: "start" }}>
          <img
            src="chatbot.jpg"
            alt="chat-img"
            width="155px"
            style={{ borderRadius: "50%" }}
          />
        </Avatar>
        <Box sx={{ width: "100%" }}>
          {!messageBlocks && <Typography>{content}</Typography>}
          {messageBlocks &&
            messageBlocks.length !== 0 &&
            messageBlocks.map((block) =>
              isCodeBlock(block) ? (
                <Box sx={{ display: "flex" }}>
                  <SyntaxHighlighter
                    style={coldarkDark}
                    customStyle={{
                      width: "90%",
                      padding: "2px",
                    }}
                    language="javascript"
                  >
                    {formatResponse(block)}
                  </SyntaxHighlighter>
                </Box>
              ) : (
                <p
                  style={{ paddingRight: "3px" }}
                  dangerouslySetInnerHTML={{ __html: block }}
                ></p>
              )
            )}
        </Box>
      </Box>
    </>
  );
};

export default ChatItem;
