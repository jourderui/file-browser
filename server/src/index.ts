import { createServer } from "./utils/server";
const port = process.env.PORT || 3101;
createServer()
  .then((server) => {
    server.listen(port, () => {
      console.info(`Listening: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });
