#!/bin/bash

convert "$1" -font /mnt/TERA/1/Jeux/PrintAndPlay/Decktet/Font/fortune_letters.ttf -pointsize 42 -draw "text 120,120 \"$1\" rotate 180 text -630,-930 \"$1\"" with_text/"$1"
