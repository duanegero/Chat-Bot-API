const router = require("express").Router();
const {
  getAllJokesIds,
  getRandomJoke,
  getAllJokesDetails,
} = require("../helper functions/getHelper");

const { postNewJoke } = require("../helper functions/postHelper");

const { deleteJoke } = require("../helper functions/deleteHelper");

const { updateJoke } = require("../helper functions/putHelper");

router.get("/", async (req, res) => {
  try {
    //variable to handle call to helper function
    const allJokesDetails = await getAllJokesDetails();

    //respond with ok status and json
    res.status(200).json(allJokesDetails);
  } catch (error) {
    //catch and log if any errors
    console.error("Error fetching all jokes.", error.message, error.stack);
  }
});

router.get("/random", async (req, res) => {
  try {
    //test
    //variable to handle helper function to get count of jokes
    const allJokeIds = await getAllJokesIds();

    //if nothing returned return error status 404
    if (allJokeIds.length === 0) {
      return res.status(404).json({
        message: "No jokes found in the database.",
      });
    }

    // Randomly select a joke_id from the list of joke IDs
    const randomIndex = Math.floor(Math.random() * allJokeIds.length);
    const randomId = allJokeIds[randomIndex].joke_id;

    //variable to handle helper function with passed in variable
    const randomJoke = await getRandomJoke(randomId);

    //return success status and json with returned joke
    res.status(200).json(randomJoke);
  } catch (error) {
    //catch and log if any errors
    console.error(
      "Error occurred while fetching a joke.",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "Error occurred while fetching a joke.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  //varible to handle new joke in request body
  const { jokeToAdd } = req.body;

  //if nothing in the body return error status and json
  if (!jokeToAdd) {
    return res.status(400).json({ message: "No joke passed in body." });
  }

  try {
    //variable to handle helper function with passed in variable
    const newJoke = await postNewJoke(jokeToAdd);

    //if nothing returned from helper return error status and json
    if (!newJoke) {
      return res.status(500).json({ message: "Failed to add new Joke." });
    }

    //if error return the error
    if (newJoke.error) {
      return res.status(400).json({ error: newJoke.error });
    }

    //return success status and json
    res.status(201).json({ message: "New joke added." });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while adding new joke:",
      error.message,
      error.stack
    );
  }
});

router.delete("/:id", async (req, res) => {
  //variable to handle id from url
  const jokeId = req.params.id;

  //if no id return error status and json
  if (!jokeId) {
    return res.status(400).json({ message: "No joke ID passed." });
  }

  try {
    //variable to handle helper function with passed in variable
    const deletedJoke = await deleteJoke(jokeId);

    //return success status and json
    res.status(200).json({
      message: "Joke deleted successfully.",
      deletedJoke,
    });
  } catch (error) {
    //error message and status
    console.error("Error occurred while deleting joke.", error);
    res.status(500).json({ error: "Failed to delete joke from database." });
  }
});

router.put("/:id", async (req, res) => {
  //variable to handle id from the url
  const jokeId = req.params.id;
  //variable to handle updated joke from the body
  const { jokeToUpdate } = req.body;

  //if no ID or updated joke return error status and json
  if (!jokeId || !jokeToUpdate) {
    return res.status(400).json({
      message: "Joke ID or Updated joke missing",
    });
  }

  try {
    //variable to handle helper function with passed in variables
    const updatedJoke = await updateJoke(jokeId, jokeToUpdate);

    //if nothing returned respond error status and json
    if (!updatedJoke) {
      return res.status(500).json({ message: "Failed to update joke." });
    }

    //if error return error status and json
    if (updatedJoke.error) {
      return res.status(400).json({ error: updatedJoke.error });
    }

    //return success status and json
    res.status(200).json({ message: "Update joke", updatedJoke });
  } catch (error) {
    //catch if any errors log and return error status
    console.error("Error occurred while updating joke.", error);
    res.status(500).json({ error: "Error occurred while updating joke." });
  }
});

module.exports = router;
