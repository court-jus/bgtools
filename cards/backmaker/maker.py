import os
import random
import Image
import ImageColor

class BackMaker(object):
    def __init__(self, width, height, density):
        self.width = width
        self.height = height
        self.density = density
        self.small_images = []

    def load_images_from_dir(self, workdir, smallw, smallh):
        usable_images_pattern = lambda a: a.lower()[-4:] == '.png'

        for fname in os.listdir(workdir):
            if usable_images_pattern(fname):
                im = Image.open(os.path.join(workdir, fname))
                print im.format, im.size, im.mode
                self.small_images.append(im.resize((smallw, smallh)))

    def process(self, allow_rotation=False, iterations=1000,
        outfile='cardback.png', background_color=None):
        if background_color is not None:
            try:
                background_color= ImageColor.getrgb(background_color)
            except ValueError:
                background_color= (255,255,255)
        result = Image.new('RGBA', (self.width, self.height), background_color)
        result.save('/tmp/avant.png', 'PNG')
        for iteration in range(iterations):
            for si in self.small_images:
                nsi = si.copy()
                if allow_rotation:
                    nsi = nsi.rotate(random.randrange(360))
                result.paste(nsi, (random.randrange(self.width+2000)-1000, random.randrange(self.height+2000)-1000), nsi)
        result.save(outfile, 'PNG')
