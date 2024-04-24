const Provider = require("../models/provider");

const getAllProvider = async (req, res) => {
  try {
    // Query all providers from the database
    const providers = await Provider.find();

    // If providers are found, return them
    if (providers) {
      res.status(200).json(providers);
    } else {
      // If no providers are found, return an empty array
      res.status(200).json([]);
    }
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const setProvider = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, address, phoneNumber, providerLogo } =
      req.body;

    // Check if email already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new provider
    const user = await Provider.create({
      name,
      email,
      password,
      address,
      phoneNumber: Number(phoneNumber),
      providerLogo,
      isAuthorized: true,
    });

    if (user) {
      res
        .status(201)
        .json({ _id: user.id, email: user.email, phone: user.phoneNumber });
    } else {
      res.status(400);
      throw new Error("user not created");
    }

    res.status(201);
  } catch (error) {
    console.error("Error creating provider:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getAllProvider,
  setProvider,
};
