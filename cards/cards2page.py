#!/usr/bin/env python
# -*- coding: utf-8 -*-

import subprocess
import sys
import os

DENSITY = 300.0

def crop2cards(filename, width, height, leftmargin, topmargin,
               cardwidth, cardheight):
    cmd = [u"convert", u"-density", unicode(DENSITY),
           filename, u"-repage",
           u"%sx%s-%s-%s" % (width, height, leftmargin, topmargin),
           u"-crop", u"%sx%s" % (cardwidth, cardheight),
           u"%s_cards.png" % (filename,)]
    returncode = subprocess.call(cmd)
    return returncode

def cards2page(leftmargin, topmargin, cardwidth, cardheight,
               innerhm, innervm, nbw, nbh, *file_list):
    if not isinstance(file_list, list):
        file_list=[file_list,]
    cmd = [u"montage",
           u"-tile", u"%sx%s" % (nbw, nbh),
           u"-geometry", u"%sx%s+%s+%s" % (cardwidth, cardheight, innerhm, innervm),]
    cmd.extend(*file_list)
    cmd.append('page.png')
    print cmd
    returncode = subprocess.call(cmd)
    if returncode != 0:
      return returncode
    cmd = [u'mogrify',
           u'-border', '%sx%s' % (leftmargin, topmargin),
           u'-bordercolor', u'white',
           u'page*.png']
    returncode = subprocess.call(cmd)
    return returncode

def main():
    if len(sys.argv[1:]) < 11:
        print u"Usage: cards2page.py leftmargin topmargin cardwidth cardheight innerhm innervm nbw nbh files"
    else:
        sys.exit(cards2page(*sys.argv[1:]))

if __name__ == u"__main__":
    main()
