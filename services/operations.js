// 1. FILTERING
// Filters the dataset based on key-value pairs in 'criteria'
const filterData = (data, criteria) => {
    if (!criteria) return data;

    return data.filter(item => {
        let isValid = true;
        for (const key in criteria) {
            // If the item doesn't match the criteria, fail it
            if (item[key] !== criteria[key]) {
                isValid = false;
            }
        }
        return isValid;
    });
};

// 2. SORTING
// Sorts by a specific field in ascending or descending order
const sortData = (data, field) => {
    if (!field) return data;
    
    // Create a copy to avoid mutating original data
    return [...data].sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
    });
};

// 3. AGGREGATION
// Calculates Sum, Average, or Count
const aggregateData = (data, type, field) => {
    if (type === 'count') return { count: data.length };

    // Reduce is used here for Sum Calculation
    const sum = data.reduce((acc, curr) => {
        // Ensure we are adding numbers
        const val = parseFloat(curr[field]) || 0;
        return acc + val;
    }, 0);

    if (type === 'sum') return { sum };
    if (type === 'average') return { average: sum / data.length };
    
    return null;
};

module.exports = { filterData, sortData, aggregateData };