//import prisma client to connect to data base
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining async function
const postNewRiddle = async (riddleToAdd) => {
  try {
    //variable to handle prisma query
    const newRiddle = await prisma.riddles.create({
      data: {
        riddle: riddleToAdd,
      },
    });

    //log success for testing
    console.log("New riddle added:", newRiddle);
    //return json
    return { message: "New riddle added", newRiddle };
  } catch (error) {
    //catch and log if any errors
    console.error("Error creating new riddle:", error);
    throw new Error("An error occurred while creating new riddle.");
  }
};

//defining async function
const postNewJoke = async (jokeToAdd) => {
  try {
    //variable to handle prisma query
    const newJoke = await prisma.jokes.create({
      data: {
        joke: jokeToAdd,
      },
    });

    //log success for testing
    console.log("New joke added:", newJoke);
    //return json
    return { message: "New joke added", newJoke };
  } catch (error) {
    //catch and log if any errors
    console.error("Error creating new joke:", error);
    throw new Error("An error occurred while creating new joke.");
  }
};

const postNewFact = async (factToAdd) => {
  try {
    const newFact = await prisma.facts.create({
      data: {
        fact: factToAdd,
      },
    });

    console.log("New fact added:", newFact);
    return { message: "New fact added", newFact };
  } catch (error) {
    //catch and log if any errors
    console.error("Error creating new fact:", error);
    throw new Error("An error occurred while creating new fact.");
  }
};

//export functions to use else where
module.exports = { postNewRiddle, postNewJoke, postNewFact };
