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

    def get_adjacent_caves(self):
        return self.current_cave.connections

    def create_caves(self):
        """
        Create all the caves for the game.
        """
        random.shuffle(CAVE_NAMES)
        caves = [Cave(name) for name in CAVE_NAMES]
        for connections in CAVE_CONNECTIONS:
            start = connections[0]
            for destination in connections[1:]:
                caves[start].add_connection(caves[destination])

        self.caves = caves
        self.current_cave = caves[0]

    def create_hazards(self):
        """
        Create pits, bats, and the wumpus.
        """
        num_of_pit_caves = 2
        for _ in range(num_of_pit_caves):
            pit_cave = random.choice(self.caves[1:])
            pit_cave.pit = True

        num_of_bats = 2
        for _ in range(num_of_bats):
            bat_cave = random.choice(
                [cave for cave in self.caves[1:] if not cave.pit])
            bat_cave.bat = True

        wumpus_cave = random.choice(
            [cave for cave in self.caves[1:] if not cave.pit and not cave.bat])
        wumpus_cave.wumpus = True

    def print_hazards(self):
        num_of_pits = sum([1 for cave in self.get_adjacent_caves() if cave.pit])
        if num_of_pits == 1:
            print("You feel a stiff breeze.")
        elif num_of_pits > 1:
            print("You feel a seriously stiff breeze!")

        if any([cave.bat for cave in self.get_adjacent_caves()]):
            print("You hear the screech of bats.")

        if any([cave.wumpus for cave in self.get_adjacent_caves()]):
            print("You smell a wumpus.")

    def print_current_cave(self):
        print(f"\nYou are currently in the {self.current_cave}.")
        self.print_hazards()
        print("There are exits to:")
        for idx, cave in enumerate(self.get_adjacent_caves(), start=1):
            print(f"  ({idx}) {cave}")

    def move_to(self, cave_num):
        # We subtract one in order to make this match Python list indexing.
        cave_num -= 1
        self.current_cave = self.get_adjacent_caves()[cave_num]

    def check_for_hazards(self):
        if self.current_cave.pit:
            print("You fall into a pit and die ALONE")
            self.dead = True
        elif self.current_cave.wumpus:
            print("The wumpus emerges from the dark and eats your face.")
            self.dead = True
        elif self.current_cave.bat:
            print("A giant bat grabs you and takes you to a new cave.")
            destinations = [
                cave for cave in self.caves
                if cave != self.current_cave and cave.is_safe()
            ]
            self.current_cave = random.choice(destinations)

    def run(self):
        """Starts the game."""

        print("Welcome to HUNT THE WUMPUS!!!")
        while not self.dead:
            self.print_current_cave()
            cave_num = input_int("Where do you want to go? ",
                                 min_value=1,
                                 max_value=len(self.get_adjacent_caves()))

            self.move_to(cave_num)
            self.check_for_hazards()


if __name__ == "__main__":
    game = Game()
    game.run()
