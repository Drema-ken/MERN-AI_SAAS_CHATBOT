import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../Context/Authcontext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/Chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {
  chatting,
  deleteAllChats,
  fetchingAllChats,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "model";
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();

  //@ts-ignore
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const Submit = async () => {
    const recentPrompt = inputRef.current?.value as string;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: recentPrompt },
    ]);
    //set input value to ''
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    if (recentPrompt !== "") {
      const result = await chatting(recentPrompt);
      try {
        //@ts-ignore
        const chats = result.map((chat) => {
          //@ts-ignore
          return { role: chat.role, content: chat.parts[0].text };
        });
        setChatMessages(() => [...chats]);
        console.log(chats);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChatDelete = async () => {
    try {
      toast.loading("Deleting chats", { id: "delete" });
      await deleteAllChats();
      setChatMessages([]);
      toast.success("Successfully deleted chats", { id: "delete" });
    } catch (err) {
      toast.error("Failed to delete chats", { id: "delete" });
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.isLoggedIn) {
      try {
        toast.loading("Loading chats", { id: "loadChats" });
        const getChats = async () => {
          const chats = await fetchingAllChats();
          console.log(chats);
          setChatMessages(chats);
        };
        getChats().then(() =>
          toast.success("Successfully loaded chats!", { id: "loadChats" })
        );
      } catch (error) {
        toast.error("Failed to load Chats", { id: "loadChats" });
        console.log(error);
      }
    }
  }, [auth]);
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%", mt: 3, gap: 3 }}>
      <Box
        sx={{
          display: {
            md: "flex",
            sm: "none",
            xs: "none",
            flex: 0.2,
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,23,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name[1]}
          </Avatar>
          <Typography
            sx={{ mx: "auto", fontFamily: '"Trebuchet Ms" consolas' }}
          >
            You are talking to a chatbot
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: '"Trebuchet Ms" consolas',
              my: 4,
              padding: 3,
            }}
          >
            You can ask questions related to Business, Coding, Advices and more.
            But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleChatDelete}
            sx={{
              width: "200px",
              m: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A200,
              },
            }}
          >
            CLEAR CONVERSATION
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - Gemini Pro
        </Typography>
        <Box
          sx={{
            width: "80vw",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => {
            return (
              //@ts-ignore
              <ChatItem
                content={chat.content}
                role={chat.role}
                key={index}
              ></ChatItem>
            );
          })}
        </Box>
        <Box>
          <div
            style={{
              width: "90%",
              padding: "20px",
              borderRadius: 8,
              backgroundColor: "rgb(17,27,39)",
              display: "flex",
              margin: "auto",
            }}
          >
            <input
              onFocus={(e) => {
                document.addEventListener("keydown", (event) => {
                  if (event.key === "Enter") {
                    Submit();
                  }
                });
              }}
              ref={inputRef}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
            <IconButton sx={{ ml: "auto", color: "white" }} onClick={Submit}>
              <IoMdSend />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
