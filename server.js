const express = require('express');
const cors = require('cors'); // 1. Import the package you just installed
const app = express();

app.use(cors()); // 2. Enable it right here before your routes!

// Your forgot-password route goes below...