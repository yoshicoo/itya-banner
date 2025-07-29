'use client'

import { useState } from 'react'
import ImageGenerator from './components/ImageGenerator'

export default function Home() {
  const [url, setUrl] = useState('')
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setProductData(null)

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('データの取得に失敗しました')
      }

      const data = await response.json()
      setProductData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          ふるさと納税返礼品画像生成ツール
        </h1>

        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                まん福の商品URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.manpuku.app/items/12368"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-manpuku-red text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? '取得中...' : '商品情報を取得'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {productData && <ImageGenerator productData={productData} />}
      </div>
    </div>
  )
}

ている自慢作のセット。</p>
            <p>子どもから大人まで楽しい大好きなメニューが揃っています。</p>
            <p>普段のおかずとしても、贈り物としてもおすすめです。</p>
          </div>

          {/* 寄付金額と自治体 */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">寄付金額：</span>
              <span className="font-bold text-lg text-manpuku-red">
                {productData.price || '10,000'}円
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">自治体：</span>
              <span className="text-gray-700">
                {productData.municipality || '鹿児島県出水市'}
              </span>
            </div>
          </div>
        </div>

        {/* 申し込みボタン */}
        <div className="px-4 pb-4">
          <div className="bg-manpuku-red text-white text-center py-3 rounded-md font-bold text-lg">
            3分で申し込み完了 ▶
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
