#!/bin/bash

FILE1="/var/www/uploads/infra_variables.json"
FILE2="/var/www/uploads/infra_files.json"
ELOGPATH="/etc/ansible/handler/logs/error.log"
CLOGPATH="/etc/ansible/handler/logs/console.log"

while true; do

    if [ -f "$FILE1" ] && [ -f "$FILE2" ]; then
        echo "Building Infrastructure..."
        sudo python3 /etc/ansible/handler/handler.py > "$CLOGPATH" 2> "$ELOGPATH"
        echo "Cleaning /var/www/uploads"
        sudo rm -rf /var/www/uploads/*
    else
        echo "Json files not found"

    fi
    sleep 5

done
