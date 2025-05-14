import { letters } from '../../constants/const'

export function cezarEncrypt(text, shift) {
  let result = ''
  let i = 0

  while (i < text.length) {
    let matched = false

    // 1. Sh, Ch
    for (const letter of letters) {
      if (letter.isSpecial) {
        const originalSlice = text.slice(i, i + letter.upperCase.length)
        const isUpper = originalSlice === letter.upperCase
        const isLower = originalSlice === letter.lowerCase

        if (isUpper || isLower) {
          const index = parseInt(letter.number)
          const newIndex = (index + shift + letters.length) % letters.length;
          const newLetter = letters[newIndex]

          result += isUpper ? newLetter.upperCase : newLetter.lowerCase
          i += letter.upperCase.length
          matched = true
          break
        }
      }
    }

    if (matched) continue

    // 2. Ápiwayı bir háripli belgiler
    const currentChar = text[i]
    const isUpperCase = currentChar === currentChar.toUpperCase()

    const letterObj = letters.find(
      (l) =>
        !l.isSpecial &&
        (l.upperCase === currentChar || l.lowerCase === currentChar)
    )

    if (letterObj) {
      const index = parseInt(letterObj.number)
      const newIndex = (index + shift + letters.length) % letters.length;
      const newLetter = letters[newIndex]

      result += isUpperCase ? newLetter.upperCase : newLetter.lowerCase
    } else {
      // Álipbede joq belgiler
      result += currentChar
    }

    i += 1
  }

  return result
}
