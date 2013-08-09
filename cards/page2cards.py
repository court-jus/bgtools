#!/usr/bin/env python
# -*- coding: utf-8 -*-

import subprocess
import sys
import os

DENSITY = 300.0
"""
To manage inner borders, play around this :

convert -density 300 -chop 107x39+903+1220 -chop 107x0+1595+1220 -chop 107x0+2284+1220 -trim file.png file.png

"""

def crop2cards(filename, width, height, leftmargin, topmargin,
               cardwidth, cardheight):
    cmd = [u"convert", u"-density", unicode(DENSITY),
           filename, u"-repage",
           u"%sx%s-%s-%s" % (width, height, leftmargin, topmargin),
           u"-crop", u"%sx%s" % (cardwidth, cardheight),
           u"%s_cards.png" % (filename,)]
    returncode = subprocess.call(cmd)
    return returncode

def main():
    if len(sys.argv[1:]) != 7:
        print u"Usage: page2cards.py filename width height leftmargin topmargin cardwidth cardheight"
    else:
        sys.exit(crop2cards(*sys.argv[1:]))

if __name__ == u"__main__":
    main()
