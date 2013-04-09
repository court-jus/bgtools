import os
import random
import Image
import ImageColor
import gettext

APPDIR = os.path.dirname(__file__)
I18NDIR = os.path.join(APPDIR, 'locale')

t = gettext.translation('backmaker', I18NDIR)#, fallback=True)
_ = t.ugettext

class BackMaker(object):
    def __init__(self, width, height, density):
        self.width = width
        self.height = height
        self.density = density
        self.small_images = []

    def load_images_from_dir(self, workdir, smallw, smallh, keepaspect=True):
        usable_images_pattern = lambda a: a.lower()[-4:] == '.png'
        print _("Loading small images")
        for fname in os.listdir(workdir):
            if usable_images_pattern(fname):
                im = Image.open(os.path.join(workdir, fname))
                neww = smallw
                newh = smallh
                if keepaspect:
                    ratio = float(im.size[0]) / float(im.size[1])
                    neww = smallw
                    newh = smallw / ratio
                    if newh > smallh:
                        neww = smallh * ratio
                        newh = smallh
                    neww, newh = int(neww), int(newh)
                print im.format, im.size, (neww, newh), im.mode
                self.small_images.append(im.resize((neww, newh)))

    def process(self, allow_rotation=False, iterations=1000,
        outfile='cardback.png', background_color=None):
        if background_color is not None:
            try:
                background_color= ImageColor.getrgb(background_color)
            except ValueError:
                background_color= (255,255,255)
        print _("Preparing the resulting image")
        result = Image.new('RGBA', (self.width, self.height), background_color)
        print _("Pasting small images")
        for iteration in range(iterations):
            for si in self.small_images:
                nsi = si.copy()
                if allow_rotation:
                    nsi = nsi.rotate(random.randrange(360), expand=True)
                result.paste(nsi, (random.randrange(self.width+2000)-1000, random.randrange(self.height+2000)-1000), nsi)
        print _("Saving the resulting image into %s" % (outfile,))
        result.save(outfile, 'PNG')

def average_color(image):
    r,g,b = 0,0,0
    w,h = image.size
    img_data = image.load()
    img_data = [[img_data[y, x] for y in xrange(w)] for x in xrange(h)]
    for x in range(w):
        for y in range(h):
            temp = img_data[y][x]
            r += temp[0]
            g += temp[1]
            b += temp[2]
    return r/(w*h), g/(w*h), b/(w*h)
