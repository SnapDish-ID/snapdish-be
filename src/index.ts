import createServer from "./config/server";

const app = createServer();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡️ [Server]  : server is listening on port ${PORT}`);
})