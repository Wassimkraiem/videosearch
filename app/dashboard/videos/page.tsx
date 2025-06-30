"use client"

import { useState } from "react"
import { VideoTable } from "@/components/video-table"
import { VideoGrid } from "@/components/video-grid"
import { VideoFilters } from "@/components/video-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LayoutGrid, List, Search, Plus, Filter, X } from "lucide-react"
import { VideoPlayerModal } from "@/components/video-player-modal"

// Mock video data
const mockVideos = [
  {
    id: "1",
    name: "Product Demo 2024",
    approvalStatus: "approved",
    ownerName: "John Doe",
    service_identifier: "youtube",
    uploadDate: "2024-01-15",
    tags: ["demo", "product", "2024"],
    width: 1920,
    height: 1080,
    dpi: 72,
    smartTags: ["technology", "presentation"],
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "5:32",
    size: "45.2 MB",
    format: "MP4",
  },
  {
    id: "2",
    name: "Marketing Campaign Video",
    approvalStatus: "pending",
    ownerName: "Jane Smith",
    service_identifier: "vimeo",
    uploadDate: "2024-01-14",
    tags: ["marketing", "campaign"],
    width: 1280,
    height: 720,
    dpi: 72,
    smartTags: ["business", "promotion"],
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "3:45",
    size: "32.1 MB",
    format: "MP4",
  },
  {
    id: "3",
    name: "Training Module 1",
    approvalStatus: "approved",
    ownerName: "Mike Johnson",
    service_identifier: "internal",
    uploadDate: "2024-01-13",
    tags: ["training", "education"],
    width: 1920,
    height: 1080,
    dpi: 72,
    smartTags: ["education", "tutorial"],
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "12:18",
    size: "89.5 MB",
    format: "MP4",
  },
  {
    id: "4",
    name: "Company Overview",
    approvalStatus: "rejected",
    ownerName: "Sarah Wilson",
    service_identifier: "youtube",
    uploadDate: "2024-01-12",
    tags: ["company", "overview"],
    width: 1920,
    height: 1080,
    dpi: 72,
    smartTags: ["corporate", "introduction"],
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "8:22",
    size: "67.3 MB",
    format: "MP4",
  },
  {
    id: "5",
    name: "Event Highlights",
    approvalStatus: "draft",
    ownerName: "Tom Brown",
    service_identifier: "external",
    uploadDate: "2024-01-11",
    tags: ["event", "highlights"],
    width: 1280,
    height: 720,
    dpi: 72,
    smartTags: ["event", "compilation"],
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "6:15",
    size: "54.8 MB",
    format: "MP4",
  },
]

export default function VideosPage() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [filteredVideos, setFilteredVideos] = useState(mockVideos)
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = mockVideos.filter(
      (video) =>
        video.name.toLowerCase().includes(query.toLowerCase()) ||
        video.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        video.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    )
    setFilteredVideos(filtered)
  }

  const handleFilterChange = (filters: any) => {
    let filtered = mockVideos

    if (filters.approvalStatus && filters.approvalStatus !== "all") {
      filtered = filtered.filter((video) => video.approvalStatus === filters.approvalStatus)
    }

    if (filters.service && filters.service !== "all") {
      filtered = filtered.filter((video) => video.service_identifier === filters.service)
    }

    if (filters.owner && filters.owner !== "all") {
      filtered = filtered.filter((video) => video.ownerName === filters.owner)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (video) =>
          video.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredVideos(filtered)
  }

  return (
    <div className="flex h-full">
      {/* Collapsible Left Sidebar - Filters */}
      <div className={`${isFilterOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden border-r bg-white`}>
        <div className="w-80 p-6 space-y-6">
          <VideoFilters onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Videos</h1>
              <p className="text-muted-foreground">Manage and search your video library</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              {isFilterOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {viewMode === "table" ? (
            <VideoTable videos={filteredVideos} onVideoSelect={setSelectedVideo} />
          ) : (
            <VideoGrid videos={filteredVideos} onVideoSelect={setSelectedVideo} />
          )}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal video={selectedVideo} isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  )
}
