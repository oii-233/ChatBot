import app from "./app";
import { ensureChatTable } from "./utils/ensure-chat-table";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await ensureChatTable();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database schema", error);
    process.exit(1);
  }
};

startServer();