"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  Flag,
  Eye,
  Calendar,
  User,
  Monitor,
  Clock,
  Tag,
  Zap,
  FileText,
  Camera,
  Mic,
  Palette,
  Database,
  Globe,
  Shield,
  Activity,
} from "lucide-react"
import Image from "next/image"

interface VideoPlayerModalProps {
  video: any
  isOpen: boolean
  onClose: () => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getServiceColor = (service: string) => {
  switch (service) {
    case "youtube":
      return "bg-red-50 text-red-700 border-red-200"
    case "vimeo":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "internal":
      return "bg-purple-50 text-purple-700 border-purple-200"
    case "external":
      return "bg-orange-50 text-orange-700 border-orange-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

export function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
  if (!video) return null

  // Extended mock data for demonstration
  const extendedVideoData = {
    ...video,
    description:
      "This is a comprehensive video description that explains the content, purpose, and context of the video. It may contain multiple paragraphs with detailed information about what viewers can expect to see.",
    category: "Education",
    language: "English",
    subtitles: ["English", "Spanish", "French"],
    chapters: [
      { title: "Introduction", timestamp: "0:00" },
      { title: "Main Content", timestamp: "2:15" },
      { title: "Demonstration", timestamp: "5:30" },
      { title: "Conclusion", timestamp: "8:45" },
    ],
    metadata: {
      codec: "H.264",
      bitrate: "5000 kbps",
      framerate: "30 fps",
      audioCodec: "AAC",
      audioBitrate: "128 kbps",
      colorSpace: "sRGB",
      aspectRatio: "16:9",
    },
    analytics: {
      views: 1234,
      likes: 89,
      dislikes: 3,
      comments: 45,
      shares: 12,
      avgWatchTime: "4:32",
      retention: "78%",
    },
    permissions: {
      canDownload: true,
      canShare: true,
      canEmbed: false,
      visibility: "Public",
    },
    history: [
      { action: "Uploaded", date: "2024-01-15 10:30", user: "John Doe" },
      { action: "Approved", date: "2024-01-15 14:20", user: "Admin" },
      { action: "Published", date: "2024-01-15 15:00", user: "System" },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
        <div className="flex h-full">
          {/* Left side - Video Player */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center">
              <div className="relative w-full h-full max-w-4xl max-h-[60vh] bg-gray-900 rounded-lg flex items-center justify-center">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.name}
                  width={800}
                  height={450}
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Scrollable Video Details */}
          <div className="w-96 bg-white border-l">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {/* All the existing content stays the same */}
                {/* Video Title and Status */}
                <div className="space-y-3">
                  <h1 className="text-xl font-bold leading-tight">{video.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(video.approvalStatus)}>
                      {video.approvalStatus.charAt(0).toUpperCase() + video.approvalStatus.slice(1)}
                    </Badge>
                    <Badge className={getServiceColor(video.service_identifier)}>
                      {video.service_identifier.charAt(0).toUpperCase() + video.service_identifier.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {extendedVideoData.analytics.likes}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    {extendedVideoData.analytics.dislikes}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <Separator />

                {/* Video Stats */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{extendedVideoData.analytics.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{video.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{video.uploadDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{video.ownerName}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t">
                      <div>
                        <span className="text-muted-foreground">Avg. Watch Time:</span>
                        <p className="font-medium">{extendedVideoData.analytics.avgWatchTime}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Retention:</span>
                        <p className="font-medium">{extendedVideoData.analytics.retention}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{extendedVideoData.description}</p>
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge variant="outline">{extendedVideoData.category}</Badge>
                        <span className="text-muted-foreground">Language:</span>
                        <Badge variant="outline">{extendedVideoData.language}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Details */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Technical Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Resolution:</span>
                        <p className="font-medium">
                          {video.width} × {video.height}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Format:</span>
                        <p className="font-medium">{video.format}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size:</span>
                        <p className="font-medium">{video.size}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">DPI:</span>
                        <p className="font-medium">{video.dpi}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Video:</span>
                        <span>
                          {extendedVideoData.metadata.codec} • {extendedVideoData.metadata.bitrate} •{" "}
                          {extendedVideoData.metadata.framerate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mic className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Audio:</span>
                        <span>
                          {extendedVideoData.metadata.audioCodec} • {extendedVideoData.metadata.audioBitrate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Color:</span>
                        <span>
                          {extendedVideoData.metadata.colorSpace} • {extendedVideoData.metadata.aspectRatio}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chapters */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Chapters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {extendedVideoData.chapters.map((chapter, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50 cursor-pointer"
                        >
                          <span>{chapter.title}</span>
                          <span className="text-muted-foreground font-mono">{chapter.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-xs text-muted-foreground mb-2 block">Manual Tags</span>
                      <div className="flex flex-wrap gap-1">
                        {video.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground mb-2 block flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Smart Tags
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {video.smartTags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Permissions */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Permissions & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>Visibility: {extendedVideoData.permissions.visibility}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>Download: {extendedVideoData.permissions.canDownload ? "Allowed" : "Restricted"}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Subtitles:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {extendedVideoData.subtitles.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* History */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Activity History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {extendedVideoData.history.map((event, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="font-medium">{event.action}</p>
                            <p className="text-muted-foreground text-xs">
                              {event.date} • by {event.user}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Actions */}
                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report Video
                  </Button>
                </div>

                {/* Add some bottom padding for better scrolling */}
                <div className="pb-6"></div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
