class Cave:
    """
    This class is for managing the state of individual cave rooms.
    It should contain connections to other cave rooms.
    """

    def __init__(self, name):
        self.name = name
        self.connections = []
        self.pit = False
        self.bat = False
        self.wumpus = False

    def add_connection(self, cave):
        """
        Connect this cave to another.
        The reverse connection is automatically created.
        """

        if cave not in self.connections:
            self.connections.append(cave)
        if self not in cave.connections:
            cave.connections.append(self)

    def __str__(self):
        return self.name


CAVE_NAMES = [
    "Airy Alcove", "Bat-filled Basement", "Charred Chasm", "Dank Dungeon",
    "Eerie Eyelet", "Frightening Fissure", "Ghastly Grotto", "Heated Hellhole",
    "Incendiary Interior", "Janky Jail", "Killer Kastle", "Lame Lounge"
]

CAVE_CONNECTIONS = [[0, 1, 9], [1, 7], [2, 11, 4], [3, 10, 5], [4, 9, 6],
                    [5, 8, 11], [6, 7], [8, 1]]
