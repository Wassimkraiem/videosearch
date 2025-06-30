"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"

interface VideoFiltersProps {
  onFilterChange: (filters: any) => void
}

export function VideoFilters({ onFilterChange }: VideoFiltersProps) {
  const [filters, setFilters] = useState({
    approvalStatus: "all",
    service: "all",
    owner: "all",
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
    tags: "",
    minWidth: "",
    maxWidth: "",
    minHeight: "",
    maxHeight: "",
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      approvalStatus: "all",
      service: "all",
      owner: "all",
      dateFrom: null,
      dateTo: null,
      tags: "",
      minWidth: "",
      maxWidth: "",
      minHeight: "",
      maxHeight: "",
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.approvalStatus} onValueChange={(value) => handleFilterChange("approvalStatus", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Service</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.service} onValueChange={(value) => handleFilterChange("service", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="vimeo">Vimeo</SelectItem>
              <SelectItem value="internal">Internal</SelectItem>
              <SelectItem value="external">External</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Owner</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.owner} onValueChange={(value) => handleFilterChange("owner", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="John Doe">John Doe</SelectItem>
              <SelectItem value="Jane Smith">Jane Smith</SelectItem>
              <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
              <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
              <SelectItem value="Tom Brown">Tom Brown</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Upload Date</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs">From</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateFrom}
                  onSelect={(date) => handleFilterChange("dateFrom", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className="text-xs">To</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateTo ? format(filters.dateTo, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateTo}
                  onSelect={(date) => handleFilterChange("dateTo", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter tags..."
            value={filters.tags}
            onChange={(e) => handleFilterChange("tags", e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Dimensions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Min Width</Label>
              <Input
                type="number"
                placeholder="px"
                value={filters.minWidth}
                onChange={(e) => handleFilterChange("minWidth", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Max Width</Label>
              <Input
                type="number"
                placeholder="px"
                value={filters.maxWidth}
                onChange={(e) => handleFilterChange("maxWidth", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Min Height</Label>
              <Input
                type="number"
                placeholder="px"
                value={filters.minHeight}
                onChange={(e) => handleFilterChange("minHeight", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Max Height</Label>
              <Input
                type="number"
                placeholder="px"
                value={filters.maxHeight}
                onChange={(e) => handleFilterChange("maxHeight", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
