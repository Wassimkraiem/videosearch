"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"
import Image from "next/image"

interface Video {
  id: string
  name: string
  approvalStatus: string
  ownerName: string
  service_identifier: string
  uploadDate: string
  thumbnail: string
}

interface VideoTableProps {
  videos: Video[]
  onVideoSelect: (video: Video) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    case "draft":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getServiceColor = (service: string) => {
  switch (service) {
    case "youtube":
      return "bg-red-100 text-red-800"
    case "vimeo":
      return "bg-blue-100 text-blue-800"
    case "internal":
      return "bg-purple-100 text-purple-800"
    case "external":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function VideoTable({ videos, onVideoSelect }: VideoTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const itemsPerPage = 10

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedVideos = [...videos].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField as keyof Video]
    const bValue = b[sortField as keyof Video]

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const totalPages = Math.ceil(sortedVideos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVideos = sortedVideos.slice(startIndex, startIndex + itemsPerPage)

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Thumbnail</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-semibold">
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("approvalStatus")} className="h-auto p-0 font-semibold">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("ownerName")} className="h-auto p-0 font-semibold">
                Owner
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("service_identifier")}
                className="h-auto p-0 font-semibold"
              >
                Service
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("uploadDate")} className="h-auto p-0 font-semibold">
                Upload Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedVideos.map((video) => (
            <TableRow key={video.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onVideoSelect(video)}>
              <TableCell>
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.name}
                  width={60}
                  height={40}
                  className="rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{video.name}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(video.approvalStatus)}>{video.approvalStatus}</Badge>
              </TableCell>
              <TableCell>{video.ownerName}</TableCell>
              <TableCell>
                <Badge className={getServiceColor(video.service_identifier)}>{video.service_identifier}</Badge>
              </TableCell>
              <TableCell>{video.uploadDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedVideos.length)} of{" "}
          {sortedVideos.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
