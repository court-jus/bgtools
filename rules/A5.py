#!/usr/bin/env python
# -*- coding: utf-8 -*-

import subprocess
import sys
import os
import tempfile
import shutil

DENSITY=300.0
PAGE_WIDTH=210.0
PAGE_HEIGHT=297.0/2.
INCH_TO_MM = 25.4
PAGE_PX_WIDTH=int(((PAGE_WIDTH * DENSITY) / INCH_TO_MM))
HALF_PAGE_PX_WIDTH=PAGE_PX_WIDTH / 2
PAGE_PX_HEIGHT = int(((PAGE_HEIGHT * DENSITY) / INCH_TO_MM))

def usage():
    print u"\n".join((
    u"""A5 - a tool to convert PDF to A5 booklets""",
    u"""(c) Ghislain "Court-Jus" Lévêque""",
    u"",
    u"""Usage: A5.py original_pdf.pdf""",
    u"""""",
    u"""original_pdf can be a list of files to concatenate""",
    u"""""",
    ))

def pdf2png(pdfiles, workdir):
    print "pdf2png"
    png_list = []
    for filename in pdfiles:
        basename = os.path.basename(filename)
        png_filename = os.path.join(workdir, basename) + u".png"
        print u"Converting %s in png into %s" % (basename,png_filename)
        returncode = subprocess.call([u"convert",u"-density",str(DENSITY),filename,png_filename])
        if returncode == 0:
            png_list.extend(sorted([
                os.path.join(workdir,f.decode('utf-8'))\
                    for f in os.listdir(workdir)\
                    if f.decode('utf-8').startswith(basename) and f.decode('utf-8').endswith(u'.png')
                ], key=lambda item: (int(item.split('-')[-1].split('.')[0]) if '-' in item else float('inf'))))
    return png_list

def compute_pnglist(png_list, empty_img):
    print "compute_pnglist"
    my_png_list = png_list[:]
    new_png_list = []
    while len(my_png_list) % 4 != 0:
        my_png_list.append(empty_img)

    while len(my_png_list) > 0:
        new_png_list.append(my_png_list.pop())
        new_png_list.append(my_png_list.pop(0))
        new_png_list.append(my_png_list.pop(0))
        new_png_list.append(my_png_list.pop())
    return new_png_list

def make_bookletspdfs(png_list, workdir):
    print "make_bookletspdfs", png_list
    pdf_list = []
    for first_png_idx in range(0, len(png_list), 4):
        montage_cmd = [u"montage",u"-density",str(DENSITY),"-geometry",u"%sx%s+0+0" % (HALF_PAGE_PX_WIDTH, PAGE_PX_HEIGHT),u"-tile",u"2x1"]
        montage_cmd.extend(png_list[first_png_idx:first_png_idx+4])
        pdf_name = u"pdf_from_%4.4d.pdf" % (first_png_idx,)
        this_pdf = os.path.join(workdir, pdf_name)
        montage_cmd.append(this_pdf)
        print montage_cmd
        returncode = subprocess.call(montage_cmd)
        if returncode == 0:
            pdf_list.append(pdf_name)
    return pdf_list

def main():
    original_pdf_list = [arg.decode('utf-8') for arg in sys.argv[1:]]
    if len(original_pdf_list) == 0:
        usage()
        sys.exit(1)
    workdir = tempfile.mkdtemp()
    print u"Working with %s in %s" % (original_pdf_list, workdir,)
    png_list = pdf2png(original_pdf_list, workdir)

    empty_img = os.path.join(os.path.expanduser('~'), "share", "emptyA5.png")
    png_list = compute_pnglist(png_list, empty_img)
    pdf_list = make_bookletspdfs(png_list, workdir)

    print pdf_list

if __name__ == u"__main__":
    main()
