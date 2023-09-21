import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/get-dashboard-films", async (req, res) => {
  const films = await prisma.film.findMany({
    take: 20,
  });

  const recentFilms = await prisma.film.findMany({
    take: 5,
    orderBy: {
      releaseDate: "desc",
    },
  });

  res.json({
    trending: films.slice(0, 5),
    forYou: films.slice(5, 10),
    recent: recentFilms,
  });
});

app.get("/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;

  const films = await prisma.film.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
          },
        },
        {
          description: {
            contains: searchTerm,
          },
        },
      ],
    },
  });

  res.json({
    films,
  });
});

app.get("/get-film/:filmId", async (req, res) => {
  const filmId = parseInt(req.params.filmId, 10);

  const film = await prisma.film.findFirst({
    where: {
      id: filmId,
    },
  });

  res.json({
    film,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
