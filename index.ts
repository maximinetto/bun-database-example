import app from "app";

const PORT = 3000;

app.listen(
  {
    port: PORT,
  },
  () => {
    console.info(`Server on port ${PORT}`);
  }
);
