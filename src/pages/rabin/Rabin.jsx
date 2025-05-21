import React, { useState } from 'react'
import { letters } from '../../constants/const'

const Rabin = () => {
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

  function rabinEncrypt(q, p, text) {
    const textArr = parseText(text)
    console.log(textArr)
    const indArr = textArr.map((item, index) => {
      return letters.find(
        (l, lIndex) => l.upperCase == item || l.lowerCase == item
      )
    })
    console.log(indArr)
    const newIndArr = indArr.map((item, index) => {
      return item.number ** 2 % (q * p)
    })

    console.log(newIndArr)
    setTextDecrypted('')
    setTextEncrypted(newIndArr.join(' '))
    return newIndArr
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

  function rabinDecrypt(q, p, text) {
    const arr = text.split(' ').map((item) => {
      return +item
    })
    const a = modInverse(p, q) * p
    // console.log(a)
    const b = modInverse(q, p) * q
    // console.log(b)
    const result = arr.map((item) => {
      const m1 = Number(
        modularExponentiation(BigInt(item), BigInt((p + 1) / 4), BigInt(p))
      )
      const m2 = p - m1
      const m3 = Number(
        modularExponentiation(BigInt(item), BigInt((q + 1) / 4), BigInt(q))
      )
      const m4 = q - m3
      console.log(m1, m2, m3, m4)
      const M1 = (a * m3 + b * m1) % (p * q)
      const M2 = (a * m4 + b * m1) % (p * q)
      const M3 = (a * m3 + b * m2) % (p * q)
      const M4 = (a * m4 + b * m2) % (p * q)
      console.log(M1, M2, M3, M4)
      if (M1 < 34) return M1
      else if (M2 < 34) return M2
      else if (M3 < 34) return M3
      else if (m4 < 34) return M4
    })
    console.log(result)
    const str = result.map((item) => {
      return letters[item].upperCase
    })
    setTextEncrypted('')
    setTextDecrypted(str.join(''))
  }
  return (
    <div className='flex flex-col items-center'>
      <section className=' text-gray-800 p-8 max-w-5xl mx-auto rounded-xl shadow-lg'>
        <h1 className='text-3xl font-bold mb-4 text-center text-[#00ff00]'>
          Rabin Shifrlaw Algoritmi
        </h1>

        <p className='mb-4 text-white'>
          Rabin shifrlaw algoritmi 1979-jılda Maykl Rabin tárepinen islep
          shıǵılǵan. Bul algoritmniń qáwipsizligi úlken ápiwayı sanlarǵa hám
          olardı kóbeytiwshilerge ajıratıw máselesine tiykarlanǵan. Bul algoritm
          RSA ǵa uqsas bolsa da, onda ashılǵan xabardıń 4 múmkin bolǵan mánisi
          bar.
        </p>

        <div className='space-y-4 '>
          <h2 className='text-2xl font-semibold text-[#00ff00]'>
            Algoritm basqıshları
          </h2>
          <ul className='list-disc list-inside ml-4 space-y-2 text-white'>
            <li>
              Eki ápiwayı san tańlanadı: <code>p</code> va <code>q</code>,
              shárt: <code>p % 4 = 3</code> va <code>q % 4 = 3</code>
            </li>
            <li>
              Jabıq gilt: <code>p</code> va <code>q</code>
            </li>
            <li>
              Ashıq gilt: <code>n = p * q</code>
            </li>
            <li>
              Xabar: <code>M &lt; n</code>
            </li>
          </ul>

          <h3 className='text-xl font-semibold text-[#00ff00]'>
            Shifrlaw formulası:
          </h3>
          <p className='bg-gray-100 p-2 rounded text-black'>
            <code>C = M² mod n</code>
          </p>

          <h3 className='text-xl font-semibold text-[#00ff00]'>
            Shifrdı ashıw formulaları:
          </h3>
          <div className='bg-gray-50 p-4 rounded space-y-2 text-black'>
            <code>m1 = C^((p+1)/4) mod p</code>
            <br />
            <code>m2 = (p - m1) mod p</code>
            <br />
            <code>m3 = C^((q+1)/4) mod q</code>
            <br />
            <code>m4 = (q - m3) mod q</code>
            <br />
            <code>a = p * (p⁻¹ mod q)</code>
            <br />
            <code>b = q * (q⁻¹ mod p)</code>
            <br />
            <code>M1 = (a * m3 + b * m1) mod n</code>
            <br />
            <code>M2 = (a * m3 + b * m2) mod n</code>
            <br />
            <code>M3 = (a * m4 + b * m1) mod n</code>
            <br />
            <code>M4 = (a * m4 + b * m2) mod n</code>
          </div>

          <h2 className='text-2xl font-semibold text-[#00ff00] mt-6'>Mısal</h2>
          <div className='bg-gray-50 p-4 rounded-lg space-y-2 text-black'>
            <p>
              <strong>p = 43, q = 19, M = "OLTI"</strong>
            </p>
            <p>O háribi = 19, L = 15, T = 24, I = 11</p>
            <p>
              <strong>1. n = p * q =</strong> 43 * 19 = 817
            </p>
            <p>
              <strong>2. Hárbir hárip ushın C esaplanadı:</strong>
            </p>
            <ul className='list-disc list-inside ml-4'>
              <li>
                O (M = 0): C = 19² mod 817 = 361 mod 817 = <strong>361</strong>
              </li>
              <li>
                L (M = 15): C = 225 mod 817 = <strong>225</strong>
              </li>
              <li>
                T (M = 24): C = 576 mod 817 = <strong>576</strong>
              </li>
              <li>
                I (M = 11): C = 121 mod 817 = <strong>121</strong>
              </li>
            </ul>

            <p>
              <strong>3. Deshifrlaw: (Mısalı, C = 361 ushın)</strong>
            </p>
            <ul className='list-decimal list-inside ml-4'>
              <li>m1 = 361^11 mod 43 = 24</li>
              <li>m2 = 43 - 24 = 19</li>
              <li>m3 = 361^11 mod 19 = 0</li>
              <li>m4 = 19 - 0 = 19</li>
              <li>a = 43 * (43⁻¹ mod 19) = 43 * 4 = 172</li>
              <li>b = 19 * (19⁻¹ mod 43) = 19 * 34 = 646</li>
              <li>M1 = (172 * 0 + 646 * 24) mod 817 = 798</li>
              <li>M2 = (172 * 0 + 646 * 19) mod 817 = 798</li>
              <li>
                M3 = (172 * 19 + 646 * 24) mod 817 = 19 <strong>79 ✅</strong>
              </li>
              <li>M4 = (172 * 19 + 646 * 19) mod 817 = 19</li>
            </ul>

            <p>
              Durıs nátiyje: <strong>19 = 'O'</strong>
            </p>
          </div>

          <p className='text-sm text-white'>
            Hárbir C mánis ushın joqarıdaǵı sıyaqlı esaplawdı orınlap aqırǵı
            "OLTI" juwabın alamız
          </p>
        </div>
      </section>
      <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
        <h1 className='text-[22px] text-[#00ff00] mb-[20px] text-muted text-center'>
          Tekstti Rabin shifrlaw algoritmi járdeminde shifrlań hám deshifrlań
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
            onClick={() => rabinEncrypt(q, p, text)}
            className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
          >
            Shifrlaw
          </button>
          <button
            onClick={() => rabinDecrypt(q, p, text)}
            className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
          >
            Deshifrlaw
          </button>
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
      {/* <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
        <h1 className='text-[22px] text-[#00ff00] mb-[20px] text-muted text-center'>
          Tekstti Rabin shifrlaw algoritmi járdeminde shifrlań hám deshifrlań
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
              onChange={(e) => setDeText(e.target.value.trim())}
              id='encryption-textarea'
              type='text'
              placeholder='Tekstti kiritiń'
              className='px-[5px] py-[7px] border-gray-200 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
            />
          </div>
        </form>
        <div className='mt-[20px] w-full flex justify-between'>
          <button
            onClick={() => rabinDecrypt(q, p, deText)}
            className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
          >
            Deshifrlaw
          </button>
        </div>
        <div className='mt-[20px] text-white '>
          <p className='text-[20px] text-[#ff0000]'>
            <span className='text-[18px] text-[#00ff00] p-[5px] rounded-sm bg-black opacity-90'>
              Ashıq tekst:
            </span>{' '}
            {textDecrypted}
          </p>
        </div>
      </div> */}
    </div>
  )
}

export default Rabin
