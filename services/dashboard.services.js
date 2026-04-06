import Record from "../models/record.models.js";

const getSummary = async () => {
  const result = await Record.aggregate([
    { $match: { deletedAt: null } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const summary = { totalIncome: 0, totalExpenses: 0, netBalance: 0 };

  for (const item of result) {
    if (item._id === "income")  summary.totalIncome   = item.total;
    if (item._id === "expense") summary.totalExpenses = item.total;
  }

  summary.netBalance = summary.totalIncome - summary.totalExpenses;

  return summary;
};

const getByCategory = async (type) => {
  const match = { deletedAt: null };
  if (type) match.type = type;

  const categories = await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: { category: "$category", type: "$type" },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id.category",
        type: "$_id.type",
        total: 1,
        count: 1,
      },
    },
    { $sort: { total: -1 } },
  ]);

  return categories;
};

const getTrends = async ({ from, to, groupBy = "month" }) => {
  const match = { deletedAt: null };

  if (from || to) {
    match.date = {};
    if (from) match.date.$gte = new Date(from);
    if (to)   match.date.$lte = new Date(to);
  }

  // Build the date truncation expression based on groupBy
  const dateFormats = {
    day:   { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
    week:  { $dateToString: { format: "%Y-W%V",   date: "$date" } },
    month: { $dateToString: { format: "%Y-%m",    date: "$date" } },
  };

  const dateGroup = dateFormats[groupBy] ?? dateFormats.month;

  const trends = await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: { period: dateGroup, type: "$type" },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        period: "$_id.period",
        type: "$_id.type",
        total: 1,
        count: 1,
      },
    },
    { $sort: { period: 1 } },
  ]);

  return trends;
};

const getRecentRecords = async (limit = 5) => {
  const records = await Record.find({ deletedAt: null })
    .sort({ date: -1 })
    .limit(limit);

  return records;
};

export { getSummary, getByCategory, getTrends, getRecentRecords };