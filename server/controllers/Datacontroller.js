const Data = require('../models/Data');

const getdata = async (req, res) => {
    const { query, parameter } = req.body; // For example, query: 'country' and parameter: 'intensity'

    try {
        // Ensure query and parameter are valid

        if (!parameter) {
            return res.status(400).send("Parameter is required.");
        }

        let data = await Data.aggregate([
            {
                // Filter out documents where the 'query' or 'parameter' field is empty
                $match: {
                    [`${query}`]: { $ne: "" }, // Ensures 'query' field is not empty
                    [`${parameter}`]: { $ne: "" } // Ensures 'parameter' field is not empty
                }
            },
            {
                $group: {
                    _id: `$${query}`, // Group by the field specified in 'query' (e.g., 'country')
                    total: { $sum: `$${parameter}` }, // Sum the field specified in 'parameter' (e.g., 'intensity')
                    count: { $sum: 1 } // Count the number of documents in each group
                }
            }
        ]);


        // console.log("Data is: ", data);
        res.status(200).json({ success: true, result: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: false, result: "Internal server error" });
    }
};

const create = async (req, res) => {
    try {
        let data = await Data.create({
            intensity: 2,

        })
        await data.save();
        res.status(200).send("done")

    } catch (error) {
        res.status(500).send("eror")
    }
}
const getdatas = async (req, res) => {
    const { query, parameter } = req.body; // For example, query: 'country' and parameter: 'New York'

    try {
        // Ensure query and parameter are valid
        if (!query || !parameter) {
            return res.status(400).send("Query and parameter are required.");
        }

        // Aggregation pipeline
        let data = await Data.aggregate([
            {
                // Match documents where the `parameter` field matches the specified value
                $match: {
                    [`${query}`]: { $ne: "" }, // Ensure 'query' field is not empty
                    [`${parameter}`]: { $ne: "" } // Ensure 'parameter' field is not empty
                }
            },
            {
                // Group by the field specified in 'query' and add the 'parameter' as part of the '_id'
                $group: {
                    _id: {
                        query: `$${query}`, // The value of the field specified in 'query'
                        total: `$${parameter}` // The specified parameter value
                    },
                    count: { $sum: 1 } // Count the number of documents in each group
                }
            }
        ]);

        // Return the aggregated result
        res.status(200).json({ success: true, result: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, result: "Internal server error" });
    }
};

module.exports = { getdata, create, getdatas };
