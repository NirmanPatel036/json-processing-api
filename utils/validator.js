const Ajv = require("ajv");
const ajv = new Ajv();

// Schema: Defines what the input JSON MUST look like
const inputSchema = {
    type: "object",
    properties: {
        dataset: {
            type: "array",
            items: { type: "object" } // Array of objects
        },
        operation: { 
            type: "string", 
            enum: ["filter", "sort", "aggregate"] 
        },
        // Optional parameters depending on the operation
        criteria: { type: "object" },  // For filtering
        sortBy: { type: "string" },    // For sorting
        targetField: { type: "string" }, // For aggregation/sorting
        aggType: { type: "string", enum: ["sum", "average", "count"] } // For aggregation
    },
    required: ["dataset", "operation"],
    additionalProperties: false
};

const validate = ajv.compile(inputSchema);

module.exports = { validate };