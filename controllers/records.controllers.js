import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  softDeleteRecord,
} from "../services/records.services.js";

const createFinancialRecord = async (req, res, next) => {
  try {
    const record = await createRecord(req.body);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Financial record created",
      data: { record },
    });
  } catch (error) {
    next(error);
  }
};

const getAllRecords = async (req, res, next) => {
  try {
    const { type, category, from, to, page = 1, limit = 10 } = req.query;

    const filters = { type, category, from, to };
    const pagination = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    
    const { records, total } = await getRecords(filters, pagination);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Records fetched",
      data: {
        records,
        pagination: {
          total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: Math.ceil(total / pagination.limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOneRecord = async (req, res, next) => {
  try {
    const record = await getRecordById(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Record found",
      data: { record },
    });
  } catch (error) {
    next(error);
  }
};

const updateFinancialRecord = async (req, res, next) => {
  try {
    const record = await updateRecord(req.params.id, req.body);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Record updated",
      data: { record },
    });
  } catch (error) {
    next(error);
  }
};

const deleteFinancialRecord = async (req, res, next) => {
  try {
    const record = await softDeleteRecord(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Record deleted",
      data: { record },
    });
  } catch (error) {
    next(error);
  }
};

export {
  createFinancialRecord,
  getAllRecords,
  getOneRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
};