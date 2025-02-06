#!/bin/bash
for file in Screenshot*at*.png; do
    if [[ -f "$file" ]]; then
        # Extract the time from the filename
        new_name=$(echo "$file" | sed -E 's/^Screenshot [0-9]{4}-[0-9]{2}-[0-9]{2} at ([0-9]+\.[0-9]+\.[0-9]+) (AM|PM)\.png/\1.png/')
        echo "$file"
        # Rename the file if extraction was successful
        if [[ "$new_name" != "$file" ]]; then
            mv "$file" "$new_name"
            echo "Renamed: $file -> $new_name"
        fi
    fi
done
