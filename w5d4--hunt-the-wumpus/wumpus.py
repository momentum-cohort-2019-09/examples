from cave import Cave, CAVE_NAMES, CAVE_CONNECTIONS
import random


def input_int(prompt='', min_value=None, max_value=None):
    """
    Given a prompt, optional min value, and optional max value,
    ask the user for input and validate that it is an integer
    and between the min and max. Converts input to integer
    before returning.
    """
    while True:
        try:
            value = int(input(prompt))
            if (min_value and value < min_value) or (max_value and
                                                     value > max_value):
                print("That was not a valid choice.")
            else:
                return value
        except ValueError:
            print("That was not a valid choice.")


class Game:
    """
    Keeps track of the game state and handles user interaction.
    """

    def __init__(self):
        self.dead = False
        self.create_caves()
        self.create_hazards()

    def create_caves(self):
        """
        Create all the caves for the game.
        """
        caves = [Cave(name) for name in CAVE_NAMES]
        for connections in CAVE_CONNECTIONS:
            start = connections[0]
            for destination in connections[1:]:
                caves[start].add_connection(caves[destination])

        self.caves = caves
        self.current_cave = random.choice(caves)

    def create_hazards(self):
        """
        Create pits, bats, and the wumpus.
        """
        num_of_pit_caves = 2
        while num_of_pit_caves > 0:
            pit_cave = random.choice(self.caves)
            if pit_cave != self.current_cave:
                pit_cave.pit = True
                num_of_pit_caves -= 1

    def print_hazards(self):
        num_of_pits = sum(
            [1 for cave in self.current_cave.connections if cave.pit])
        if num_of_pits == 1:
            print("You feel a stiff breeze.")
        elif num_of_pits > 1:
            print("You feel a seriously stiff breeze!")

    def print_current_cave(self):
        print(f"\nYou are currently in the {self.current_cave}.")
        self.print_hazards()
        print("There are exits to:")
        for idx, cave in enumerate(self.current_cave.connections, start=1):
            print(f"  ({idx}) {cave}")

    def move_to(self, cave_num):
        # We subtract one in order to make this match Python list indexing.
        cave_num -= 1
        self.current_cave = self.current_cave.connections[cave_num]

    def run(self):
        """Starts the game."""

        print("Welcome to HUNT THE WUMPUS!!!")
        while not self.dead:
            self.print_current_cave()
            cave_num = input_int(
                "Where do you want to go? ",
                min_value=1,
                max_value=len(self.current_cave.connections))

            self.move_to(cave_num)

            if self.current_cave.pit:
                print("You fall into a pit and die ALONE")
                self.dead = True


if __name__ == "__main__":
    game = Game()
    game.run()
