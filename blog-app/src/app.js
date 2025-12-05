const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

app.use(express.json());

const postRoutes = require("./routes/postRoutes");

// Use routes
app.use("/api", postRoutes);

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
