class GuessingGame {
  constructor (numberToGuess) {
    this.numberToGuess = numberToGuess
    this.guesses = []
  }

  guess (guessedNumber) {
    this.guesses.push(guessedNumber)

    if (this.numberToGuess > guessedNumber) {
      console.log('Too low')
      return -1
    } else if (this.numberToGuess < guessedNumber) {
      console.log('Too high')
      return 1
    } else {
      console.log('You got it right! It took you ' + this.guesses.length + ' guesses.')
      return 0
    }
  }
}
