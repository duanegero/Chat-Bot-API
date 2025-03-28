//requiring prisma to sen queries to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const deleteRiddle = async (riddleId) => {
  //varible to make id into an int
  const riddleIdInt = parseInt(riddleId);

  //variable to handle prisma query
  const riddleToDelete = await prisma.riddles.findUnique({
    where: { riddle_id: riddleIdInt },
  });

  //if nothing returned throw new error
  if (!riddleToDelete) {
    throw new Error("Riddle not found.");
  }

  //prisma query to delete riddle
  await prisma.riddles.delete({
    where: { riddle_id: riddleIdInt },
  });
};

const deleteJoke = async (jokeId) => {
  //varible to make id into an int
  const jokeIdInt = parseInt(jokeId);

  //variable to handle prisma query
  const jokeToDelete = await prisma.jokes.findUnique({
    where: { joke_id: jokeIdInt },
  });

  //if no joke found throw error
  if (!jokeToDelete) {
    throw new Error("No joke found.");
  }

  //prisma query to delete joke from DB
  await prisma.jokes.delete({
    where: { joke_id: jokeIdInt },
  });
};

const deleteFact = async (factId) => {
  //varible to make id into an int
  const factIdInt = parseInt(factId);

  //variable to handle prisma query
  const factToDelete = await prisma.facts.findUnique({
    where: { fact_id: factIdInt },
  });

  //if nothing returned throw new error
  if (!factToDelete) {
    throw new Error("No fact found.");
  }

  //prisma query to delete fact
  await prisma.facts.delete({
    where: { fact_id: factIdInt },
  });
};

module.exports = {
  deleteRiddle,
  deleteJoke,
  deleteFact,
};
