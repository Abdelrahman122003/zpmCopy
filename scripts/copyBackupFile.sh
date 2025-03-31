#!/bin/bash
    
# get path file that is take copy from it
COPIED_FILE_PATH="/home/boda/ProjectsAndNotes/BackendProjects/zpm/data/encrypted.json"
# -------------------------------------- steps to create backup file --------------------
# Get the file path (for Backup)
FILE_PATH="$1"


# Define the backup file path
BACKUP_FILE="${FILE_PATH}/encrypted.json"

cp "$COPIED_FILE_PATH" "$BACKUP_FILE"
