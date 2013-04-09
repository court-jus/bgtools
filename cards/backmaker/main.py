#!/usr/bin/env python

import argparse
import gettext
import os

from maker import BackMaker

APPDIR = os.path.dirname(__file__)
I18NDIR = os.path.join(APPDIR, 'locale')

t = gettext.translation('backmaker', I18NDIR)#, fallback=True)
_ = t.ugettext

def main():
    parser = argparse.ArgumentParser(description=_(u"Cardback maker tool"))
    parser.add_argument('-d', '--density', type=int, dest='density',
        default=300, help=_(u"Density (DPI)"))
    parser.add_argument('-W', '--width', type=int, dest='width',
        default=2480, help=_(u"Generated image width (px)"))
    parser.add_argument('-H', '--height', type=int, dest='height',
        default=3508, help=_(u"Generated image height (px)"))
    parser.add_argument('--smallwidth', type=int, dest='smallwidth',
        default=100, help=_(u"Width of the small images (px)"))
    parser.add_argument('--smallheight', type=int, dest='smallheight',
        default=100, help=_(u"Height of the small images (px)"))
    parser.add_argument('--rotate', action='store_true', dest='rotate',
        default=False, help=_(u"Allow rotation of the small images (px)"))
    parser.add_argument('-D', '--directory', dest='imgdir',
        default=os.curdir, help=_(u"Small images directory (defaults to current directory)"))
    parser.add_argument('-o', '--output', dest='outfile',
        default='cardback.png', help=_(u"Output file"))
    parser.add_argument('--iterations', type=int, dest='iterations',
        default=1000, help=_(u"Number of copies of each small image (px)"))

    args = parser.parse_args()
    bm = BackMaker(args.width, args.height, args.density)
    bm.load_images_from_dir(args.imgdir, args.smallwidth, args.smallheight)
    bm.process(allow_rotation=args.rotate, iterations=args.iterations)

if __name__ == "__main__":
    main()