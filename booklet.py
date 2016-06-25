# -*- coding: utf-8 -*-

from wand.image import Image

with Image(filename='rules.pdf') as img:
   print(img.size)
    


