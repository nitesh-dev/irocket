#!/bin/bash

# Specify the folder path
folder_path="/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop (copy)/racetrack-finishline"

# Check if the folder exists
if [ -d "$folder_path" ]; then
    # Change to the specified folder
    cd "$folder_path" || exit 1

    # Get a list of all files in the folder
    files=(*)

    # Iterate through the files and delete alternate ones
    for ((i=1; i<${#files[@]}; i+=2)); do
        file_to_delete="${files[$i]}"
        echo "Deleting: $file_to_delete"
        rm -f "$file_to_delete"
    done

    echo "Alternate files deleted successfully."
else
    echo "Error: Folder does not exist."
fi
