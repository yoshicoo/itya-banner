import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'URLが必要です' },
        { status: 400 }
      )
    }

    // URLからHTMLを取得
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    })

    // __NEXT_DATA__ スクリプトからデータを抽出
    const match = response.data.match(
      /<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/
    )

    if (match) {
      const data = JSON.parse(match[1])
      const item = data.props?.pageProps?.serverItemDetail

      if (item) {
        const productData = {
          title: item.name || '',
          description: item.description || '',
          price: String(item.donation || ''),
          municipality: item.municipality?.name || '',
          image: item.images?.[0]?.url || null,
          categories: item.itemCategories?.map((c) => c.name).filter(Boolean) || [],
          tags: []
        }

        if (productData.image && productData.image.startsWith('/')) {
          const urlObj = new URL(url)
          productData.image = `${urlObj.origin}${productData.image}`
        }

        return NextResponse.json(productData)
      }
    }

    const cheerio = await import('cheerio')
    const $ = cheerio.load(response.data)

    let productData = {}

    productData.title =
      $('h1.item-title').text().trim() ||
      $('[class*="title"]').first().text().trim() ||
      $('h1').first().text().trim() ||
      $('title').text().replace('【まん福】', '').trim()

    productData.price =
      $('[class*="price"], [class*="amount"]').text().replace(/[^\d]/g, '') ||
      $('.donation-amount').text().replace(/[^\d]/g, '') ||
      '10000'

    productData.municipality =
      $('[class*="municipality"], [class*="city"]').text().trim() ||
      $('.region').text().trim() ||
      '自治体名不明'

    productData.description =
      $('[class*="description"], .item-description').text().trim() ||
      $('meta[name="description"]').attr('content') ||
      ''

    productData.image =
      $('img[class*="item"], img[class*="product"]').first().attr('src') ||
      $('img').not('[src*="logo"], [src*="icon"]').first().attr('src') ||
      null

    if (productData.image && productData.image.startsWith('/')) {
      const urlObj = new URL(url)
      productData.image = `${urlObj.origin}${productData.image}`
    }

    productData.categories = []
    productData.tags = []

    return NextResponse.json(productData)

  } catch (error) {
    console.error('スクレイピングエラー:', error)
    
    // デモ用のサンプルデータを返す
    const sampleData = {
      title: 'マルイの人気冷凍食品の詰め合わせ（6種・計1.5kg超）',
      description: '多くのお客様に愛されている自慢作のセット。子どもから大人まで楽しい大好きなメニューが揃っています。普段のおかずとしても、贈り物としてもおすすめです。',
      price: '10000',
      municipality: '鹿児島県出水市',
      image: null,
      categories: ['冷凍食品', '詰め合わせ'],
      tags: ['簡単調理', '人気商品']
    }

    return NextResponse.json({
      ...sampleData,
      error: 'URLから情報を取得できませんでした。サンプルデータを表示しています。'
    })
  }
}
