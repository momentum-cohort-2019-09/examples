def clean_text(text):
    """
    Given a text, return the text with no spaces or punctuation and all lowercased.
    """
    text = text.lower()
    all_letters = "abcdefghijklmnopqrstuvwxyz"
    text_to_keep = ""
    for char in text:
        if char in all_letters:
            text_to_keep += char
    return text_to_keep


text = input("Enter some text and I'll tell you if it's a palindrome: ")
text = clean_text(text)
reversed_text = text[::-1]

if (text == reversed_text):
    print("That's a palindrome!")
else:
    print("NOPE")
