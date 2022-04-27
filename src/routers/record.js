const express = require("express");

const RecordModel = require("../models/record");

const router = express.Router();

router.use("/:recordId", async (req, res, next) => {
  const recordId = req.params.recordId;

  if (recordId && !recordId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).send("Record not found");
  }
  const foundRecord = await RecordModel.findById(recordId);
  if (!foundRecord) {
    return res.status(404).send("Record not found");
  }
  req.record = foundRecord;
  // req.recordIndex = index;
  return next();
});

router.get("/", async (req, res, next) => {
  const records = await RecordModel.find({}).sort({ timestamp: -1 });
  res.send(records);
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const newRecord = new RecordModel(body);

  const errors = newRecord.validateSync();
  if (errors) {
    const errorFieldNames = Object.keys(errors.errors);
    if (errorFieldNames.length > 0) {
      return res.status(400).send(errors.errors[errorFieldNames[0]].message);
    }
  }

  await newRecord.save();

  return res.status(201).send(newRecord);
});

router.put("/:recordId", async (req, res, next) => {
  const updateRecord = await RecordModel.findByIdAndUpdate(
    req.params.recordId,
    req.body
  );
  if (!updateRecord) {
    res.status(501).send("Not implemented");
  }
  return res.status(201).send(updateRecord);
});

router.delete("/:recordId", async (req, res, next) => {
  await RecordModel.deleteOne({ _id: req.params.recordId });
  return res.status(204).send(); // 204 = No content which mean it successfully removed
});

module.exports = router;
