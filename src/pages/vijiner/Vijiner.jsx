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
      <div className='flex flex-col items-center'>
        <div className='p-[20px]'>
          {/* <div class='max-w-4xl mx-auto my-10 p-6  rounded-2xl shadow-lg border border-gray-700'>
               <h1 class='text-3xl font-bold text-center text-[#00ff00] mb-4'>
                 Vigenère shifrlash usuli
               </h1>
   
               <p class='text-white text-lg mb-4'>
                 <strong>Vigenère shifrlash</strong> — bu{' '}
                 <span class='font-semibold'>polialfavit almashtirish</span>{' '}
                 algoritmi bo‘lib, har bir harfni shifrlashda turli kalit harflar
                 ishlatiladi. Bu uni Cezar shifrlashga qaraganda ancha kuchli
                 qiladi.
               </p>
   
               <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
                 Shifrlash formulasi:
               </h2>
               <div class='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
                 E<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) mod m
               </div>
               <ul class='list-disc list-inside text-white mt-3 space-y-1'>
                 <li>
                   <strong>
                     P<sub>i</sub>
                   </strong>{' '}
                   — ochiq matnning i-harfi raqamga aylantirilgan shakli
                 </li>
                 <li>
                   <strong>
                     K<sub>i</sub>
                   </strong>{' '}
                   — kalit matnning mos harfi (kalit takroran yoziladi)
                 </li>
                 <li>
                   <strong>m</strong> — alifbo uzunligi (masalan, lotin tilida m =
                   26)
                 </li>
               </ul>
   
               <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
                 Deshifrlash formulasi:
               </h2>
               <div class='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
                 D<sub>i</sub> = (C<sub>i</sub> - K<sub>i</sub> + m) mod m
               </div>
               <p class='text-white mt-2'>
                 Bu yerda{' '}
                 <strong>
                   C<sub>i</sub>
                 </strong>{' '}
                 — shifrlangan matn harfi raqamdagi ko‘rinishda,{' '}
                 <strong>
                   K<sub>i</sub>
                 </strong>{' '}
                 — kalit harfi.
               </p>
   
               <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
                 Misol:
               </h2>
               <p class='text-white text-lg'>
                 Ochiq matn: <span class='font-mono'>ATTACKATDAWN</span> <br />
                 Kalit: <span class='font-mono'>LEMON</span> →{' '}
                 <span class='font-mono'>LEMONLEMONLE</span> (takrorlanadi) <br />
                 <br />
                 Harflarni raqamga aylantirish (A=0, B=1, ..., Z=25):
                 <br />
                 <span class='font-mono'>
                A             =0, T=19, T=19, A=0, C=2, K=10, A=0, T=19, D=3, A=0, W=22, N=13
                             <br />
                L             =11, E=4, M=12, O=14, N=13, L=11, E=4, M=12, O=14, N=13, L=11
                           </span>
                           <br />
                           <br />
                           Shifrlash: (x + k) mod 26 <br />
                           Natija: <span class='font-mono'>LXFOPVEFRNHR</span>
                         </p>
             
                         <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
                           Afzalliklari:
                         </h2>
                         <ul class='list-disc list-inside text-white space-y-1'>
                           <li>
                             Polialfavitli shifrlash — harflar bir xil tarzda shifrlanmaydi
                           </li>
                           <li>Statistik tahlilga nisbatan barqarorroq</li>
                           <li>Kalit uzunligi oshgani sari xavfsizlik kuchayadi</li>
                         </ul>
             
                         <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
                           Kamchiliklari:
                         </h2>
                         <ul class='list-disc list-inside text-white space-y-1'>
                           <li>
                             Kalit takrorlansa, statistik tahlil orqali buzilishi mumkin
                           </li>
                           <li>
                             Kalit yo‘qolsa yoki noto‘g‘ri bo‘lsa, matnni qayta tiklash qiyin
                           </li>
                         </ul>
             
                         <p class='mt-6 text-sm text-white text-center italic'>
                           Ushbu algoritm ko‘p vaqt davomida buzilmagan deb hisoblangan, ammo
                           zamonaviy kriptografiya uchun kuchsiz hisoblanadi.
                         </p>
                       </div> */}
          <div class='max-w-4xl mx-auto my-10 p-6 rounded-2xl shadow-lg border border-gray-700'>
            <h1 class='text-3xl font-bold text-center text-[#00ff00] mb-4'>
              Vijiner shifrlaw algoritmi
            </h1>
            <p class='text-white text-lg mb-4'>
              Vijiner shifrlaw algoritmi — bul{' '}
              <span class='font-semibold'>
                kópshilik tárepinen klassikalıq kriptografiyanıń eń kúshli
                usıllarınan biri
              </span>{' '}
              dep esaplanadı. Bul algoritm{' '}
              <span class='italic'>polialfavitikalıq almastırıw</span> usılına
              tiykarlanadı, yaǵnıy birneshe túrli almastırıw giltleri náwbet
              penen qollanıladı.
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Shifrlaw procesi:
            </h2>
            <p class='text-white'>
              Hárbir háriptiń poziciyası gilt sózdegi sáykes hárip tiykarında
              ózgertiledi. Hárbir háriptiń álipbedegi tártip nomeri tiykarında
              kóshiriw arqalı jańa hárip payda etiledi.
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Formulası:
            </h2>
            <div class='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
              C<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) mod m
            </div>
            <ul class='list-disc list-inside text-white mt-3 space-y-1'>
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

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Deshifrlaw formulası:
            </h2>
            <div class='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
              P<sub>i</sub> = (C<sub>i</sub> - K<sub>i</sub> + m) mod m
            </div>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Qaraqalpaq alfaviti (34 harf):
            </h2>
            <p class='bg-gray-100 p-3 rounded-xl text-gray-800 font-mono'>
              A, Á, B, D, E, F, G, Ǵ, H, X, Í, I, J, K, Q, L, M, N, Ń, O, Ó, P,
              R, S, T, U, Ú, V, W, Y, Z, Sh, C, Ch
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Mısal:
            </h2>
            <p class='text-white text-lg'>
              Ochiq matn: <span class='font-mono'>kriptografiya</span>
              <br />
              Kalit so‘z: <span class='font-mono'>qaraqalpaq</span>
              <br />
              Alfavitti indekslew: háripler 0 den 33 ke shekem cifrlanadı.
              Háripler sáykes túrde indeksler menen almastırıladı.
            </p>

            <div class='text-white mt-4'>
              <h3 class='text-xl font-semibold text-[#00ff00] mb-2'>
                1. Ashıq tekst hám giltlerdi indekslerge almastırıw:
              </h3>
              <p class='font-mono'>
                kriptografiya = [13, 22, 10, 21, 24, 19, 6, 22, 0, 5, 10, 29, 0]{' '}
                <br />
                qaraqalpaq = [14, 0, 22, 0, 14, 0, 15, 21, 0, 14, 14, 0, 22]
                (ashıq tekst uzınlıǵına teń bolǵanǵa shekem tákirarlap jazıladı)
              </p>
            </div>

            <div class='text-white mt-4'>
              <h3 class='text-xl font-semibold text-[#00ff00] mb-2'>
                2. Shifrlaw (hárbir juplıqtı qosıp, mod 34 allıw):
              </h3>
              <p class='font-mono'>
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
                (5 + 14) % 34 = 19 → O<br />
                (10 + 14) % 34 = 24 → T<br />
                (29 + 0) % 34 = 29 → Y<br />
                (0 + 22) % 34 = 22 → R
                <br />
              </p>
            </div>

            <p class='text-white mt-4'>
              <strong>Shifrlanǵan tekst:</strong>{' '}
              <span class='font-mono text-[#00ff00]'>VRCPDOÚXAOTYR</span>
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Abzallıqları:
            </h2>
            <ul class='list-disc list-inside text-white space-y-1'>
              <li>
                Polialfavitli shifrlaw sebepli statistikalıq analizge
                salıstırǵanda shıdamlı
              </li>
              <li>Gilt uzınıraq bolsa, qáwipsizlik dárejesi artadı</li>
              <li>Ápiwayı matematikalıq ámeller tiykarında isleydi</li>
            </ul>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Kemshilikleri:
            </h2>
            <ul class='list-disc list-inside text-white space-y-1'>
              <li>Gilt júdá qısqa bolsa, tez tabılıwı múmkin</li>
              <li>Kalit joytılsa, deshifrlaw derlik múmkin emes</li>
              <li>Háripler jaylasıwına baylanıslı bolıp qaladı</li>
            </ul>

            <p class='mt-6 text-sm text-white text-center italic'>
              Bul maǵlıwmatlar Qaraqalpaq álipbesine (m = 34) maslastırılǵan.
              hám real indeksler tiykarında esaplanǵan.
            </p>
          </div>
        </div>
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
