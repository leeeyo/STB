"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

interface ReclamationRow {
  row_index: number
  inquiry_description: string
  feedback: string
  canal: string
  nature?: string
}

export default function OthersChannelPage() {
  const [rows, setRows] = useState<ReclamationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:8000/all-rapports")
      .then(res => {
        const allRows = res.data.donnees || []
        const filtered = allRows.filter((row: ReclamationRow) => row.canal && row.canal.trim().toLowerCase() === "autres")
        setRows(filtered)
        setLoading(false)
      })
      .catch(() => {
        setError("Erreur lors du chargement des données.")
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Chargement...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Réclamations - Autres Canaux</h1>
      {rows.length === 0 && <div>Aucune réclamation trouvée pour ce canal.</div>}
      {rows.map(row => (
        <Card key={row.row_index}>
          <CardHeader>
            <CardTitle>Réclamation #{row.row_index + 1}</CardTitle>
            {row.nature && <CardDescription>Nature: {row.nature}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div>
              <strong>Demande:</strong> {row.inquiry_description}
            </div>
            <div>
              <strong>Feedback:</strong> {row.feedback}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 