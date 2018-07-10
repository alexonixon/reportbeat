#!/bin/sh
echo "starting..."
#while true; do
#  sleep 0.1 # wait for 1/10 of the second before check again
#done
if [ ! /database/rules.json ]; then
  echo "file not found"
  touch /database/rules.json
fi
node /app/index.js