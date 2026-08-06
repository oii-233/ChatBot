import express from "express";
import cors from "cors";
import messageRoutes from "./routes/message.routes";
import chatRoutes from "./routes/chat.routes";


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Chatbot backend running 🚀");
});


app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatRoutes);


export default app;