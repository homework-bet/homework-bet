#!/bin/bash

template=./template.app_settings.json
target=./app_settings.json

if [ ! -f $target ]; then
    echo "$target not found!"
    echo "copying $template to $target"
    cp $template $target
else
    echo "$target found"
fi

exit 0