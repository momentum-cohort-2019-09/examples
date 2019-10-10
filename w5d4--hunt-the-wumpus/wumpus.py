from cave import Cave


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
        c1 = Cave("Dank Dungeon")
        c2 = Cave("Eerie Eyelet")
        c3 = Cave("Frightening Fissure")
        c4 = Cave("Ghastly Grotto")

        c1.add_connection(c2)
        c1.add_connection(c3)
        c2.add_connection(c3)
        c2.add_connection(c4)

        self.current_cave = c1

    def run(self):
        """Starts the game."""

        print("Welcome to HUNT THE WUMPUS!!!")
        while True:
            print(f"\nYou are currently in the {self.current_cave}.")
            print("There are exits to:")
            for idx, cave in enumerate(self.current_cave.connections, start=1):
                print(f"  ({idx}) {cave}")
            cave_num = input_int(
                "Where do you want to go? ",
                min_value=1,
                max_value=len(self.current_cave.connections))

            # We subtract one in order to make this match Python list indexing.
            cave_num -= 1
            self.current_cave = self.current_cave.connections[cave_num]


if __name__ == "__main__":
    game = Game()
    game.run()
