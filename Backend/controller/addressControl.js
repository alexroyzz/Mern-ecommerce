import Address from "../models/Address.js";

//saveApi
export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.json({ message: "Address saved successfully", address });
  } catch (error) {
    console.error("Save Address Error:", error);
    res.status(500).json({ error: "Failed to save address" });
  }
};

//getaddressApi

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.json(addresses);
  } catch (error) {
    console.error("Get Addresses Error:", error);
    res.status(500).json({ error: "Failed to get addresses" });
  }
};
