'use client'

import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card } from '@/components/ui'
import { TrendingUp, TrendingDown } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const GOLD = '#C9A85C'
const GOLD_FADED = 'rgba(201,168,92,0.12)'
const BTC_COLOR = '#F7931A'
const BTC_FADED = 'rgba(247,147,26,0.10)'
const GRID_COLOR = '#2A2D35'

// Generate seeded mock portfolio data (starts at ~100, grows each month)
function generatePortfolioData(): number[] {
  let value = 100
  return MONTHS.map(() => {
    value = value * (1 + (Math.random() * 0.12 - 0.02))
    return Math.round(value * 100) / 100
  })
}

// Generate seeded BTC price data (scaled 0–100 range for overlay)
function generateBtcData(): number[] {
  let value = 60000
  return MONTHS.map(() => {
    value = value * (1 + (Math.random() * 0.15 - 0.04))
    return Math.round(value)
  })
}

const portfolioData = generatePortfolioData()
const btcData = generateBtcData()

type TabType = 'portfolio' | 'btc'

export default function ChartPage() {
  const [activeTab, setActiveTab] = useState<TabType>('portfolio')

  const chartData = useMemo(() => {
    if (activeTab === 'portfolio') {
      return {
        labels: MONTHS,
        datasets: [
          {
            label: 'Portfolio Value (Index)',
            data: portfolioData,
            borderColor: GOLD,
            backgroundColor: GOLD_FADED,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: GOLD,
            pointBorderColor: '#1A1C22',
            pointBorderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      }
    }
    return {
      labels: MONTHS,
      datasets: [
        {
          label: 'BTC Price (USD)',
          data: btcData,
          borderColor: BTC_COLOR,
          backgroundColor: BTC_FADED,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: BTC_COLOR,
          pointBorderColor: '#1A1C22',
          pointBorderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    }
  }, [activeTab])

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#1E2028',
          titleColor: '#C9A85C',
          bodyColor: '#A0A4B0',
          borderColor: '#2A2D35',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx: { parsed: { y: number } }) => {
              const val = ctx.parsed.y
              return activeTab === 'btc'
                ? ` $${val.toLocaleString()}`
                : ` ${val.toFixed(2)} index pts`
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: GRID_COLOR,
          },
          ticks: {
            color: '#A0A4B0',
            font: { size: 12 },
          },
        },
        y: {
          grid: {
            color: GRID_COLOR,
          },
          ticks: {
            color: '#A0A4B0',
            font: { size: 12 },
            callback: (value: string | number) => {
              const num = Number(value)
              return activeTab === 'btc' ? `$${num.toLocaleString()}` : `${num.toFixed(0)}`
            },
          },
        },
      },
    }),
    [activeTab],
  )

  const startVal = activeTab === 'portfolio' ? portfolioData[0] : btcData[0]
  const endVal =
    activeTab === 'portfolio'
      ? portfolioData[portfolioData.length - 1]
      : btcData[btcData.length - 1]
  const change = ((endVal - startVal) / startVal) * 100
  const isUp = change >= 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-text-primary">Portfolio Chart</h1>
        <p className="text-text-muted text-sm mt-1">12-month performance overview</p>
      </div>

      <Card variant="default">
        {/* Tab switcher + summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-1 bg-bg-primary rounded-lg p-1 w-fit">
            {(['portfolio', 'btc'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-bg-elevated text-text-primary shadow-sm'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tab === 'portfolio' ? 'Portfolio Value' : 'BTC Price'}
              </button>
            ))}
          </div>

          {/* Mini stat */}
          <div className="flex items-center gap-3 bg-bg-elevated px-4 py-2.5 rounded-lg border border-border-default">
            <div>
              <p className="text-text-muted text-xs mb-0.5">12-month change</p>
              <p
                className={`font-mono font-bold text-lg ${
                  isUp ? 'text-status-success' : 'text-status-danger'
                }`}
              >
                {isUp ? '+' : ''}
                {change.toFixed(2)}%
              </p>
            </div>
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isUp ? 'bg-status-success/10' : 'bg-status-danger/10'
              }`}
            >
              {isUp ? (
                <TrendingUp className="w-5 h-5 text-status-success" />
              ) : (
                <TrendingDown className="w-5 h-5 text-status-danger" />
              )}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80 w-full">
          <Line data={chartData} options={chartOptions as Parameters<typeof Line>[0]['options']} />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border-default">
          <span
            className="inline-block w-8 h-0.5 rounded"
            style={{ backgroundColor: activeTab === 'portfolio' ? GOLD : BTC_COLOR }}
          />
          <span className="text-text-muted text-sm">
            {activeTab === 'portfolio' ? 'Portfolio Value Index (last 12 months)' : 'BTC/USD Price (last 12 months)'}
          </span>
        </div>
      </Card>
    </div>
  )
}
