from math import sqrt
from PIL import Image
WIDTH = 500
HEIGHT = 250

im = Image.new('RGB', (WIDTH, HEIGHT))


def blend(start_color, end_color, percent):
    assert percent >= 0
    assert percent <= 1

    blended_color = []
    for idx in range(len(start_color)):
        blended_color.append(
            int(start_color[idx] * (1 - percent) + end_color[idx] * percent))
    return tuple(blended_color)


# color1 = (35, 56, 189)
# color2 = (245, 99, 170)

color1 = (0, 0, 0)
color2 = (255, 255, 255)

for x in range(WIDTH):
    for y in range(HEIGHT):
        # percent = min(1, sqrt((x / WIDTH)**2 + (y / HEIGHT)**2))
        percent = x / WIDTH
        im.putpixel((x, y), blend(color1, color2, percent))

im.save('out.png')
