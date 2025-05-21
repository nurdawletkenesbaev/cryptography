import React, { useState } from 'react'
import { letters } from '../../constants/const'

const CezarAffin = () => {
  const [text, setText] = useState('')
  const [a, setA] = useState(1)
  const [b, setB] = useState(1)
  const [encrypted, setEncrypted] = useState('')

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

  function encryption(a, b, text) {
    const textArr = parseText(text)
    const indArr = textArr.map((item, index) => {
      return letters.find(
        (l, lIndex) => l.upperCase == item || l.lowerCase == item
      ).number
    })
    console.log(indArr)
    const newIndexArr = indArr.map((item, index) => {
      return (a * item + b + 34) % 34
    })
    console.log(newIndexArr)
    const result = newIndexArr.map((item, index) => {
      return letters.find((l, lInd) => l.number === item).upperCase
    })
    setEncrypted(result.join(''))
    return result.join('')
  }

  function decryption(a, b, text) {
    const textArr = parseText(text)
    const indArr = textArr.map((item, index) => {
      return letters.filter(
        (l, lIndex) => l.upperCase == item || l.lowerCase == item
      )
    })
    const newIndexArr = indArr.map((item, index) => {
      return (modInverse(a, 34) * (item[0].number - b) + 34 * 34) % 34
    })
    console.log(newIndexArr)
    const result = newIndexArr.map((item, index) => {
      return letters.find((l, lInd) => l.number === item).upperCase
    })

    setEncrypted(result.join(''))
    return result.join('')
  }
  return (
    <div className='relative flex justify-center'>
      <div className='flex flex-col items-center'>
        <div className='p-[20px]'>
          <div class='max-w-4xl mx-auto my-10 p-6  rounded-2xl shadow-lg border border-gray-700'>
            <h1 class='text-3xl font-bold text-center text-[#00ff00] mb-4'>
              Affin shifrlaw usılı
            </h1>
            <p class='text-white text-lg mb-4'>
              Affin shifrlaw - bul{' '}
              <span class='font-semibold'>
                klassikalıq almastırıw (substitution) shifrlaw algoritmi.
              </span>{' '}
              bolıp, onda hár bir hárip matematikalıq formulaǵa tiykarlanıp jańa
              shamasına ózgertiledi.
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Shifrlaw formulası:
            </h2>
            <div class='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
              E(x) = (a * x + b) mod m
            </div>
            <ul class='list-disc list-inside text-white mt-3 space-y-1'>
              <li>
                <strong>x</strong> — tiykarǵı teksttegi háriptiń tártip nomeri
              </li>
              <li>
                <strong>a</strong> — kóbeytiwshi gilt (mod m ge salıstırǵanda
                keri bolıwı kerek)
              </li>
              <li>
                <strong>b</strong> — qosıwshı gilt (qálegen pútin san)
              </li>
              <li>
                <strong>m</strong> — alipbedegi ulıwma háripler sanı (mısalı,
                Qaraqalpaq tilinde m = 34)
              </li>
            </ul>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Deshifrlaw formulası:
            </h2>
            <div class='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
              D(x) = a⁻¹ * (x - b) mod m
            </div>
            <p class='text-white mt-2'>
              Bu jerde <strong>a⁻¹</strong> — a sanınıń{' '}
              <span class='italic'>mod m</span> boyńnsha keri elementi. Onı{' '}
              <strong>Extended Euclidean Algorithm</strong> járdeminde tabıw
              múmkin.
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Mısal:
            </h2>
            <p class='text-white text-lg'>
              Aytayıq, bizde tómendegishe bolsın: <br />
              <span class='font-mono block mt-2'>a = 5, b = 8, m = 34</span>
              <br />
              Háripti shifrlaw: <br />
              <span class='font-mono'>E (x) = (5x + 8) mod 34</span>
              <br />
              Háripti deshifrlaw: <br />
              <span className='font-mono'>D (x) = 7 * (x - 8) mod 34</span>{' '}
              <br />
              (Bul jerde 7 - 5 tiń mod 34 boyinsha keri sanı, sebebi 5 × 7 ⇒ 1
              mod 34)
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Abzallıqları:
            </h2>
            <ul class='list-disk list-inside text-white space-y-1'>
              <li>Ápiwayı hám tez isleydi</li>
              <li>Kóp variantlı shifrlaw beredi (a hám b sebepli) </li>
              <li>Matematikalıq tiykarlanǵanlıǵı sebepli analizlew ańsat</li>
            </ul>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Kemshilikleri:
            </h2>
            <ul class='list-disk list-inside text-white space-y-1'>
              <li>Ápiwayı statistikalıq tallaw arqalı buzılıwı múmkin</li>
              <li>
                Kalitler naduris tanlansa, shifrlaw islemeydi (máselen, a hám m
                salıstırmalı ápiwayı bolmasa)
              </li>
            </ul>

            <p class='mt-6 text-sm text-white text-center italic'>
              Bul maǵlıwmatlar Qaraqalpaq tilindegi háripler sanına (m = 34)
              maslastırılǵan.
            </p>
          </div>
        </div>
        <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
          <h1 className='text-[22px] text-[#00ff00] my-[20px] text-muted text-center'>
            Tekstti Cezar affin shifrlaw usılı járdeminde shifrlań hám
            deshifrlań
          </h1>
          <form className='flex flex-col gap-[20px]'>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-input'>a sanın kiritiń</label>
              <input
                onChange={(e) => setA(+e.target.value)}
                id='encryption-input'
                type='number'
                placeholder='a sanın kiritiń'
                className='px-[5px] py-[7px] border-gray-200 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
              />
            </div>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-input'>b sanın kiritiń</label>
              <input
                onChange={(e) => setB(+e.target.value)}
                id='encryption-input'
                type='number'
                placeholder='b sanın kiritiń'
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
          <div className='mt-[20px] flex justify-between'>
            <button
              onClick={() => encryption(a, b, text)}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Shifrlaw
            </button>
            <button
              onClick={() => decryption(a, b, text)}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Deshifrlaw
            </button>
          </div>
          <div className='mt-[20px] text-white '>
            <p className='text-[20px] text-[#ff0000]'>
              <span className='text-[18px] text-[#00ff00] p-[5px] rounded-sm bg-black opacity-90'>
                Shifrlanǵan tekst:
              </span>{' '}
              {encrypted}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CezarAffin
