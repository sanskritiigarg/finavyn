import Record from "../models/record.models.js";

const createRecord = async (data) => {
  const record = new Record(data);
  await record.save();
  return record;
};

const getRecords = async (filters = {}, pagination = {}) => {
  const query = { deletedAt: null };

  // Filter: type (income | expense)
  if (filters.type) {
    query.type = filters.type;
  }

  // Filter: category
  if (filters.category) {
    query.category = filters.category;
  }

  // Filter: date range
  if (filters.from || filters.to) {
    query.date = {};
    if (filters.from) query.date.$gte = new Date(filters.from);
    if (filters.to)   query.date.$lte = new Date(filters.to);
  }

  const { page = 1, limit = 10 } = pagination;
  const skip = (page - 1) * limit;

  const [records, total] = await Promise.all([
    Record.find(query).sort({ date: -1 }).skip(skip).limit(limit),
    Record.countDocuments(query),
  ]);

  return { records, total };
};

const getRecordById = async (id) => {
  const record = await Record.findOne({ _id: id, deletedAt: null });

  if (!record) {
    throw new Error("Record not found");
  }

  return record;
};

const updateRecord = async (id, data) => {
  const record = await Record.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!record) {
    throw new Error("Record not found");
  }

  return record;
};

const softDeleteRecord = async (id) => {
  const record = await Record.findOne({ _id: id, deletedAt: null });

  if (!record) {
    throw new Error("Record not found");
  }

  record.deletedAt = new Date();
  await record.save();

  return record;
};

export { createRecord, getRecords, getRecordById, updateRecord, softDeleteRecord };