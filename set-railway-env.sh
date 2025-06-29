#!/bin/bash

# Railway environment variable setup
# Run this script to set the required environment variable for production

echo "Setting REACT_APP_API_URL environment variable on Railway..."
echo ""
echo "Please follow these steps in the Railway dashboard:"
echo ""
echo "1. Go to https://railway.app/dashboard"
echo "2. Select your project: amused-generosity"
echo "3. Click on the 'cape-chronicles' service"
echo "4. Go to the 'Variables' tab"
echo "5. Click 'New Variable'"
echo "6. Add the following variable:"
echo ""
echo "   Name: REACT_APP_API_URL"
echo "   Value: https://blog-app-production-5b04.up.railway.app/api"
echo ""
echo "7. Click 'Add' to save the variable"
echo "8. Railway will automatically trigger a new deployment"
echo ""
echo "This variable is required for the frontend to communicate with the backend API in production."