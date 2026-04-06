import {
  getSummary,
  getByCategory,
  getTrends,
  getRecentRecords,
} from "../services/dashboard.services.js";

const getDashboardSummary = async (req, res, next) => {
  try {
    const summary = await getSummary();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Dashboard summary fetched",
      data: { summary },
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardByCategory = async (req, res, next) => {
  try {
    const { type } = req.query;
    const categories = await getByCategory(type);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Category breakdown fetched",
      data: { categories },
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardTrends = async (req, res, next) => {
  try {
    const { from, to, groupBy = "month" } = req.query;
    const trends = await getTrends({ from, to, groupBy });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Trends fetched",
      data: { trends },
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardRecent = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const records = await getRecentRecords(limit);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Recent records fetched",
      data: { records },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getDashboardSummary,
  getDashboardByCategory,
  getDashboardTrends,
  getDashboardRecent,
};