import React, { useState } from 'react'
import { letters } from '../../constants/const'

const Vijiner = () => {
  const [key, setKey] = useState('')
  const [text, setText] = useState('')
  const [str, setStr] = useState('')

  const parseText = (input) => {
    const specials = ['sh', 'ch']
    const result = []
    let i = 0

    while (i < input.length) {
      const twoChar = input.slice(i, i + 2)
      if (specials.includes(twoChar.toLowerCase())) {
        result.push(twoChar)
        i += 2
      } else {
        result.push(input[i])
        i += 1
      }
    }
    return result
  }

  const getLetterIndex = (char) => {
    const match = letters.findIndex(
      (l) =>
        l.lowerCase === char.toLowerCase() || l.upperCase === char.toUpperCase()
    )
    return match
  }

  const getLetterByIndex = (index, isUpperCase) => {
    const letter = letters[index]
    return isUpperCase ? letter.upperCase : letter.lowerCase
  }

  const repeatKey = (keyArr, length) => {
    const repeated = []
    let i = 0
    while (repeated.length < length) {
      repeated.push(keyArr[i % keyArr.length])
      i++
    }
    return repeated
  }

  const correctCase = (char, isUpperCase) => {
    if (char === 'ı' && isUpperCase) return 'I'
    if (char === 'I' && !isUpperCase) return 'ı'
    return isUpperCase ? char.toUpperCase() : char.toLowerCase()
  }

  const vigenereEncrypt = (text, key) => {
    const parsedText = parseText(text)
    console.log(parsedText)
    const parsedKey = repeatKey(parseText(key), parsedText.length)
    console.log(parsedKey)
    const totalLetters = letters.length

    const encrypted = parsedText.map((char, i) => {
      const isUpper = char === char.toUpperCase()
      const textIndex = getLetterIndex(char)
      const keyIndex = getLetterIndex(parsedKey[i])

      if (textIndex === -1 || keyIndex === -1) return char

      const encryptedIndex = (textIndex + keyIndex) % totalLetters
      return correctCase(getLetterByIndex(encryptedIndex, isUpper), isUpper)
    })
    setStr(encrypted.join(''))
    return encrypted.join('')
  }

  const vigenereDecrypt = (cipher, key) => {
    const parsedCipher = parseText(cipher)
    const parsedKey = repeatKey(parseText(key), parsedCipher.length)
    const totalLetters = letters.length

    const decrypted = parsedCipher.map((char, i) => {
      const isUpper = char === char.toUpperCase()
      const cipherIndex = getLetterIndex(char)
      const keyIndex = getLetterIndex(parsedKey[i])

      if (cipherIndex === -1 || keyIndex === -1) return char

      const decryptedIndex =
        (cipherIndex - keyIndex + totalLetters) % totalLetters
      return correctCase(getLetterByIndex(decryptedIndex, isUpper), isUpper)
    })
    setStr(decrypted.join(''))
    return decrypted.join('')
  }

  return (
    <div className='relative flex justify-center'>
      <div>
        <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
          <h1 className='text-[22px] text-[#00ff00] mb-[20px] text-muted text-center'>
            Tekstti Vijiner shifrlaw algoritmi járdeminde shifrlań hám
            deshifrlań
          </h1>
          <form className='flex flex-col gap-[20px]'>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-input'>Gilt sózin kiritiń</label>
              <input
                onChange={(e) => setKey(e.target.value.trim())}
                id='encryption-input'
                type='text'
                placeholder='Gilt sózin kiritiń'
                className='px-[5px] py-[7px] border-gray-200 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
              />
            </div>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-textarea'>Tekstti kiritiń</label>
              <input
                onChange={(e) => setText(e.target.value.trim())}
                id='encryption-textarea'
                type='text'
                placeholder='Tekstti kiritiń'
                className='px-[5px] py-[7px] border-gray-200 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
              />
            </div>
          </form>
          <div className='mt-[20px] w-full flex justify-between'>
            <button
              onClick={() => vigenereEncrypt(text, key)}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Shifrlaw
            </button>
            <button
              onClick={() => vigenereDecrypt(text, key)}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Deshifrlaw
            </button>
          </div>
          <div className='mt-[20px] text-white '>
            <p className='text-[20px] text-[#ff0000]'>
              <span className='text-[18px] text-[#00ff00] p-[5px] rounded-sm bg-black opacity-90'>
                Shtrixlanǵan tekst:
              </span>{' '}
              {str}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vijiner
