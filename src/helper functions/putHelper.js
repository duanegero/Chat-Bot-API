//requiring prisma to sen queries to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateJoke = async (jokeId, jokeToUpdate) => {
  //variable to make ID an Int
  const jokeIdInt = parseInt(jokeId);

  try {
    //variable to handle prisma query to find if joke exists
    const findJoke = await prisma.jokes.findUnique({
      where: {
        joke_id: jokeIdInt,
      },
    });

    //if joke not found throw error
    if (!findJoke) {
      throw new Error(`Joke ID: ${jokeIdInt} can not be found.`);
    }

    //variable to handle prisma query to update joke
    const updatedJoke = await prisma.jokes.update({
      where: {
        joke_id: jokeIdInt,
      },
      data: { joke: jokeToUpdate },
    });

    //if unable to update return error
    if (!updatedJoke) {
      return { error: "Error updating joke." };
    }
    //return message and update
    return { message: "Joke updated", updatedJoke };
  } catch (error) {
    //catch and log any error
    console.error("Error updating joke.", error.message);
    return { error: "An error occurred while updating joke." };
  }
};

const updateRiddle = async (riddleId, riddleToUpdate) => {
  //variable to make ID an Int
  const riddleIdInt = parseInt(riddleId);

  try {
    //variable to handle prisma query to find if riddle exists
    const findRiddle = await prisma.riddles.findUnique({
      where: { riddle_id: riddleIdInt },
    });

    //if riddle not found throw error
    if (!findRiddle) {
      throw new Error(`Riddle ID ${riddleIdInt} not found.`);
    }

    //variable to handle prisma query to update riddle
    const updatedRiddle = await prisma.riddles.update({
      where: { riddle_id: riddleIdInt },
      data: {
        riddle: riddleToUpdate,
      },
    });

    //if unable to update return error
    if (!updatedRiddle) {
      return { error: "Error updating riddle." };
    }
    //return message and update
    return { message: "Updated riddle.", updatedRiddle };
  } catch (error) {
    //catch and log any error
    console.error("Error updating joke.", error.message);
    return { error: "An error occurred while updating joke." };
  }
};

module.exports = { updateJoke, updateRiddle };
