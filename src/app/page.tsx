"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "recharts"
import { AlertTriangle, Smartphone, Monitor, CreditCard, Wifi, Sparkles } from "lucide-react"
import { Tooltip as ReactTooltip } from "react-tooltip"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

// Types for analytics
interface Analytics {
  total_reclamations: number
  par_canal: Record<string, number>
  par_nature: Record<string, number>
  par_gravite: Record<string, number>
}

interface ChannelDatum {
  name: string
  complaints: number
  percentage: string | number
  color: string
}
interface ComplaintType {
  name: string
  count: number
  severity: "high" | "medium" | "low"
}
interface GraviteDatum {
  name: string
  count: number
  color: string
}

// Simulated data for missing analytics
const simulatedKPIs = {
  resolved: 6,
  pending: 2,
  avgResolution: 2.3,
  satisfaction: 87.5,
  growth: -12.4,
}
const simulatedTrends = [
  { month: "Jan", claims: 12, resolved: 10, satisfaction: 85 },
  { month: "Fév", claims: 15, resolved: 13, satisfaction: 87 },
  { month: "Mar", claims: 18, resolved: 15, satisfaction: 84 },
  { month: "Avr", claims: 20, resolved: 18, satisfaction: 88 },
  { month: "Mai", claims: 17, resolved: 15, satisfaction: 89 },
  { month: "Jun", claims: 19, resolved: 17, satisfaction: 86 },
  { month: "Jul", claims: 21, resolved: 19, satisfaction: 87 },
  { month: "Aoû", claims: 20, resolved: 18, satisfaction: 90 },
  { month: "Sep", claims: 16, resolved: 15, satisfaction: 88 },
  { month: "Oct", claims: 14, resolved: 13, satisfaction: 91 },
]
const simulatedPerformance = [
  { channel: "App Mobile", resolved: 4, avgTime: 1.8, satisfaction: 92 },
  { channel: "Internet Banking", resolved: 3, avgTime: 2.1, satisfaction: 89 },
  { channel: "GAB/ATM", resolved: 2, avgTime: 2.0, satisfaction: 91 },
  { channel: "Autres", resolved: 1, avgTime: 2.8, satisfaction: 85 },
]

export default function ComplaintsDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analytics, setAnalytics] = useState<Analytics | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // Fetch from local JSON first
    fetch("/analytics-db.json")
      .then(res => res.json())
      .then(localData => {
        // Then fetch from API
        axios.get("http://localhost:8000/all-rapports")
          .then(apiRes => {
            // Merge: API data on top of local JSON data
            const merged = {
              ...localData.rapport_analytique,
              ...apiRes.data.rapport_analytique,
              // For nested objects, merge deeply
              par_canal: {
                ...localData.rapport_analytique?.par_canal,
                ...apiRes.data.rapport_analytique?.par_canal,
              },
              par_nature: {
                ...localData.rapport_analytique?.par_nature,
                ...apiRes.data.rapport_analytique?.par_nature,
              },
              par_gravite: {
                ...localData.rapport_analytique?.par_gravite,
                ...apiRes.data.rapport_analytique?.par_gravite,
              },
            }
            setAnalytics(merged)
            setLoading(false)
          })
          .catch(() => {
            // If API fails, just use local JSON
            setAnalytics(localData.rapport_analytique)
            setLoading(false)
          })
      })
      .catch(() => {
        setError("Erreur lors du chargement des données locales.")
        setLoading(false)
      })
  }, [])

  // Helper to get KPI values
  const kpiData = analytics ? {
    totalComplaints: analytics.total_reclamations,
    resolved: simulatedKPIs.resolved, // simulated
    pending: simulatedKPIs.pending, // simulated
    avgResolution: simulatedKPIs.avgResolution, // simulated
    satisfaction: simulatedKPIs.satisfaction, // simulated
    growth: simulatedKPIs.growth, // simulated
  } : null

  // Channel data for PieChart
  const channelData: ChannelDatum[] = analytics ? Object.entries(analytics.par_canal).map(([name, complaints], i) => ({
    name,
    complaints,
    percentage: analytics.total_reclamations ? ((complaints as number) * 100 / analytics.total_reclamations).toFixed(1) : 0,
    color: COLORS[i % COLORS.length],
  })) : []

  // Complaint types (nature)
  const complaintTypes: ComplaintType[] = analytics ? Object.entries(analytics.par_nature).map(([name, count]) => ({
    name,
    count,
    severity: name.toLowerCase().includes("critique") ? "high" : name.toLowerCase().includes("moyen") ? "medium" : "low",
  })) : []

  // Gravité breakdown
  const graviteData: GraviteDatum[] = analytics ? Object.entries(analytics.par_gravite).map(([name, count], i) => ({
    name,
    count,
    color: COLORS[i % COLORS.length],
  })) : []

  // Trends (simulated)
  const trendsData = simulatedTrends

  // Performance (simulated)
  const performanceData = simulatedPerformance

  // Helper for simulated value indicator
  const SimIcon = () => (
    <span style={{ color: '#a3a3a3', marginLeft: 4, verticalAlign: 'middle', cursor: 'pointer' }} data-tooltip-id="sim-tooltip">
      <Sparkles size={16} />
    </span>
  )

  if (loading) return <div className="p-6">Chargement des données...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <div className="p-6 space-y-6">
      <ReactTooltip id="sim-tooltip" place="top" content="Valeur estimée" />
      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Réclamations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData?.totalComplaints?.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Résolues <SimIcon /></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpiData?.resolved}</div>
            <p className="text-xs text-gray-600">Estimation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours <SimIcon /></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{kpiData?.pending}</div>
            <p className="text-xs text-gray-600">Estimation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Délai Moyen <SimIcon /></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData?.avgResolution}j</div>
            <p className="text-xs text-gray-600">Estimation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction <SimIcon /></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{kpiData?.satisfaction}%</div>
            <p className="text-xs text-gray-600">Estimation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Évolution <SimIcon /></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpiData?.growth}%</div>
            <p className="text-xs text-gray-600">Estimation</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="channels">Canaux</TabsTrigger>
          <TabsTrigger value="analysis">Analyse</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Répartition par canal */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Canal Digital</CardTitle>
                <CardDescription>Distribution des réclamations par canal</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="complaints"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Types de réclamations */}
            <Card>
              <CardHeader>
                <CardTitle>Types de Réclamations</CardTitle>
                <CardDescription>Classification par nature du problème</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaintTypes.map((type, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="text-sm font-medium">{type.name}</span>
                        <Badge
                          variant={
                            type.severity === "high"
                              ? "destructive"
                              : type.severity === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {type.severity === "high" ? "Critique" : type.severity === "medium" ? "Moyen" : "Faible"}
                        </Badge>
                      </div>
                      <span className="text-sm font-bold">{type.count as React.ReactNode}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {channelData.map((channel, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {channel.name === "App Mobile" && <Smartphone className="h-5 w-5" />}
                    {channel.name === "Internet Banking" && <Monitor className="h-5 w-5" />}
                    {channel.name === "GAB/ATM" && <CreditCard className="h-5 w-5" />}
                    {channel.name === "Autres" && <Wifi className="h-5 w-5" />}
                    {channel.name}
                  </CardTitle>
                  <CardDescription>
                    {channel.complaints as React.ReactNode} réclamations ({channel.percentage}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Volume</span>
                      <span className="font-medium">{channel.complaints as React.ReactNode}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${channel.percentage}%`,
                          backgroundColor: channel.color,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance par Canal <SimIcon /></CardTitle>
              <CardDescription>Indicateurs de performance par canal digital</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Canal</th>
                      <th className="text-left p-2">Réclamations Résolues</th>
                      <th className="text-left p-2">Délai Moyen (jours)</th>
                      <th className="text-left p-2">Satisfaction (%)</th>
                      <th className="text-left p-2">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{row.channel}</td>
                        <td className="p-2">{row.resolved}</td>
                        <td className="p-2">{row.avgTime}</td>
                        <td className="p-2">{row.satisfaction}%</td>
                        <td className="p-2">
                          <Badge
                            variant={
                              row.satisfaction >= 90
                                ? "default"
                                : row.satisfaction >= 85
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {row.satisfaction >= 90 ? "Excellent" : row.satisfaction >= 85 ? "Bon" : "À améliorer"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="resolved" fill="#3b82f6" name="Réclamations Résolues" />
                  <Bar dataKey="avgTime" fill="#10b981" name="Délai Moyen (j)" />
                  <Bar dataKey="satisfaction" fill="#f59e0b" name="Satisfaction (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendances Mensuelles <SimIcon /></CardTitle>
              <CardDescription>Évolution des réclamations et résolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="claims" stroke="#ef4444" name="Réclamations" />
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" name="Résolues" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Satisfaction Client <SimIcon /></CardTitle>
              <CardDescription>Évolution du taux de satisfaction</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="satisfaction" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gravité des Réclamations</CardTitle>
              <CardDescription>Répartition par gravité</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={graviteData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, count }) => `${name}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {graviteData.map((entry, index) => (
                      <Cell key={`cell-grav-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
