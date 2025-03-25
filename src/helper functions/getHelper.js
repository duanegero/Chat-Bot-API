//requiring prisma to sen queries to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllJokesCount = async () => {
  try {
    //variable to handle prisma query
    const allJokes = await prisma.jokes.count();
    //return results
    return allJokes;
  } catch (error) {
    //catch if any errors
    console.error("Error fetching joke count.", error);
  } finally {
    //disconnect when done
    await prisma.$disconnect();
  }
};

const getRandomJoke = async (randomId) => {
  //make the passed in ID an Int
  const randomIdInt = parseInt(randomId, 10);
  //log for testing
  console.log(randomIdInt);
  try {
    //variable to handle prisma query
    const randomJoke = await prisma.jokes.findUnique({
      where: {
        joke_id: randomIdInt,
      },
      select: {
        joke: true,
      },
    });

    //if nothing returned log
    if (!randomJoke) {
      console.log("No joke found.");
    }

    //return joke to use in app
    return randomJoke;
  } catch (error) {
    //catch and log any errors if found
    console.error("Error fetching joke from database.", error);
    throw error;
  }
};

const getAllRiddlesCount = async () => {
  try {
    //variable to handle prisma query
    const allRiddles = await prisma.riddles.count();
    //return results
    return allRiddles;
  } catch (error) {
    //catch if any errors
    console.error("Error fetching riddle count.", error);
  } finally {
    //disconnect when done
    await prisma.$disconnect();
  }
};

const getRandomRiddle = async (randomId) => {
  //variable to make id into a Int
  const randomIdInt = parseInt(randomId, 10);
  //log for testing
  console.log(randomIdInt);

  try {
    //variable to handle prisma query
    const randomRiddle = await prisma.riddles.findUnique({
      where: {
        riddle_id: randomIdInt,
      },
      select: {
        riddle: true,
      },
    });

    //if nothing returned log
    if (!randomRiddle) {
      console.log("No riddle found.");
    }
    //return ridlle to use in app
    return randomRiddle;
  } catch (error) {
    //catch and log any errors if found
    console.error("Error fetching riddle from database.", error);
    throw error;
  }
};

module.exports = {
  getAllJokesCount,
  getRandomJoke,
  getAllRiddlesCount,
  getRandomRiddle,
};
