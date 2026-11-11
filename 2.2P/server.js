// Import required core and third-party modules
const express = require('express'); // Express web application framework
const path = require('path');       // Core module for handling file and directory paths

// Initialise the Express application instance
const app = express();

// Define server port using environment variable with fallback to port 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies (essential for POST requests)
app.use(express.json());

// Serve static web assets from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// Calculator Mathematical Functions
// ==========================================

// Dedicated function to perform addition of two numbers
const addNumbers = (firstNumber, secondNumber) => {
    return firstNumber + secondNumber; // Return the calculated sum
};

// Dedicated function to perform subtraction
const subtractNumbers = (firstNumber, secondNumber) => {
    return firstNumber - secondNumber; // Return the calculated difference
};

// Dedicated function to perform multiplication
const multiplyNumbers = (firstNumber, secondNumber) => {
    return firstNumber * secondNumber; // Return the calculated product
};

// Dedicated function to perform division with zero validation
const divideNumbers = (firstNumber, secondNumber) => {
    if (secondNumber === 0) {
        throw new Error('Division by zero is not permissible.'); // Throw error for zero divisor
    }
    return firstNumber / secondNumber; // Return the calculated quotient
};

// ==========================================
// REST API Endpoints (GET and POST)
// ==========================================

// GET endpoint to add two numbers utilising query parameters
// Example usage: http://localhost:3000/add?a=10&b=20
app.get('/add', (req, res) => {
    // Extract query parameters 'a' and 'b' from the incoming request URL
    const queryA = req.query.a;
    const queryB = req.query.b;

    // Validate that both parameters have been supplied by the client
    if (queryA === undefined || queryB === undefined) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Missing parameters. Please provide both query parameters: "a" and "b" (e.g. /add?a=5&b=10).'
        });
    }

    // Parse the query parameter strings into numeric floating-point values
    const numA = parseFloat(queryA);
    const numB = parseFloat(queryB);

    // Validate that both parsed values are valid numbers
    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Invalid input. Both parameters "a" and "b" must be valid numeric values.'
        });
    }

    // Call the dedicated addition function to calculate the result
    const result = addNumbers(numA, numB);

    // Return the response object to the client with an HTTP 200 status code
    return res.status(200).json({
        statusCode: 200,
        operation: 'addition',
        a: numA,
        b: numB,
        result: result,
        message: 'Addition calculation completed successfully.'
    });
});

// GET endpoint to subtract two numbers utilising query parameters
// Example usage: http://localhost:3000/subtract?a=20&b=5
app.get('/subtract', (req, res) => {
    // Read query parameters from URL
    const queryA = req.query.a;
    const queryB = req.query.b;

    // Check for parameter presence
    if (queryA === undefined || queryB === undefined) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Missing parameters. Please provide both query parameters: "a" and "b".'
        });
    }

    // Convert values to floating-point numbers
    const numA = parseFloat(queryA);
    const numB = parseFloat(queryB);

    // Verify numeric validity
    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Invalid input. Both parameters must be valid numeric values.'
        });
    }

    // Perform subtraction
    const result = subtractNumbers(numA, numB);

    // Send successful JSON response
    return res.status(200).json({
        statusCode: 200,
        operation: 'subtraction',
        a: numA,
        b: numB,
        result: result,
        message: 'Subtraction calculation completed successfully.'
    });
});

// GET endpoint to multiply two numbers utilising query parameters
// Example usage: http://localhost:3000/multiply?a=6&b=7
app.get('/multiply', (req, res) => {
    // Read query parameters from URL
    const queryA = req.query.a;
    const queryB = req.query.b;

    // Check for parameter presence
    if (queryA === undefined || queryB === undefined) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Missing parameters. Please provide both query parameters: "a" and "b".'
        });
    }

    // Convert values to floating-point numbers
    const numA = parseFloat(queryA);
    const numB = parseFloat(queryB);

    // Verify numeric validity
    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Invalid input. Both parameters must be valid numeric values.'
        });
    }

    // Perform multiplication
    const result = multiplyNumbers(numA, numB);

    // Send successful JSON response
    return res.status(200).json({
        statusCode: 200,
        operation: 'multiplication',
        a: numA,
        b: numB,
        result: result,
        message: 'Multiplication calculation completed successfully.'
    });
});

// GET endpoint to divide two numbers utilising query parameters
// Example usage: http://localhost:3000/divide?a=20&b=4
app.get('/divide', (req, res) => {
    // Read query parameters from URL
    const queryA = req.query.a;
    const queryB = req.query.b;

    // Check for parameter presence
    if (queryA === undefined || queryB === undefined) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Missing parameters. Please provide both query parameters: "a" and "b".'
        });
    }

    // Convert values to floating-point numbers
    const numA = parseFloat(queryA);
    const numB = parseFloat(queryB);

    // Verify numeric validity
    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Invalid input. Both parameters must be valid numeric values.'
        });
    }

    // Attempt division and handle zero-division error gracefully
    try {
        const result = divideNumbers(numA, numB);
        return res.status(200).json({
            statusCode: 200,
            operation: 'division',
            a: numA,
            b: numB,
            result: result,
            message: 'Division calculation completed successfully.'
        });
    } catch (calculationError) {
        // Return 400 Bad Request when dividing by zero
        return res.status(400).json({
            statusCode: 400,
            error: calculationError.message
        });
    }
});

// POST endpoint demonstrating REST API implementation with request body payload
// Example body payload: { "a": 12, "b": 4, "operation": "add" }
app.post('/calculate', (req, res) => {
    // Extract properties from the incoming JSON request body
    const { a, b, operation } = req.body;

    // Verify presence of all required attributes
    if (a === undefined || b === undefined || !operation) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Missing required fields in request body. Please provide "a", "b", and "operation".'
        });
    }

    // Convert inputs to numbers
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    // Verify numeric validity
    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Invalid input. Fields "a" and "b" must be numeric values.'
        });
    }

    let result;
    // Determine the requested mathematical operation utilising a switch statement
    switch (operation.toLowerCase()) {
        case 'add':
            result = addNumbers(numA, numB);
            break;
        case 'subtract':
            result = subtractNumbers(numA, numB);
            break;
        case 'multiply':
            result = multiplyNumbers(numA, numB);
            break;
        case 'divide':
            if (numB === 0) {
                return res.status(400).json({
                    statusCode: 400,
                    error: 'Division by zero is not permissible.'
                });
            }
            result = divideNumbers(numA, numB);
            break;
        default:
            return res.status(400).json({
                statusCode: 400,
                error: `Unrecognised operation: '${operation}'. Permitted operations are add, subtract, multiply, and divide.`
            });
    }

    // Return the successful calculation response
    return res.status(200).json({
        statusCode: 200,
        operation: operation.toLowerCase(),
        a: numA,
        b: numB,
        result: result,
        message: 'Calculation processed successfully via POST request.'
    });
});

// ==========================================
// Existing Quotes Endpoints (Preserved)
// ==========================================

// In-memory array to store inspirational quotes
let quotes = [
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not wait to strike till the iron is hot; but make it hot by striking."
];

// GET endpoint to retrieve a random quote
app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});

// POST endpoint to add a new quote
app.post('/api/quote', (req, res) => {
    const { quote } = req.body;
    quotes.push(quote);
    res.status(201).json({ message: "Quote added successfully." });
});

// ==========================================
// Server Initialisation
// ==========================================

// Start listening for incoming network connections on the configured port
app.listen(PORT, () => {
    console.log(`Server is running and listening on http://localhost:${PORT}`);
});