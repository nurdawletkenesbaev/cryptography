import React, { useState } from 'react'

const MagicSquare = () => {
  const [number, setNumber] = useState(0)
  const [cryption, setCryption] = useState(0)
  const [text, setText] = useState('')
  const [str, setStr] = useState('')

  function magicSquare(n) {
    if (n < 3) {
      throw new Error("Magic square yaratish uchun n >= 3 bo'lishi kerak!")
    }

    const magicSquare = Array.from({ length: n }, () => Array(n).fill(0))

    if (n % 2 === 1) {
      // Toq son uchun Siam metodi
      let i = 0,
        j = Math.floor(n / 2)
      for (let num = 1; num <= n * n; num++) {
        magicSquare[i][j] = num
        let newI = (i - 1 + n) % n
        let newJ = (j + 1) % n
        if (magicSquare[newI][newJ] !== 0) {
          newI = (i + 1) % n
          newJ = j
        }
        i = newI
        j = newJ
      }
    } else if (n % 4 === 0) {
      // 4 ga bo'linadigan juft son uchun Doubly Even metod
      let num = 1,
        max = n * n
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i % 4 === j % 4 || (i % 4) + (j % 4) === 3) {
            magicSquare[i][j] = max
          } else {
            magicSquare[i][j] = num
          }
          num++
          max--
        }
      }
    } else {
      // 4 ga bo'linmaydigan juft son uchun Strachey metodi
      const halfN = n / 2
      const subSquareSize = halfN * halfN

      // 4 ta kichik magic square yaratish
      const subSquare = generateOddMagicSquare(halfN)
      const offset = subSquareSize

      for (let i = 0; i < halfN; i++) {
        for (let j = 0; j < halfN; j++) {
          magicSquare[i][j] = subSquare[i][j] // Chap yuqori
          magicSquare[i + halfN][j + halfN] = subSquare[i][j] + offset // O'ng past
          magicSquare[i][j + halfN] = subSquare[i][j] + 2 * offset // O'ng yuqori
          magicSquare[i + halfN][j] = subSquare[i][j] + 3 * offset // Chap past
        }
      }

      // Kichik kvadratlar orasidagi ustunlarni almashtirish
      const k = Math.floor(halfN / 2)
      for (let i = 0; i < halfN; i++) {
        for (let j = 0; j < k; j++) {
          ;[magicSquare[i][j], magicSquare[i + halfN][j]] = [
            magicSquare[i + halfN][j],
            magicSquare[i][j],
          ]
        }
        for (let j = n - k + 1; j < n; j++) {
          ;[magicSquare[i][j], magicSquare[i + halfN][j]] = [
            magicSquare[i + halfN][j],
            magicSquare[i][j],
          ]
        }
      }

      // Markaziy ustunlarni almashtirish
      const middleColumn = Math.floor(halfN / 2)
      for (let i = 0; i < halfN; i++) {
        ;[magicSquare[i][middleColumn], magicSquare[i + halfN][middleColumn]] =
          [magicSquare[i + halfN][middleColumn], magicSquare[i][middleColumn]]
      }
    }

    return magicSquare
  }

  // Toq son uchun magic square (rekursiyasiz)
  function generateOddMagicSquare(n) {
    const magicSquare = Array.from({ length: n }, () => Array(n).fill(0))
    let i = 0,
      j = Math.floor(n / 2)
    for (let num = 1; num <= n * n; num++) {
      magicSquare[i][j] = num
      let newI = (i - 1 + n) % n
      let newJ = (j + 1) % n
      if (magicSquare[newI][newJ] !== 0) {
        newI = (i + 1) % n
        newJ = j
      }
      i = newI
      j = newJ
    }
    return magicSquare
  }

  // Foydalanish
  //   const n = 6 // Xohlagan son (toq yoki juft)

  //   console.log(magic)
  // Natijani chiqarish
  //   magic.forEach(row => console.log(row));

  function encryption(number, text, encryption) {
    const magic = magicSquare(number).flat()
    console.log(magic)
    setCryption(encryption)
    const str = text.split(' ').join('')
    const array = str.split('')
    console.log(array)
    setStr(
      array
        .map((item, index) => {
          if (encryption == 1) return str[magic[index] - 1]
          else return array[magic.indexOf(index + 1)]
        })
        .join('')
    )
  }

  return (
    <div>
      <div className='relative flex justify-center'>
        <div>
          <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
            <h1 className='text-[22px] text-[#00ff00] mb-[20px] text-muted text-center'>
              Tekstti Sıyqırlı kvadrat usılı járdeminde shifrlań hám deshifrlań
            </h1>
            <form className='flex flex-col gap-[20px]'>
              <div className='text-white flex flex-col gap-[5px]'>
                <label htmlFor='encryption-input'>n sanın kiritiń</label>
                <input
                  onChange={(e) => setNumber(+e.target.value.trim())}
                  id='encryption-input'
                  type='number'
                  placeholder='n sanın kiritiń'
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
                onClick={() => encryption(number, text, 1)}
                className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
              >
                Encryption
              </button>
              <button
                onClick={() => encryption(number, text, -1)}
                className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
              >
                Decryption
              </button>
            </div>
            <div className='mt-[20px] text-white '>
              <p className='text-[20px] text-[#ff0000]'>
                <span className='text-[18px] text-[#00ff00] p-[5px] rounded-sm bg-black opacity-90'>
                  {
                    cryption == 1 ? 'Shtrixlanǵan tekst' : 'Haqıyqıy tekst'
                  }
                </span>{' '}
                {str}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MagicSquare
