#!/bin/sh

read -p "Have you read README.md?" -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]
then

  echo "Clean up stale class-files..."
  sbt clean compile

  echo "Installing global npm modules..."
  npm install -g bower webpack

  echo "Installing local npm modules..."
  npm install

  echo "Installing bower modules..."
  echo
  cd ./public
  bower install
  cd ..

  echo "Done!"
  echo
  echo "Now you can run ./dev.sh to run the project in dev mode!"

else

echo "You definitely should read README.md!"
fi
