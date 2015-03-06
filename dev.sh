#!/bin/sh

echo "Running hotreload webpack server..."
## run frontend stuff compilation with watching
npm start &

sleep 5
echo
echo "Ok. Frontend sources are watched now."
echo

echo "Running the backend stuff"
echo

## run server
sbt run
