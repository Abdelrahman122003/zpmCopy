#!/bin/bash

# Directory name
dirName="/home/boda/ProjectsAndNotes/BackendProjects/zpm/data"
# Create directory if it doesn't exist
if [ ! -d "$dirName" ]; then
  mkdir "$dirName"
  # echo "Directory '$dirName' created."
fi

# Array of file names
files=("session.json" "user.json" "encrypted.json" "decrypted.json")

# Create the files if they don't exist
for file in "${files[@]}"; do
  filePath="$dirName/$file"
  if [ ! -f "$filePath" ]; then
    touch "$filePath"
  fi
done
