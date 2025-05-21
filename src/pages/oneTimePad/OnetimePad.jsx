import React, { useState } from 'react'
import { letters } from '../../constants/const'

const OnetimePad = () => {
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
        if (input[i] !== ' ') {
          result.push(input[i])
        }
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

  const correctCase = (char, isUpperCase) => {
    if (char === 'ı' && isUpperCase) return 'I'
    if (char === 'I' && !isUpperCase) return 'ı'
    return isUpperCase ? char.toUpperCase() : char.toLowerCase()
  }

  const vigenereEncrypt = (text, key) => {
    const parsedText = parseText(text)
    console.log(parsedText)
    const parsedKey = parseText(key)
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
    const parsedKey = parseText(key)
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
      <div className='flex flex-col items-center'>
        <div className='p-[20px]'>
          <div className='max-w-4xl mx-auto my-10 p-6 rounded-2xl shadow-lg border border-gray-700'>
            <h1 className='text-3xl font-bold text-center text-[#00ff00] mb-4'>
              Bir mártelik blaknot shifrlaw algoritmi (OneTimePad)
            </h1>

            <p className='text-white text-lg mb-4'>
              Bir mártelik bloknot usılı Onetimepad dep te ataladı. Gilt
              sipatında bolsa uzınlıǵı júdá úlken bolǵan belgiler izbe-izligi
              alınadı.
            </p>
            <p className='text-white text-lg mb-4'>
              Máselen, bir jazıwshınıń shıǵarmasın alıwımız múmkin. Mısal
              retinde Pirimqul Qadirovtıń "Juldızlı túnler" shıǵarmasın alamız.
              Bunda shifrlanıwshı tekst gilttegi sáykes belgiler menen qosıladı
              hám modul alınadı. Modul alınıp atırǵan san tańlanıp atırǵan
              alfavit uzınlıǵına teń bolıwı shárt. gilttiń paydalanılǵan bólegi
              óshiriledi. Bul process shifrlanıp atırǵan tekst tamam bolǵansha
              bolǵansha dawam ettiriledi. Bul Onetimepad usılı shifrdı ashıwdaǵı
              qıyınshılıǵı menen (maǵlıwmatlardı qorǵaw baǵdarında) ádewir
              bekkem shifrlaw usılı esaplanǵan
            </p>

            <h2 className='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Formulası:
            </h2>
            <div className='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
              C<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) mod m
            </div>
            <ul className='list-disc list-inside text-white mt-3 space-y-1'>
              <li>
                <strong>
                  C<sub>i</sub>
                </strong>{' '}
                — shifrlanǵan hárip
              </li>
              <li>
                <strong>
                  P<sub>i</sub>
                </strong>{' '}
                — ashıq teksttegi i-hárip
              </li>
              <li>
                <strong>
                  K<sub>i</sub>
                </strong>{' '}
                — gilttegi i-hárip
              </li>
              <li>
                <strong>m</strong> — alfavittegi háripler sanı (Qaraqalpaq
                tilinde m = 34)
              </li>
            </ul>

            <h2 className='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Deshifrlaw formulası:
            </h2>
            <div className='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
              P<sub>i</sub> = (C<sub>i</sub> - K<sub>i</sub> + m) mod m
            </div>

            <h2 className='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Qaraqalpaq alfaviti (34 harf):
            </h2>
            <p className='bg-gray-100 p-3 rounded-xl text-gray-800 font-mono'>
              A, Á, B, D, E, F, G, Ǵ, H, X, Í, I, J, K, Q, L, M, N, Ń, O, Ó, P,
              R, S, T, U, Ú, V, W, Y, Z, Sh, C, Ch
            </p>

            <h2 className='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Mısal:
            </h2>
            <p className='text-white text-lg'>
              Ashıq tekst: <span className='font-mono'>kriptograf</span>
              <br />
              Gilt tekst: <span className='font-mono'>qaraqalpaq</span>
              <br />
              Alfavitti indekslew: háripler 0 den 33 ke shekem cifrlanadı.
              Háripler sáykes túrde indeksler menen almastırıladı.
            </p>

            <div className='text-white mt-4'>
              <h3 className='text-xl font-semibold text-[#00ff00] mb-2'>
                1. Ashıq tekst hám giltlerdi indekslerge almastırıw:
              </h3>
              <p className='font-mono'>
                kriptografiya = [13, 22, 10, 21, 24, 19, 6, 22, 0, 5] <br />
                qaraqalpaq = [14, 0, 22, 0, 14, 0, 15, 21, 0, 14] (ashıq tekst
                uzınlıǵına teń bolıwı shárt)
              </p>
            </div>

            <div className='text-white mt-4'>
              <h3 className='text-xl font-semibold text-[#00ff00] mb-2'>
                2. Shifrlaw (hárbir juplıqtı qosıp, mod 34 allıw):
              </h3>
              <p className='font-mono'>
                (13 + 14) % 34 = 27 → V
                <br />
                (22 + 0) % 34 = 22 → R<br />
                (10 + 22) % 34 = 32 → C<br />
                (21 + 0) % 34 = 21 → P<br />
                (24 + 14) % 34 = 4 → D<br />
                (19 + 0) % 34 = 19 → O<br />
                (5 + 21) % 34 = 26 → Ú<br />
                (22 + 21) % 34 = 9 → X<br />
                (0 + 0) % 34 = 0 → A<br />
                (5 + 14) % 34 = 19 → O
                <br />
              </p>
            </div>

            <p className='text-white mt-4'>
              <strong>Shifrlanǵan tekst:</strong>{' '}
              <span className='font-mono text-[#00ff00]'>VRCPDOÚXAO</span>
            </p>

            <p className='mt-6 text-sm text-white text-center italic'>
              Bul maǵlıwmatlar Qaraqalpaq álipbesine (m = 34) maslastırılǵan.
              hám real indeksler tiykarında esaplanǵan.
            </p>
          </div>
        </div>
        <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
          <h1 className='text-[22px] text-[#00ff00] mb-[20px] text-muted text-center'>
            Tekstti OneTimePad shifrlaw algoritmi járdeminde shifrlań hám
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

export default OnetimePad
