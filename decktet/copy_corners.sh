#!/bin/bash

convert "$1" \( +clone -crop 110x515+10+10 -write mpr:suits +delete \) \( +clone -crop 70x390+50+525 -write mpr:text +delete \) -draw @test.mvg final/"$1"

