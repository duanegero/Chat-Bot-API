//requiring prisma to sen queries to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllJokesDetails = async () => {
  try {
    //varible to handle prisma query
    const allJokeDetails = await prisma.jokes.findMany({
      select: {
        joke: true,
      },
    });

    //if nothing return message
    if (!allJokeDetails) {
      return { message: "No jokes found in database." };
    }

    //return to use else where
    return allJokeDetails;
  } catch (error) {
    //catch and log any errors
    console.error("Error fetching jokes:", error);
    throw error;
  }
};

const getAllJokesIds = async () => {
  try {
    //variable to handle prisma query
    const allJokesIds = await prisma.jokes.findMany({
      select: { joke_id: true },
    });
    //return results
    return allJokesIds;
  } catch (error) {
    //catch if any errors
    console.error("Error fetching joke IDs.", error);
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
      return null;
    }

    //return joke to use in app
    return randomJoke;
  } catch (error) {
    //catch and log any errors if found
    console.error("Error fetching joke from database.", error);
    throw error;
  }
};

const getAllRiddleDetails = async () => {
  try {
    //varible to handle prisma query
    const allRiddleDetails = await prisma.riddles.findMany({
      select: {
        riddle: true,
      },
    });

    //if nothing return message
    if (!allRiddleDetails) {
      return { message: "No riddles found in database." };
    }

    return allRiddleDetails;
  } catch (error) {
    //catch and log any errors
    console.error("Error fetching riddles:", error);
    throw error;
  }
};

const getAllRiddlesIds = async () => {
  try {
    //variable to handle prisma query
    const allRiddlesIds = await prisma.riddles.findMany({
      select: { riddle_id: true },
    });
    //return results
    return allRiddlesIds;
  } catch (error) {
    //catch if any errors
    console.error("Error fetching riddle Ids.", error);
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

const getAllFactsDetails = async () => {
  try {
    const allFactsDetails = await prisma.facts.findMany({
      select: {
        fact: true,
      },
    });

    //if nothing return message
    if (!allFactsDetails) {
      return { message: "No facts found in database." };
    }

    //return to use else where
    return allFactsDetails;
  } catch (error) {
    //catch and log any errors
    console.error("Error fetching facts:", error);
    throw error;
  }
};

const getAllFactIds = async () => {
  try {
    const allFactIds = await prisma.facts.findMany({
      select: { fact_id: true },
    });

    return allFactIds;
  } catch (error) {
    //catch if any errors
    console.error("Error fetching fact IDs.", error);
  } finally {
    //disconnect when done
    await prisma.$disconnect();
  }
};

const getRandomFact = async (randomId) => {
  const randomIdInt = parseInt(randomId, 10);

  try {
    const randomFact = await prisma.facts.findUnique({
      where: {
        fact_id: randomIdInt,
      },
      select: {
        fact: true,
      },
    });

    if (!randomFact) {
      console.log("No fact found.");
    }
    return randomFact;
  } catch (error) {
    //catch and log any errors if found
    console.error("Error fetching fact from database.", error);
    throw error;
  }
};

module.exports = {
  getAllJokesIds,
  getRandomJoke,
  getAllRiddlesIds,
  getRandomRiddle,
  getAllJokesDetails,
  getAllRiddleDetails,
  getAllFactsDetails,
  getAllFactIds,
  getRandomFact,
};
