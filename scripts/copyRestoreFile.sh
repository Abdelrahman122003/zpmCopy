#!/bin/bash
    
# Directory name
DIRECTORY_DATA="/home/boda/ProjectsAndNotes/BackendProjects/zpm/data"
# -------------------------------------- steps to create backup file --------------------
# Get the file path (for Backup)
RESTORE_FILE="$1"

# get path file that is take copy from it

cp "$RESTORE_FILE" "$DIRECTORY_DATA"
