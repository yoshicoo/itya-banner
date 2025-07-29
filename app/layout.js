import './globals.css'

export const metadata = {
  title: 'ふるさと納税返礼品画像生成ツール',
  description: 'まん福のふるさと納税返礼品から画像を自動生成',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="font-japanese">{children}</body>
    </html>
  )
}
