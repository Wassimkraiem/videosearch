"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Video, Users, CheckCircle, Clock, Eye } from "lucide-react"

const approvalStatusData = [
  { name: "Approved", value: 45, color: "#22c55e" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Rejected", value: 15, color: "#ef4444" },
  { name: "Draft", value: 15, color: "#6b7280" },
]

const serviceData = [
  { name: "YouTube", count: 35 },
  { name: "Vimeo", count: 28 },
  { name: "Internal", count: 22 },
  { name: "External", count: 15 },
]

const stats = [
  {
    title: "Total Videos",
    value: "1,234",
    change: "+12%",
    icon: Video,
    color: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "89",
    change: "+5%",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Approved",
    value: "892",
    change: "+8%",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    title: "Pending Review",
    value: "156",
    change: "-3%",
    icon: Clock,
    color: "text-orange-600",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your video management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                {" from last month"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Approval Status Distribution</CardTitle>
            <CardDescription>Breakdown of video approval statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                approved: { label: "Approved", color: "#22c55e" },
                pending: { label: "Pending", color: "#f59e0b" },
                rejected: { label: "Rejected", color: "#ef4444" },
                draft: { label: "Draft", color: "#6b7280" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={approvalStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {approvalStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Videos by Service</CardTitle>
            <CardDescription>Distribution of videos across different services</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Videos", color: "#3b82f6" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes to your videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Video approved",
                video: "Product Demo 2024",
                user: "John Doe",
                time: "2 minutes ago",
                icon: CheckCircle,
                color: "text-green-600",
              },
              {
                action: "New video uploaded",
                video: "Marketing Campaign",
                user: "Jane Smith",
                time: "15 minutes ago",
                icon: Video,
                color: "text-blue-600",
              },
              {
                action: "Video viewed",
                video: "Training Module 1",
                user: "Mike Johnson",
                time: "1 hour ago",
                icon: Eye,
                color: "text-purple-600",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.action}: {activity.video}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
