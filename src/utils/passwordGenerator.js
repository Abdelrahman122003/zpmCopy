const NAMES = {
  SPECIAL: "specialCharacters",
  LOWER: "lowerCaseLetters",
  UPPER: "upperCaseLetters",
  DIGITS: "digits",
};

class PasswordGenerator {
  characterSets = new Map([
    [NAMES.SPECIAL, "!@#$%^&*()_+[]{}|;:,.<>?"],
    [NAMES.UPPER, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    [NAMES.LOWER, "abcdefghijklmnopqrstuvwxyz"],
    [NAMES.DIGITS, "0123456789"],
  ]);

  choosedOptions = []; // Define it as a class property
  password = "";
  length = 0;
  constructor(length, options) {
    // Use this.choosedOptions instead of undefined local variable
    if (options.lowerCaseLetters === true)
      this.choosedOptions.push(NAMES.LOWER);
    if (options.upperCaseLetters === true)
      this.choosedOptions.push(NAMES.UPPER);
    if (options.specialCharacters === true)
      this.choosedOptions.push(NAMES.SPECIAL);
    if (options.digits === true) this.choosedOptions.push(NAMES.DIGITS);

    this.length = length;
  }
  #getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  generate = () => {
    for (let i = 0; i < this.length; i++) {
      const randomSet = this.#getRandomNumber(
        0,
        this.choosedOptions.length - 1
      );
      const randCharOrLetter = this.#getRandomNumber(
        0,
        this.characterSets.get(this.choosedOptions[randomSet]).length - 1
      );
      this.password += this.characterSets.get(this.choosedOptions[randomSet])[
        randCharOrLetter
      ];
    }
    return this.password;
  };
}

module.exports = PasswordGenerator;
