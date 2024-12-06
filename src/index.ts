import createServer from "./utils/server";

const app = createServer();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡️[SERVER]: Server is running on port ${PORT}`);
});