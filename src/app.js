const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const respository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(respository);

  console.log(repositories);

  return response.json(respository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  if (!title && !url && !techs) return response.status(400).json();

  const repo = repositories.find((r) => r.id === id);

  if (!repo)
    return response.status(400).json({ message: "Repository not found" });

  const index = repositories.indexOf(repo);

  repo.title = title ? title : repo.title;
  repo.url = url ? url : repo.urepol;
  repo.techs = techs ? techs : repo.techs;

  repositories.splice(index, repo);

  console.log(repositories);

  return response.status(200).json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if (!id)
    return response
      .status(400)
      .json({ message: "You should choose a repository for delete" });

  const repo = repositories.find((r) => r.id === id);

  if (!repo)
    return response.status(400).json({ message: "Repository not found" });

  const index = repositories.indexOf(repo);

  repositories.splice(index, 1);

  console.log(repositories);

  return response.status(204).json({ success: true });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if (!id) return response.status(400).json({});

  const repo = repositories.find((r) => r.id === id);

  if (!repo)
    return response.status(400).json({ message: "Repository not found" });

  const index = repositories.indexOf(repo);

  repo.likes = repo.likes + 1;

  repositories.splice(index, repo);

  return response.json({ likes: repo.likes });
});

module.exports = app;
