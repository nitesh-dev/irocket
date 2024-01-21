#!/bin/bash


# convert png | jpg to webp
# find . -type f -name "*.png" -exec sh -c '
#     for file do
#         cwebp "$file" -o "${file%.png}.webp"
#     done
# ' sh {} +

# remove all png and jpg recursive
# find /path/to/your/folder -type f \( -name "*.png" -o -name "*.jpg" \) -exec rm -f {} +



# Specify the folder path
folder_paths=(
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/finish-background"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-a-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-b-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-c-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-d-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-e-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-f-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-g-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-h-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-i-finish"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/finish/rocket-j-finish"

    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/intro"

    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/placement-background"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-a-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-b-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-c-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-d-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-e-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-f-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-g-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-h-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-i-placement"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/placement/rocket-j-placement"

    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/racetrack"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/racetrack-finishline"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-a"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-b"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-c"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-d"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-e"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-f"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-g"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-h"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-i"
    "/home/nitesh/Downloads/iRocket-Racing-Graphics-2023-12-04/race-loop/rocket-j"

    # Add more folder paths as needed
)



# Iterate over the array of folder paths
for folder_path in "${folder_paths[@]}"; do
    # Check if the folder exists
    if [ -d "$folder_path" ]; then
        # Change to the specified folder
        cd "$folder_path" || exit 1

        # Resize PNG and JPG images to 50%
        mogrify -resize 50% *

        echo "Images resized successfully in: $folder_path"
    else
        echo "Error: Folder does not exist: $folder_path"
    fi
done
