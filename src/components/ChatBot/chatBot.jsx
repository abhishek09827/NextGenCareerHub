import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";

import { IoCloseCircleOutline } from "react-icons/io5";

import axios from "axios";

const Chatbot = ({ clos }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatContainerRef = useRef(null);

  const handleNewUserMessage = async () => {
    if (!userInput.trim()) {
      // Don't send empty messages
      return;
    }

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, type: "user" },
    ]);
    setUserInput("");

    try {
      // Send the user's message to your backend for processing
      console.log(userInput);
      const response = await axios.post(
        "https://13ca-2409-40f2-b-b4dd-d0d7-4a0-a986-65ff.ngrok-free.app/webhook",
        { text: userInput },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
        }
      );
      console.log(response);
      // Add the chatbot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data, type: "chatbot" },
      ]);

      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    } catch (error) {
      console.error("Error processing message:", error);
      // Handle error response
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ marginTop: "50px", background: "black" }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(60, 60, 60, 0.329)",
          color: "white",

          maxHeight: "400px",
        }}
      >
        <div
          className="inline-head"
          style={{
            display: "flex ",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <h2 style={{ color: "aqua" }}> InfoBOT </h2>
          <span>
            <IoCloseCircleOutline
              style={{ fontSize: "2rem", color: "red", cursor: "pointer" }}
              onClick={clos}
            />
          </span>
        </div>
        <Box
          ref={chatContainerRef}
          style={{
            width: "100%",
            marginTop: "20px",
            paddingTop: "20px",
            paddingBottom: "20px",
            maxWidth: "300px",
            maxHeight: "600px",
            overflowY: "auto",
            border: "1px solid #ccc",
            background: "black",
          }}
        >
          {/* Chat container */}
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.type === "chatbot" ? "left" : "right",
                marginBottom: "10px",
              }}
            >
              <Typography
                component="span"
                variant="body1"
                style={{
                  background: message.type === "chatbot" ? "#eee" : "#4CAF50",
                  color: message.type === "chatbot" ? "#333" : "white",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                {message.text}
              </Typography>
            </div>
          ))}
        </Box>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{
                color: "white",
                background: "gray",
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleNewUserMessage}
              style={{
                padding: "13px",
              }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Chatbot;
