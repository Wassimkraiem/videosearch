"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Video {
  id: string
  name: string
  approvalStatus: string
  ownerName: string
  service_identifier: string
  uploadDate: string
  thumbnail: string
  duration?: string
}

interface VideoGridProps {
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

export function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const totalPages = Math.ceil(videos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVideos = videos.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {paginatedVideos.map((video) => (
          <Card
            key={video.id}
            className="cursor-pointer hover:shadow-md transition-all duration-200 group border-0 bg-transparent"
            onClick={() => onVideoSelect(video)}
          >
            <CardContent className="p-0">
              <div className="relative mb-3">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.name}
                  width={320}
                  height={180}
                  className="w-full aspect-video object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl" />
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                    {video.duration}
                  </div>
                )}
                <Badge className={`absolute top-2 left-2 ${getStatusColor(video.approvalStatus)} text-xs`}>
                  {video.approvalStatus}
                </Badge>
              </div>
              <div className="px-1">
                <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {video.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{video.ownerName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>1.2K views</span>
                    <span>•</span>
                    <span>{video.uploadDate}</span>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {video.service_identifier}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, videos.length)} of {videos.length} results
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
    </div>
  )
}
