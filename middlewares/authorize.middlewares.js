const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  next();
};

const authorizeAnalyst = (req, res, next) => {
  if (!["admin", "analyst"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Analysts and Admins only.",
    });
  }
  next();
};

export { authorizeAdmin, authorizeAnalyst };