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

  return response.json(respository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepositoryIndex = repositories.findIndex(
    (respository) => respository.id === id
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: "Repository does not exists" });
  }

  const repository = {
    id,
    title: title || repositories[findRepositoryIndex].title,
    url: url || repositories[findRepositoryIndex].url,
    techs: techs || repositories[findRepositoryIndex].techs,
    likes: repositories[findRepositoryIndex].likes,
  };

  repositories[findRepositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if (!id)
    return response
      .status(400)
      .json({ message: "You should choose a repository for delete" });

  const findRepositoryIndex = repositories.findIndex(
    (respository) => respository.id === id
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ message: "Repository does not exists" });
  }

  repositories.splice(findRepositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(
    (respository) => respository.id === id
  );

  if (findRepositoryIndex === -1)
    return response.status(400).json({ message: "Repository does not exist" });

  repositories[findRepositoryIndex].likes++;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
