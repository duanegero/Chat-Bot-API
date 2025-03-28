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
    const allFactsDetails = await getAllFactsDetails();

    res.status(200).json(allFactsDetails);
  } catch (error) {
    console.error("Error fetching all facts.", error.message, error.stack);
  }
});

router.get("/random", async (req, res) => {
  try {
    const allFactIds = await getAllFactIds();

    if (allFactIds.length === 0) {
      return res
        .status(404)
        .json({ message: "No facts found in the databse." });
    }

    const randomIndex = Math.floor(Math.random() * allFactIds.length);
    const randomId = allFactIds[randomIndex].fact_id;

    const randomFact = await getRandomFact(randomId);

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
  const { factToAdd } = req.body;

  if (!factToAdd) {
    return res.status(400).json({ message: "No fact passed in body." });
  }

  try {
    const newFact = await postNewFact(factToAdd);

    if (!newFact) {
      return res.status(500).json({ message: "Failed to add new fact." });
    }

    if (newFact.error) {
      return res.status(400).json({ error: newFact.error });
    }

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
  const factId = req.params.id;

  if (!factId) {
    return res.status(400).json({ message: "No fact ID passed." });
  }

  try {
    const deletedFact = await deleteFact(factId);

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
  const factId = req.params.id;

  const { factToUpdate } = req.body;

  if (!factId || !factToUpdate) {
    return res
      .status(400)
      .json({ message: "Fact ID or Updated fact is missing." });
  }

  try {
    const updatedFact = await updateFact(factId, factToUpdate);

    if (!updatedFact) {
      return res.status(500).json({ message: "Failed to update fact." });
    }

    if (updatedFact.error) {
      return res.status(400).json({ error: updatedFact.error });
    }

    res.status(200).json({ message: "Updated fact", updatedFact });
  } catch (error) {
    //catch if any errors log and return error status
    console.error("Error occurred while updating fact.", error);
    res.status(500).json({ error: "Error occurred while updating fact." });
  }
});

module.exports = router;
