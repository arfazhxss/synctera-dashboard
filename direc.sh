#!/bin/bash

# -----------------------------------------------------------------------------
# Script Name: direc.sh
# Description: This script recursively lists the directory structure up to 6 levels
# Author: Arfaz Hussain
# License: MIT License
# -----------------------------------------------------------------------------
# DISCLAIMER:
# This script is provided "as is", without warranty of any kind, express or 
# implied, including but not limited to the warranties of merchantability, 
# fitness for a particular purpose, and noninfringement. In no event shall the 
# author be liable for any claim, damages, or other liability, whether in an 
# action of contract, tort, or otherwise, arising from, out of, or in connection 
# with the script or the use or other dealings in the script.
# -----------------------------------------------------------------------------


# Function to list the directory structure recursively up to 6 levels
list_structure() {
  local dir="$1"
  local indent="$2"
  local depth="$3"
  
  if [ "$depth" -ge 6 ]; then
    return
  fi

  # List and sort the files in the current directory, excluding dotfiles and specified files
  find "$dir" -maxdepth 1 -type f ! -name '.*' ! -name 'Hussain Arfaz - Placement Application*' | sort | while IFS= read -r file; do
    echo "${indent}├── $(basename "$file")"
  done

  # List and sort the subdirectories in the current directory, excluding dotfiles and node_modules
  find "$dir" -maxdepth 1 -type d ! -path "$dir" ! -name '.*' ! -name 'node_modules' | sort | while IFS= read -r subdir; do
    echo "${indent}├── $(basename "$subdir")/"
    list_structure "$subdir" "${indent}│   " $((depth + 1))
  done
}

# Start listing from the current directory with no initial indentation and depth of 0
list_structure "." "" 0
