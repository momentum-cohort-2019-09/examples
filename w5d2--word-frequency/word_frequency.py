import string

STOP_WORDS = [
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
    'i', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'were',
    'will', 'with'
]


def remove_stop_words(words):
    """Given a list of words, remove all words found in STOP_WORDS."""
    filtered_words = []
    for word in words:
        if word not in STOP_WORDS:
            filtered_words.append(word)

    return filtered_words


def clean_word(word):
    """Given one word:

        - clean the word (remove punctuation from the beginning and end of the string)
        - normalize it (lowercase, remove possessives)
    
    and return the string."""

    word = word.strip(string.punctuation)
    word = word.lower()
    if word[-2:] == "'s":
        word = word[:-2]

    return word


def clean_words(words):
    """Takes a list of words and cleans each one, returning a new list."""
    cleaned_words = []
    for word in words:
        cleaned_words.append(clean_word(word))
    return cleaned_words


def calculate_word_freqs(words):
    """
    Given a list of words, return a dictionary of words to the number of
    times each word is found in the list.
    """
    freqs = {}
    for word in words:
        # if word in freqs:
        #     freqs[word] += 1
        # else:
        #     freqs[word] = 1
        freqs[word] = freqs.get(word, 0) + 1

    return freqs


def get_longest_word(words):
    """Given a list of words, return the longest."""
    return sorted(words, key=len, reverse=True)[0]


def print_word_freq(filename):
    """Read in `filename` and print out the frequency of words in that file."""
    # read in the file
    with open(filename) as file:
        text = file.read()

    # split the file in words
    words = text.split()

    # clean each word
    words = clean_words(words)

    # remove stop words
    words = remove_stop_words(words)

    # calculate the frequency of each word -- needs a dictionary
    freqs = calculate_word_freqs(words)

    # Print out the frequencies for the top 10 most frequent words
    sorted_freqs = sorted(freqs.items(), key=lambda pair: pair[1], reverse=True)
    longest_word_len = len(get_longest_word(words))
    for word, freq in sorted_freqs[:10]:
        print(word.rjust(longest_word_len), "|", str(freq).ljust(3), "*" * freq)


if __name__ == "__main__":
    import argparse
    from pathlib import Path

    parser = argparse.ArgumentParser(
        description='Get the word frequency in a text file.')
    parser.add_argument('file', help='file to read')
    args = parser.parse_args()

    file = Path(args.file)
    if file.is_file():
        print_word_freq(file)
    else:
        print(f"{file} does not exist!")
        exit(1)
