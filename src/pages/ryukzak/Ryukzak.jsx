import React, { useState } from 'react'
import { letters } from '../../constants/const'

const Ryukzak = () => {
  const [q, setQ] = useState(0)
  const [p, setP] = useState(0)
  const [text, setText] = useState('')
  const [deText, setDeText] = useState('')
  const [textEncrypted, setTextEncrypted] = useState('')
  const [textDecrypted, setTextDecrypted] = useState('')

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

  function modInverse(a, m) {
    let m0 = m,
      x0 = 0,
      x1 = 1

    a = ((a % m) + m) % m

    if (m === 1) return 0

    while (a > 1) {
      let q = Math.floor(a / m)
      ;[a, m] = [m, a % m]
      ;[x0, x1] = [x1 - q * x0, x0]
    }

    if (x1 < 0) x1 += m0

    return x1
  }

  function modularExponentiation(base, exponent, modulus) {
    base = base % modulus
    let result = 1n

    while (exponent > 0n) {
      if (exponent % 2n === 1n) {
        result = (result * base) % modulus
      }
      exponent = exponent / 2n
      base = (base * base) % modulus
    }

    return result
  }

  const n = p * q
  const k = (q - 1) * (p - 1)

  function gcd(a, b) {
    while (b !== 0) {
      let t = b
      b = a % b
      a = t
    }
    return a
  }
  function findE(k) {
    for (let e = 2; e < k; e++) {
      if (gcd(e, k) === 1) {
        return e // birinchi mos e ni qaytaradi
      }
    }
    return null // topilmasa
  }
  const e = findE(k)
  const d = modInverse(e, k)

  function rsaEncrypt(q, p, text) {
    console.log((e * d) % k)
    const textArr = parseText(text)
    console.log(textArr)
    const indArr = textArr.map((item, index) => {
      return letters.filter(
        (l, lIndex) => l.upperCase == item || l.lowerCase == item
      )
    })
    const newIndArr = indArr.map((item, index) => {
      return item[0].number
    })

    console.log(newIndArr)

    const encryptedArr = newIndArr.map((item) => {
      return Number(modularExponentiation(BigInt(item), BigInt(e), BigInt(n)))
    })
    console.log(encryptedArr)
    setTextDecrypted('')
    setTextEncrypted(encryptedArr.join(' '))
    return newIndArr
  }

  //   function rsaDecrypt(q, p, text) {
  //     const arr = text.split(' ').map((item) => {
  //       return Number(item)
  //     })
  //     const newArr = arr.map((item) => {
  //       return Number(modularExponentiation(BigInt(item), BigInt(d), BigInt(n)))
  //     })
  //     const result = newArr
  //       .map((item, index) => {
  //         return letters[item].upperCase
  //       })
  //       .join('')
  //     setTextEncrypted('')
  //     setTextDecrypted(result)
  //     return result
  //   }

  return (
    <div className='flex flex-col items-center'>
      <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
        <h1 className='text-[22px] text-[#00ff00] mb-[20px] text-muted text-center'>
          RSA shifrlaw algoritmi járdeminde shifrlań hám deshifrlań
        </h1>
        <form className='flex flex-col gap-[20px]'>
          <div className='text-white flex flex-col gap-[5px]'>
            <label htmlFor='encryption-input'>q sanın kiritiń</label>
            <input
              onChange={(e) => setQ(+e.target.value.trim())}
              id='encryption-input'
              type='number'
              placeholder='q sanın kiritiń'
              className='px-[5px] py-[7px] border-gray-200 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
            />
          </div>
          <div className='text-white flex flex-col gap-[5px]'>
            <label htmlFor='encryption-input'>p sanın kiritiń</label>
            <input
              onChange={(e) => setP(+e.target.value.trim())}
              id='encryption-input'
              type='number'
              placeholder='p sanın kiritiń'
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
            onClick={() => rsaEncrypt(q, p, text)}
            className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
          >
            Shifrlaw
          </button>
          {/* <button
            onClick={() => rsaDecrypt(q, p, text)}
            className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
          >
            Deshifrlaw
          </button> */}
        </div>
        <div className='mt-[20px] text-white '>
          {textEncrypted != '' && (
            <p className='text-[20px] text-[#ff0000]'>
              <span className='text-[18px] text-[#00ff00] p-[5px] rounded-sm bg-black opacity-90'>
                Shtrixlanǵan tekst:
              </span>{' '}
              {textEncrypted}
            </p>
          )}
          {textDecrypted != '' && (
            <p className='text-[20px] text-[#ff0000]'>
              <span className='text-[18px] text-[#00ff00] p-[5px] rounded-sm bg-black opacity-90'>
                Shtrixlanǵan tekst:
              </span>{' '}
              {textDecrypted}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Ryukzak
