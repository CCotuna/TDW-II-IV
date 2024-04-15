import http from "http";
import axios from "axios";
const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.setHeader("Content-Type", "application/json");

  try {
    const response = await axios.get(
      "https://bible-api.com/?random=verse&translation=rccv"
    );
    const verse = response.data;
    res.end(JSON.stringify(verse));
  } catch (error) {
    console.log("Error fetching verse: ", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Error fetching verse" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
