"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Download, Edit, Trash2, Share, Eye } from "lucide-react"
import Image from "next/image"

interface VideoDetailProps {
  video: any
  onClose: () => void
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

export function VideoDetail({ video, onClose }: VideoDetailProps) {
  return (
    <div className="w-96 border-l bg-white h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Video Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Thumbnail */}
        <div className="relative">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.name}
            width={400}
            height={225}
            className="w-full rounded-lg object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Name</label>
              <p className="text-sm">{video.name}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge className={getStatusColor(video.approvalStatus)}>{video.approvalStatus}</Badge>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Owner</label>
              <p className="text-sm">{video.ownerName}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Service</label>
              <p className="text-sm capitalize">{video.service_identifier}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Upload Date</label>
              <p className="text-sm">{video.uploadDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Technical Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Width</label>
                <p className="text-sm">{video.width}px</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Height</label>
                <p className="text-sm">{video.height}px</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">DPI</label>
                <p className="text-sm">{video.dpi}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Format</label>
                <p className="text-sm">{video.format}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Duration</label>
                <p className="text-sm">{video.duration}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Size</label>
                <p className="text-sm">{video.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Manual Tags</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {video.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Smart Tags</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {video.smartTags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-sm text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" size="sm" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Video
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
