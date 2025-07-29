import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

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

    const $ = cheerio.load(response.data)
    
    // まん福サイト用の抽出ロジック
    let productData = {}

    // タイトルの抽出を試みる
    productData.title = 
      $('h1.item-title').text().trim() ||
      $('[class*="title"]').first().text().trim() ||
      $('h1').first().text().trim() ||
      $('title').text().replace('【まん福】', '').trim()

    // 価格の抽出
    productData.price = 
      $('[class*="price"], [class*="amount"]').text().replace(/[^\d]/g, '') ||
      $('.donation-amount').text().replace(/[^\d]/g, '') ||
      '10000'

    // 自治体名の抽出
    productData.municipality = 
      $('[class*="municipality"], [class*="city"]').text().trim() ||
      $('.region').text().trim() ||
      '自治体名不明'

    // 商品説明の抽出
    productData.description = 
      $('[class*="description"], .item-description').text().trim() ||
      $('meta[name="description"]').attr('content') ||
      ''

    // 画像の抽取
    productData.image = 
      $('img[class*="item"], img[class*="product"]').first().attr('src') ||
      $('img').not('[src*="logo"], [src*="icon"]').first().attr('src') ||
      null

    // 画像URLが相対パスの場合は絶対パスに変換
    if (productData.image && productData.image.startsWith('/')) {
      const urlObj = new URL(url)
      productData.image = `${urlObj.origin}${productData.image}`
    }

    // カテゴリやタグの抽出
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
