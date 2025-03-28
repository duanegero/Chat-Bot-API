const router = require("express").Router();
const {
  getAllRiddlesIds,
  getRandomRiddle,
  getAllRiddleDetails,
} = require("../helper functions/getHelper");

const { postNewRiddle } = require("../helper functions/postHelper");

const { deleteRiddle } = require("../helper functions/deleteHelper");

const { updateRiddle } = require("../helper functions/putHelper");

router.get("/", async (req, res) => {
  try {
    const allRiddleDetails = await getAllRiddleDetails();

    res.status(200).json(allRiddleDetails);
  } catch (error) {
    console.error("Error fetching all riddles.", error.message, error.stack);
  }
});

router.get("/random", async (req, res) => {
  try {
    //variable to handle call to helper function
    const allRiddlesIds = await getAllRiddlesIds();

    //if nothing found in database return error status and message
    if (allRiddlesIds.length === 0) {
      return res.status(404).json({
        message: "No riddles found in the database",
      });
    }

    const randomIndex = Math.floor(Math.random() * allRiddlesIds.length);
    const randomId = allRiddlesIds[randomIndex].riddle_id;

    //variable to handle helper function call with passed in variable
    const randomRiddle = await getRandomRiddle(randomId);

    //return success status and json
    res.status(200).json(randomRiddle);
  } catch {
    //catch and log if any errors
    console.error(
      "Error occurred while fetching a riddle.",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "Error occurred while fetching a riddle.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  //varible to get riddle from body
  const { riddleToAdd } = req.body;

  //if nothing in body return error status and json
  if (!riddleToAdd) {
    return res.status(400).json({ message: "No riddle passed." });
  }

  try {
    //variable to handle helper function
    const newRiddle = await postNewRiddle(riddleToAdd);

    //if nothing returned from helper return error status and json
    if (!newRiddle) {
      return res.status(500).json({ message: "Failed to add new Riddle." });
    }

    //if error return error in json
    if (newRiddle.error) {
      return res.status(400).json({ error: newRiddle.error });
    }

    //return success status and json
    res.status(201).json({ message: "New riddle added." });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while adding new riddle:",
      error.message,
      error.stack
    );
  }
});

router.delete("/:id", async (req, res) => {
  //variable to handle id from url
  const riddleId = req.params.id;

  //if no id return error staus and json
  if (!riddleId) {
    return res.status(400).json({
      message: "No riddle ID passed.",
    });
  }

  try {
    //variable to handle helper function with passed in ID
    const deletedRiddle = await deleteRiddle(riddleId);

    //return success status and json
    res
      .status(200)
      .json({ message: "Riddle deleted succsssfully.", deletedRiddle });
  } catch (error) {
    //error message and status
    console.error("Error occurred while deleting riddle.", error);
    res.status(500).json({ error: "Failed to delete riddle from database." });
  }
});

router.put("/:id", async (req, res) => {
  //variable to handle the Id in Url
  const riddleId = req.params.id;
  //variable to handle request in body
  const { riddleToUpdate } = req.body;

  //if no Id or body return error status and json
  if (!riddleId || !riddleToUpdate) {
    return res.status(500).json({ message: "No riddle ID or no update." });
  }

  try {
    //variable helper function with passed in variables
    const updatedRiddle = await updateRiddle(riddleId, riddleToUpdate);

    //if nothing returned respond error status and json
    if (!updatedRiddle) {
      return res.status(400).json({ message: "Failed to update riddle." });
    }

    //if error return respond error status and json
    if (updatedRiddle.error) {
      return res.status(400).json({ error: updatedRiddle.error });
    }

    //return success status and json
    res.status(200).json({ message: "Riddle updated", updatedRiddle });
  } catch (error) {
    //catch if any errors log and return error status
    console.error("Error occurred while updating riddle.", error);
    res.status(500).json({ error: "Error occurred while updating riddle." });
  }
});

module.exports = router;
