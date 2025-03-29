const router = require("express").Router();

const {
  getAllFactsDetails,
  getAllFactIds,
  getRandomFact,
} = require("../helper functions/getHelper");

const { postNewFact } = require("../helper functions/postHelper");

const { deleteFact } = require("../helper functions/deleteHelper");

const { updateFact } = require("../helper functions/putHelper");

router.get("/", async (req, res) => {
  try {
    //variable to handle call to helper function
    const allFactsDetails = await getAllFactsDetails();

    //respond with ok status and json
    res.status(200).json(allFactsDetails);
  } catch (error) {
    //catch and log if any errors
    console.error("Error fetching all facts.", error.message, error.stack);
  }
});

router.get("/random", async (req, res) => {
  try {
    //variable to handle helper function to get count
    const allFactIds = await getAllFactIds();

    //if nothing returned return error status 404
    if (allFactIds.length === 0) {
      return res
        .status(404)
        .json({ message: "No facts found in the databse." });
    }

    // Randomly select a fact_id from the list of fact IDs
    const randomIndex = Math.floor(Math.random() * allFactIds.length);
    const randomId = allFactIds[randomIndex].fact_id;

    //variable to handle helper function with passed in variable
    const randomFact = await getRandomFact(randomId);

    //return success status and json
    res.status(200).json(randomFact);
  } catch (error) {
    //catch and log if any errors
    console.error(
      "Error occurred while fetching a fact.",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "Error occurred while fetching a fact.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  //varaible to handle req body
  const { factToAdd } = req.body;

  //if nothing in the body return error status and json
  if (!factToAdd) {
    return res.status(400).json({ message: "No fact passed in body." });
  }

  try {
    //variable to handle helper function with passed in variable
    const newFact = await postNewFact(factToAdd);

    //if nothing returned from helper return error status and json
    if (!newFact) {
      return res.status(500).json({ message: "Failed to add new fact." });
    }

    //if error return the error
    if (newFact.error) {
      return res.status(400).json({ error: newFact.error });
    }

    //return success status and json
    res.status(201).json({ message: "New fact added." });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while adding new fact:",
      error.message,
      error.stack
    );
  }
});

router.delete("/:id", async (req, res) => {
  //variable to handle id from url
  const factId = req.params.id;

  //if no id return error status and json
  if (!factId) {
    return res.status(400).json({ message: "No fact ID passed." });
  }

  try {
    //variable to handle helper function with passed in variable
    const deletedFact = await deleteFact(factId);

    //return success status and json
    res.status(200).json({
      message: "Fact deleted successfully.",
      deletedFact,
    });
  } catch (error) {
    //error message and status
    console.error("Error occurred while deleting fact.", error);
    res.status(500).json({ error: "Failed to delete fact from database." });
  }
});

router.put("/:id", async (req, res) => {
  //variable to handle id from the url
  const factId = req.params.id; //variable to handle updated joke from the body
  const { factToUpdate } = req.body;

  //if no ID or updated fact return error status and json
  if (!factId || !factToUpdate) {
    return res
      .status(400)
      .json({ message: "Fact ID or Updated fact is missing." });
  }

  try {
    //variable to handle helper function with passed in variables
    const updatedFact = await updateFact(factId, factToUpdate);

    //if nothing returned respond error status and json
    if (!updatedFact) {
      return res.status(500).json({ message: "Failed to update fact." });
    }

    //if error return error status and json
    if (updatedFact.error) {
      return res.status(400).json({ error: updatedFact.error });
    }

    //return success status and json
    res.status(200).json({ message: "Updated fact", updatedFact });
  } catch (error) {
    //catch if any errors log and return error status
    console.error("Error occurred while updating fact.", error);
    res.status(500).json({ error: "Error occurred while updating fact." });
  }
});

module.exports = router;
