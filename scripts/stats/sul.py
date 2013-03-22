#!/usr/bin/env python

import random

def roll(size):
    return random.choice(range(size)) + 1

def rolls(size, count):
    t = 0
    for c in range(count):
        t += roll(size)
    return t

def main():
    nb_rolls = 100000
    for x in range(2,5):
        print x, len([1 for i in range(nb_rolls) if rolls(6,x) >= rolls(6, x+1)])

if __name__ == "__main__":
    main()
