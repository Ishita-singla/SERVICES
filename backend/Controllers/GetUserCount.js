const User= require("../Models/SignUpModel");

const getUserCount = async (req, res) => {
  // try {
  //   const userCount = await User.countDocuments({ role: "user" });
  //   res.status(200).json({ count: userCount });
  // } catch (err) {
  //   res.status(500).json({ message: "Error counting users" });
  // }
  try {
    const users = await User.find();
    const filtered = users.filter(u => u.role?.trim().toLowerCase() === "user");
    res.status(200).json({ count: filtered.length });
  } catch (err) {
    res.status(500).json({ message: "Error counting users" });
  }
};

module.exports = {
  getUserCount,
};
