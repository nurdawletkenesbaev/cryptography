import React, { useState, useRef } from 'react'

// Helper to convert text to binary string
const textToBinary = (text) => {
  return (
    text
      .split('')
      .map((char) => {
        const bin = char.charCodeAt(0).toString(2)
        return bin.padStart(8, '0')
      })
      .join('') + '00000000'
  ) // Terminator
}

// Helper to convert binary string to text
const binaryToText = (binary) => {
  const bytes = binary.match(/.{1,8}/g) || []
  let result = ''
  for (let byte of bytes) {
    if (byte === '00000000') break
    result += String.fromCharCode(parseInt(byte, 2))
  }
  return result
}

export default function SteganographyApp() {
  const [originalImg, setOriginalImg] = useState(null)
  const [hiddenText, setHiddenText] = useState('')
  const [stegoUrl, setStegoUrl] = useState(null)
  const [extracted, setExtracted] = useState('')
  const canvasRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => setOriginalImg(reader.result)
    if (file) reader.readAsDataURL(file)
  }

  const embedText = () => {
    if (!originalImg) return alert('Rasm yuklanmagan!')
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width
      canvas.height = img.height
      // Enable willReadFrequently for multiple getImageData calls
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const binText = textToBinary(hiddenText)
      let data = imgData.data
      let idx = 0
      for (let i = 0; i < data.length && idx < binText.length; i++) {
        if ((i + 1) % 4 !== 0) {
          data[i] = (data[i] & ~1) | parseInt(binText[idx], 10)
          idx++
        }
      }
      ctx.putImageData(imgData, 0, 0)
      setStegoUrl(canvas.toDataURL('image/png'))
    }
    img.src = originalImg
  }

  const extractText = () => {
    if (!stegoUrl) return alert('Stego-rasm mavjud emas!')
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let data = imgData.data
      let bits = ''
      for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 4 !== 0) {
          bits += (data[i] & 1).toString()
        }
      }
      setExtracted(binaryToText(bits))
    }
    img.src = stegoUrl
  }

  return (
    <div className='p-4 max-w-lg mx-auto text-white'>
      <h1 className='text-xl text-white font-bold mb-4'>
        LSB Steganography in React
      </h1>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='mb-2'
      />
      {originalImg && <img src={originalImg} alt='Original' className='mb-2' />}
      <textarea
        rows={3}
        value={hiddenText}
        onChange={(e) => setHiddenText(e.target.value)}
        placeholder="Yashirmoqchi bo'lgan matn"
        className='w-full border p-2 mb-2'
      />
      <button
        onClick={embedText}
        className='px-4 py-2 bg-blue-600 text-white rounded mb-2 hover:bg-blue-700'
      >
        Yashirish
      </button>
      {stegoUrl && (
        <>
          <img src={stegoUrl} alt='Stego' className='mb-2' />
          <a
            href={stegoUrl}
            download='stego.png'
            className='block mb-2 text-blue-600'
          >
            Rasmni yuklab olish
          </a>
          <button
            onClick={extractText}
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          >
            Matnni olish
          </button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {extracted && (
        <p className='mt-2'>
          <strong>Olingan matn:</strong> {extracted}
        </p>
      )}
    </div>
  )
}
