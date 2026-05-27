'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface TradingPair {
  label: string
  symbol: string
}

const PAIRS: TradingPair[] = [
  { label: 'BTC / USDT', symbol: 'BTCUSDT' },
  { label: 'ETH / USDT', symbol: 'ETHUSDT' },
  { label: 'BNB / USDT', symbol: 'BNBUSDT' },
  { label: 'SOL / USDT', symbol: 'SOLUSDT' },
]

interface LiveData {
  price: string
  change: string
  isPositive: boolean
  volume: string
  high: string
  low: string
}

export default function TradingChart() {
  const [selectedPair, setSelectedPair] = useState<TradingPair>(PAIRS[0])
  const [liveData, setLiveData] = useState<LiveData | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch live price data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedPair.symbol}`
        )
        const d = res.data
        const price = parseFloat(d.lastPrice)
        const changePercent = parseFloat(d.priceChangePercent)
        setLiveData({
          price: price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: price < 1 ? 4 : 2,
          }),
          change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
          isPositive: changePercent >= 0,
          volume: `${parseFloat(d.volume).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
          high: parseFloat(d.highPrice).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          }),
          low: parseFloat(d.lowPrice).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          }),
        })
      } catch {
        // ignore
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [selectedPair])

  // Load TradingView advanced chart
  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${selectedPair.symbol}`,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: '#0A0C10',
      gridColor: '#2A2D35',
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: false,
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [selectedPair])

  return (
    <div className="bg-bg-card rounded-2xl border border-border-default overflow-hidden">
      {/* Header / Pair selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-border-default">
        <div className="flex items-center gap-3">
          {/* Pair buttons */}
          <div className="flex gap-2 flex-wrap">
            {PAIRS.map((pair) => (
              <button
                key={pair.symbol}
                onClick={() => setSelectedPair(pair)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedPair.symbol === pair.symbol
                    ? 'bg-accent-gold text-bg-primary'
                    : 'bg-bg-elevated text-text-secondary hover:text-text-primary border border-border-default'
                }`}
              >
                {pair.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live price */}
        {liveData && (
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-bold text-text-primary">
              {liveData.price}
            </span>
            <span
              className={`text-sm font-semibold ${
                liveData.isPositive ? 'text-status-success' : 'text-status-danger'
              }`}
            >
              {liveData.change}
            </span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ height: '480px', width: '100%' }}
      />

      {/* Stats bar */}
      {liveData && (
        <div className="grid grid-cols-3 divide-x divide-border-default border-t border-border-default">
          <div className="px-5 py-4">
            <p className="text-text-muted text-xs mb-1">24h High</p>
            <p className="text-text-primary text-sm font-semibold">{liveData.high}</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-text-muted text-xs mb-1">24h Low</p>
            <p className="text-text-primary text-sm font-semibold">{liveData.low}</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-text-muted text-xs mb-1">24h Volume</p>
            <p className="text-text-primary text-sm font-semibold">{liveData.volume}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="px-5 py-4 border-t border-border-default flex items-center justify-between gap-4 flex-wrap">
        <p className="text-text-muted text-sm">
          Charts powered by TradingView. Data from Binance.
        </p>
        <Link
          href="/auth/signup"
          className="text-accent-gold hover:text-accent-gold/80 text-sm font-semibold transition-colors"
        >
          Create an account to start trading &rarr;
        </Link>
      </div>
    </div>
  )
}
