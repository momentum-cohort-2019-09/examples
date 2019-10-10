class Cave:
    """
    This class is for managing the state of individual cave rooms.
    It should contain connections to other cave rooms.
    """

    def __init__(self, name):
        self.name = name
        self.connections = []

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
