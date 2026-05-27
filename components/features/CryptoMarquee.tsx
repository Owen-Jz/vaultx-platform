'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface CoinData {
  symbol: string
  displaySymbol: string
  price: number
  changePercent: number
}

const SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'DOTUSDT', 'MATICUSDT']

const DISPLAY_MAP: Record<string, string> = {
  BTCUSDT: 'BTC',
  ETHUSDT: 'ETH',
  BNBUSDT: 'BNB',
  SOLUSDT: 'SOL',
  XRPUSDT: 'XRP',
  ADAUSDT: 'ADA',
  DOTUSDT: 'DOT',
  MATICUSDT: 'MATIC',
}

const FALLBACK_DATA: CoinData[] = [
  { symbol: 'BTCUSDT', displaySymbol: 'BTC', price: 67420.5, changePercent: 1.24 },
  { symbol: 'ETHUSDT', displaySymbol: 'ETH', price: 3512.8, changePercent: -0.87 },
  { symbol: 'BNBUSDT', displaySymbol: 'BNB', price: 612.3, changePercent: 0.53 },
  { symbol: 'SOLUSDT', displaySymbol: 'SOL', price: 178.9, changePercent: 2.11 },
  { symbol: 'XRPUSDT', displaySymbol: 'XRP', price: 2.34, changePercent: -1.02 },
  { symbol: 'ADAUSDT', displaySymbol: 'ADA', price: 0.512, changePercent: 0.78 },
  { symbol: 'DOTUSDT', displaySymbol: 'DOT', price: 8.92, changePercent: -0.44 },
  { symbol: 'MATICUSDT', displaySymbol: 'MATIC', price: 0.874, changePercent: 1.67 },
]

function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 1) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 })
  } else {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 4 })
  }
}

export default function CryptoMarquee() {
  const [coins, setCoins] = useState<CoinData[]>(FALLBACK_DATA)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const symbolsParam = JSON.stringify(SYMBOLS)
        const response = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbolsParam)}`
        )
        const data = response.data as Array<{
          symbol: string
          lastPrice: string
          priceChangePercent: string
        }>
        const parsed: CoinData[] = data.map((item) => ({
          symbol: item.symbol,
          displaySymbol: DISPLAY_MAP[item.symbol] ?? item.symbol.replace('USDT', ''),
          price: parseFloat(item.lastPrice),
          changePercent: parseFloat(item.priceChangePercent),
        }))
        setCoins(parsed)
      } catch {
        // keep fallback data
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  const duplicated = [...coins, ...coins, ...coins, ...coins]

  return (
    <div className="w-full overflow-hidden bg-bg-secondary border-y border-border-default py-3 group">
      <div
        className="inline-flex whitespace-nowrap"
        style={{ animation: 'marquee 30s linear infinite' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
      >
        {duplicated.map((coin, i) => (
          <span
            key={`${coin.symbol}-${i}`}
            className="inline-flex items-center gap-2 mx-8 text-sm font-medium"
          >
            <span className="text-text-primary font-semibold">{coin.displaySymbol}</span>
            <span className="text-text-secondary">{formatPrice(coin.price)}</span>
            <span
              className={coin.changePercent >= 0 ? 'text-status-success' : 'text-status-danger'}
            >
              {coin.changePercent >= 0 ? '+' : ''}{coin.changePercent.toFixed(2)}%
            </span>
            <span className="text-border-default mx-2">|</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
