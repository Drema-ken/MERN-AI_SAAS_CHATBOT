import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../Context/Authcontext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const auth = useAuth();
  const extractCodefromString = (message: string) => {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks;
    }
  };
  const isCodeBlock = (str: string) => {
    if (str.match(/[=;\[\]{}#\/\/]/g)) {
      return true;
    }
    return false;
  };
  isCodeBlock("hello");
  const messageBlock = extractCodefromString(content);
  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5613", gap: 2, my: 2 }}>
      <Avatar sx={{ ml: 0 }}>
        <img
          src="chatbot.jpg"
          alt="chatbot"
          width={"155px"}
          style={{ borderRadius: "50%" }}
        />
      </Avatar>
      <Box>
        {!messageBlock && (
          <Typography color={"white"} fontSize={"20px"}>
            {content}
          </Typography>
        )}
        {messageBlock &&
          messageBlock.length &&
          messageBlock.map((block) => {
            return isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography color={"white"} fontSize={"20px"}>
                {block}
              </Typography>
            );
          })}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
        {/*{auth?.user?.name[0]}{auth?.user?.name[1]}*/}idy
      </Avatar>
      <Box>
        <Typography color={"white"} fontSize={"20px"}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
