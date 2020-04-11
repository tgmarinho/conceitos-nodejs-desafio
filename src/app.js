const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
  {
    id: "3af969d8-a88b-4205-a0ef-4fe045334730",
    title: "Desafio de Node.js",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "4ca32c08-c817-4a0e-b552-24deaa731456",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "50649263-a2de-4028-a853-fb4aa64311f5",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "2a341a4e-930f-407a-a2b7-84a6518c410a",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "64f319f1-6652-4d3c-a0f0-0f73008d0df9",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "e662d26f-c4b2-41ab-95fa-bd80f317b527",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "ffd9c0ba-8b7a-4c29-9ced-aeb9b3ab026d",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "8ae4407b-7ab0-4d33-aadf-f55c20987782",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "bd4dc116-71a5-4635-aa47-b96989b646c5",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "6376dda2-fffc-4643-9b98-50b987504225",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
  {
    id: "fbe527bd-2fb3-4f1b-9bd9-e3b5cd21f92f",
    title: "Desafio de Node.js dete",
    url: "http://github.com/tgmarinho/conceitos-nodejs-desafio",
    techs: ["Node.js", "JEST", "Insomina"],
    likes: 0,
  },
];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const respository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(respository);

  console.log(repositories);

  return response.json({ respository });
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  if (!title && !url && !techs)
    return response
      .status(400)
      .json({ message: "You should update title, url or techs" });

  if (!repositories.some((r) => r.id === id))
    return response.status(400).json({ message: "Repository not found" });

  repositories
    .filter((respository) => respository.id === id)
    .map((r) => {
      r.id;
      r.likes;
      r.title = title ? title : r.title;
      r.url = url ? url : r.url;
      r.techs = techs ? techs : r.techs;
    });

  console.log(repositories);

  return response.status(204).json({ success: true });
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

  if (!id)
    return response
      .status(400)
      .json({ message: "You should choose a repository for like it" });

  const repo = repositories.find((r) => r.id === id);

  if (!repo)
    return response.status(400).json({ message: "Repository not found" });

  const index = repositories.indexOf(repo);

  repo.likes = repo.likes + 1;

  repositories.splice(index, repo);

  return response.json();
});

module.exports = app;
