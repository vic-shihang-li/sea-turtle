#!/bin/sh

USAGE="usage: ./test-affected.sh [nx-project-name] <base-commit> <head-commit>"

if [ "$#" -eq 0 ]; then
    echo $USAGE
elif [ "$#" -eq 1 ]; then
	node ./scripts/nx-affected.js $1 | grep 'true'
elif [ "$#" -eq 2 ]; then
	node ./scripts/nx-affected.js $1 $2 | grep 'true'
elif [ "$#" -eq 3 ]; then
	node ./scripts/nx-affected.js $1 $2 $3 | grep 'true'
else
	echo $USAGE
fi
