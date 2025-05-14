import React, { useState } from 'react'

const MagicSquare = () => {
  const [number, setNumber] = useState(0)
  const [cryption, setCryption] = useState(0)
  const [text, setText] = useState('')
  const [str, setStr] = useState('')
  const [matrix, setMatrix] = useState([[]])
  const [arrText, setArrText] = useState([])

  function magicSquare(n) {
    if (n < 3) {
      throw new Error('Magic square jaratıw ushın n >= 3 bolıwı kerek!')
    }

    const magicSquare = Array.from({ length: n }, () => Array(n).fill(0))

    if (n % 2 === 1) {
      // Taq sanlar ushın
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
      // 4 ke bólinetuǵın sanlar
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
      // 4 ke bólinbeytuǵın jup san
      const halfN = n / 2
      const subSquareSize = halfN * halfN

      const subSquare = generateOddMagicSquare(halfN)
      const offset = subSquareSize

      for (let i = 0; i < halfN; i++) {
        for (let j = 0; j < halfN; j++) {
          magicSquare[i][j] = subSquare[i][j]
          magicSquare[i + halfN][j + halfN] = subSquare[i][j] + offset
          magicSquare[i][j + halfN] = subSquare[i][j] + 2 * offset
          magicSquare[i + halfN][j] = subSquare[i][j] + 3 * offset
        }
      }

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

      const middleColumn = Math.floor(halfN / 2)
      for (let i = 0; i < halfN; i++) {
        ;[magicSquare[i][middleColumn], magicSquare[i + halfN][middleColumn]] =
          [magicSquare[i + halfN][middleColumn], magicSquare[i][middleColumn]]
      }
    }

    return magicSquare
  }

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

  function encryption(number, text, cryptionType) {
    setCryption(cryptionType)
    const magic = magicSquare(number).flat()
    console.log(magic)
    setMatrix(magicSquare(number))
    console.log(matrix)
    const str = text.split(' ').join('')
    const array = parseText(str)
    setArrText(array)
    console.log(array)
    setStr(
      array
        .map((item, index) => {
          if (cryptionType === 1) return array[magic[index] - 1]
          else {
            // array.reverse
            return array[magic.indexOf(index + 1)]
          }
        })
        .join('')
    )
  }

  //korrekt 1-esap
  // function esap(n) {
  //   if (n === 0) {
  //     return 0
  //   } else if (n === 1) {
  //     return 1
  //   } else {
  //     return ((2 + 50 / 51) * esap(n - 1) - esap(n - 2)) / (1 + 50 / 51)
  //   }
  // }
  // for (let i = 2; i <= 50; i++) console.log(esap(i))

  //korrekt 1-esap

  // const [E, setE] = useState([])
  // const E = []
  // const E2 = []
  // const n = 50,
  //   U0 = 0,
  //   U1 = 1,
  //   b = 1
  // for (let i = 0; i < 50; i++) {
  //   E.push([])
  //   for (let l = 0; l < 50; l++) {
  //     if (i == l) E[i][l] = 1
  //     else E[i][l] = 0
  //   }
  // }

  // for (let i = 0; i < 50; i++) {
  //   E2.push([])
  //   for (let l = 0; l < 50; l++) {
  //     if (i == l) E2[i][l] = 2
  //     else E2[i][l] = 0
  //   }
  // }

  // console.log(E)

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
                onClick={() => {
                  encryption(number, text, 1)
                  // setCryption(1)
                }}
                className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
              >
                Shifrlaw
              </button>
              <button
                onClick={() => {
                  // setCryption(-1)
                  encryption(number, text, -1)
                }}
                className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
              >
                Deshifrlaw
              </button>
            </div>
            <div>
              <div>
                <p className='text-[#00ff00] text-center my-[12px] text-[20px]'>
                  Sıyqırlı kvadrat tómendegishe boladı:
                </p>
                <div
                  className={`w-full flex flex-col items-center justify-center border-[1px] border-[#00ff00] gap-[10px] p-[10px]`}
                >
                  {matrix.map((item) => (
                    <div key={item} className='flex gap-[10px]'>
                      {item.map((elem) => (
                        <div
                          key={elem}
                          className='text-[#00ff00] flex flex-col text-center border-[1px] border-[#00ff00] gap-[10px] py-[4px] px-[8px]'
                        >
                          {elem}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <p className='text-[#00ff00] text-center my-[12px] text-[20px]'>
                  Berilgen tekstti tómendegishe kestege jaylastıramız:
                </p>
                <div className='w-full flex flex-col  items-center justify-center border-[1px] border-[#00ff00] gap-[10px] p-[10px]'>
                  {cryption === 1
                    ? matrix.map((item) => (
                        <div key={item} className='flex gap-[10px]'>
                          {item.map((elem) => (
                            <div
                              key={elem}
                              className='text-[#00ff00] flex  text-center border-[1px] border-[#00ff00] gap-[10px] py-[4px] px-[8px]'
                            >
                              {arrText[elem - 1]}
                            </div>
                          ))}
                        </div>
                      ))
                    : matrix.map((item, ind) => (
                        <div key={item} className='flex gap-[10px]'>
                          {item.map((elem, index) => (
                            <div
                              key={elem}
                              className='text-[#00ff00] flex  text-center border-[1px] border-[#00ff00] gap-[10px] py-[4px] px-[8px]'
                            >
                              {
                                parseText(text.split(' ').join(''))[
                                  index + ind * number
                                ]
                              }
                            </div>
                          ))}
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div className='text-[18px] text-[#00ff00] text-center my-[10px]'>
              Eki kestedegi sáykes elementlerdi tártiplengen halda jazamız.
              Sonda {cryption === 1 ? ' shtrixlanǵan tekst' : 'haqıyqıy tekst'}{' '}
              tómendegishe boladı
            </div>
            <div className='mt-[20px] text-white '>
              <p className='text-[22px] text-[#ff0000] text-center p-[3px] border-[1px] border-[#00ff00] rounded-sm'>
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
