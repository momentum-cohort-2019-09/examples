word = "APPLE"
board = ['_'] * len(word)

# def handle_guess(word, board, guess):
#     start = 0
#     while word.find(guess, start) != -1:
#         index = word.find(guess, start)
#         start = index + 1
#         board[index] = guess
#     return board

# handle_guess(word, board, "P")
# print(board)

# handle_guess(word, board, "L")
# print(board)

# handle_guess(word, board, "X")
# print(board)


def make_board(word, guesses):
    board = []
    for letter in word:
        if letter in guesses:
            board.append(letter)
        else:
            board.append("_")
    return board


board = make_board(word, ["P"])
print(board)
print(" ".join(board))

board = make_board(word, ["P", "L"])
print(board)

board = make_board(word, ["P", "L", "X"])
print(board)
