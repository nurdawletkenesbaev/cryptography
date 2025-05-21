import React, { useState } from 'react'
import { cezarEncrypt } from './cezarEncrypt'

const Cezar = () => {
  const [text, setText] = useState('')
  const [shift, setShift] = useState(1)
  const [encrypted, setEncrypted] = useState('')

  const handleEncrypt = () => {
    const result = cezarEncrypt(text, Number(shift))
    setEncrypted(result)
  }

  return (
    <div className='relative flex justify-center'>
      <div className='flex flex-col items-center'>
        <div className='p-[20px]'>
          <div class='max-w-4xl mx-auto my-10 p-6 rounded-2xl shadow-lg border border-gray-700'>
            <h1 class='text-3xl font-bold text-center text-[#00ff00] mb-4'>
              Cezar shifrlaw algoritmi
            </h1>

            <p class='text-white text-lg mb-4'>
              <strong>Cezar shifrlaw</strong> — bu{' '}
              <span class='font-semibold'>
                klassikalıq monoalfavitikalıq almashtırıw
              </span>{' '}
              usulı bolıp, ol birinshi ret Yuliy Cezar tárepinen isletilgen.
              Hárbir hárip álipbede <strong>belgili sandaǵı</strong> háripler
              aldınǵa (yamasa artqa) jılıstırıladı.
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Shifrlaw formulası:
            </h2>
            <div class='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
              E(x) = (x + k) mod m
            </div>
            <ul class='list-disc list-inside text-white mt-3 space-y-1'>
              <li>
                <strong>x</strong> — háriptiń alfavittegi tártip nomeri
              </li>
              <li>
                <strong>k</strong> — jılıstırıw sanı (gilt)
              </li>
              <li>
                <strong>m</strong> — alfavittegi ulıwma háripler sanı
              </li>
            </ul>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Deshifrlaw formulası:
            </h2>
            <div class='bg-gray-100 p-4 rounded-xl text-lg font-mono text-gray-800'>
              D(x) = (x - k + m) mod m
            </div>
            <p class='text-white mt-2'>
              Bul jerde <strong>k</strong> — shifrlawda islteilgen gilt. <br />
              <span class='italic'>mod m</span> borınsha oń nátiyje alıw ushın{' '}
              <strong>+m</strong> qosıladı.
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Mısal:
            </h2>
            <p class='text-white text-lg'>
              Aytayıq, gilt <span class='font-mono'>k = 3</span>, alfavit
              latınsha, yaǵnıy <span class='font-mono'>m = 26</span>. <br />
              <br />
              Sóz: <span class='font-mono'>HELLO</span>
              <br />
              Háriplerdi sanǵa aylandıramız:{' '}
              <span class='font-mono'>H=7, E=4, L=11, L=11, O=14</span>
              <br />
              Shifrlaw: <span class='font-mono'>E(x) = (x + 3) mod 26</span>
              <br />
              Nátiyje: <span class='font-mono'>KHOOR</span>
            </p>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Abzallıqları:
            </h2>
            <ul class='list-disc list-inside text-white space-y-1'>
              <li>Júdá ápiwayı hám tez isleydi</li>
              <li>Qolda da orınlaw múmkin</li>
              <li>Kriptografiyanıń tarıyxıy tiykarlarınan biri</li>
            </ul>

            <h2 class='text-2xl font-semibold text-[#00ff00] mt-6 mb-2'>
              Kenshilikleri:
            </h2>
            <ul class='list-disc list-inside text-white space-y-1'>
              <li>Tek 25 turli gilt bar (latın alfavitinde)</li>
              <li>Statistikalıq analizge júdá ańsat jeńiledi</li>
              <li>Búgingi zamanagóy talaplarǵa juwap bermeydi</li>
            </ul>

            <p class='mt-6 text-sm text-white text-center italic'>
              Bul mısallar latın alfavitine tiykarlanǵan, tap usı usıl menen
              Qaraqalpaq yoki basqa tiller alfavitine maslastırılıwı múmkin (m =
              háripler sanı).
            </p>
          </div>
        </div>
        <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
          <h1 className='text-[22px] text-[#00ff00] my-[20px] text-muted text-center'>
            Tekstti Cezar shifrlaw algoritmi járdeminde shifrlań hám deshifrlań
          </h1>
          <p className='text-center text-[#00ff00] mb-[20px] '>
            Bunda shifrlaw yamasa deshifrlawdıń hár birine bólek funkciya jazıw
            shárt bolmaydı. Tek ǵana berilgen k gilt sanına teris yamasa oń
            mánis beriw jetkilikli.
          </p>
          <form className='flex flex-col gap-[20px]'>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-input'>K sanın kiritiń</label>
              <input
                onChange={(e) => setShift(+e.target.value)}
                id='encryption-input'
                type='number'
                placeholder='K sanın kiritiń'
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
          <div className='mt-[20px] flex justify-end'>
            <button
              onClick={handleEncrypt}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Shifrlaw
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

export default Cezar
