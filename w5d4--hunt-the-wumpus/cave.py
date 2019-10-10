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
    "Airy Alcove", "Bat-Filled Basement", "Charred Chasm", "Dank Dungeon",
    "Eerie Eyelet", "Frightening Fissure", "Ghastly Grotto", "Heated Hellhole",
    "Incendiary Interior", "Janky Jail", "Killer Karst", "Lame Lounge",
    "Meandering Mists", "Putrid Passage", "Sulfurous Sinkhole", "Terrible Tube",
    "Undulating Underground", "Vertical Vastness", "Nasty Nest",
    "Offal-Filled Opening"
]

CAVE_CONNECTIONS = [[0, 1, 4, 5], [1, 7, 2], [2, 9, 3], [3, 11, 4], [4, 13],
                    [5, 6, 14], [6, 7, 16], [7, 8], [8, 9, 17], [9, 10],
                    [10, 11, 18], [11, 12], [12, 13, 19], [13, 14], [15, 16],
                    [16, 17], [18, 19]]
