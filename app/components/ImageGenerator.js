'use client'

import { useRef } from 'react'
import Image from 'next/image'
import html2canvas from 'html2canvas'

export default function ImageGenerator({ productData }) {
  const captureRef = useRef(null)

  const downloadImage = async () => {
    if (!captureRef.current) return
    const canvas = await html2canvas(captureRef.current)
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = 'product.png'
    link.click()
  }

  return (
    <div>
      {/* 表示部分 */}
      <div ref={captureRef} className="bg-white p-4 rounded-lg shadow-md w-fit">
        <div className="flex gap-4">
          {productData.image && (
            <Image
              src={productData.image}
              alt={productData.title}
              width={200}
              height={200}
              className="object-cover rounded"
            />
          )}
          <div className="space-y-2 text-sm">
            <h2 className="font-bold text-lg text-gray-800">{productData.title}</h2>
            {productData.description && (
              <p className="text-gray-700 whitespace-pre-wrap">
                {productData.description}
              </p>
            )}
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">寄付金額：</span>
              <span className="font-bold text-manpuku-red">
                {productData.price || '0'}円
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">自治体：</span>
              <span className="text-gray-700">
                {productData.municipality}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ダウンロードボタン */}
      <div className="mt-6 text-center">
        <button
          onClick={downloadImage}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          画像をダウンロード
        </button>
      </div>

      {/* 取得した商品データの表示（デバッグ用） */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">取得した商品データ</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(productData, null, 2)}
        </pre>
      </div>
    </div>
  )
}
