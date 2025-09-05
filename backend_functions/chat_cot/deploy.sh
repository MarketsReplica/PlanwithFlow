#!/bin/bash

# Load environment variables from .env file
if [ -f ../../.env ]; then
  export $(cat ../../.env | xargs)
fi

# Set your GCP project ID
# Set your GCP project ID
PROJECT_ID=${PROJECT_ID:-your-gcp-project}

# Set your function name
FUNCTION_NAME="chatcotapi"

# Set the region where you want to deploy the function
REGION="us-central1"

# Set the runtime
RUNTIME="python310"

# Set the entry point (the name of your function in the Python file)
ENTRY_POINT="chatcotapi"

# Set the memory allocated for the function (in MB)
MEMORY="256MB"

# Set the maximum number of instances
MAX_INSTANCES=20

# Deploy the function
gcloud functions deploy $FUNCTION_NAME \
  --project=$PROJECT_ID \
  --region=$REGION \
  --runtime=$RUNTIME \
  --entry-point=$ENTRY_POINT \
  --trigger-http \
  --allow-unauthenticated \
  --memory=$MEMORY \
  --max-instances=$MAX_INSTANCES \
  --set-env-vars OPENAI_API_KEY=$OPENAI_API_KEY

echo "Deployment completed!"
