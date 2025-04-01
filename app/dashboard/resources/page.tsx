"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, FileText, Video, HelpCircle } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Resources</h1>
        <Button className="bg-terrabit-600 hover:bg-terrabit-700">
          <HelpCircle className="mr-2 h-4 w-4" />
          Get Help
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Guides</CardTitle>
            <Book className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">15</div>
            <p className="text-xs text-terrabit-400">Available guides</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Documents</CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28</div>
            <p className="text-xs text-terrabit-400">Technical docs</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Videos</CardTitle>
            <Video className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">42</div>
            <p className="text-xs text-terrabit-400">Tutorial videos</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Support</CardTitle>
            <HelpCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24/7</div>
            <p className="text-xs text-terrabit-400">Available support</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Featured Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-terrabit-800/50">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-terrabit-700">
                    <Book className="h-6 w-6 text-terrabit-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Getting Started Guide</h3>
                    <p className="text-sm text-terrabit-400 mt-1">Learn the basics of using our digital farming platform</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-terrabit-400">Last updated: 2 days ago</span>
                      <Button variant="outline" size="sm" className="border-terrabit-700 text-white hover:bg-terrabit-800">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-terrabit-800/50">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-terrabit-700">
                    <Video className="h-6 w-6 text-terrabit-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Field Mapping Tutorial</h3>
                    <p className="text-sm text-terrabit-400 mt-1">Step-by-step guide to mapping your fields</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-terrabit-400">Duration: 15 mins</span>
                      <Button variant="outline" size="sm" className="border-terrabit-700 text-white hover:bg-terrabit-800">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">API Documentation</p>
                  <FileText className="h-4 w-4 text-terrabit-400" />
                </div>
                <p className="text-xs text-terrabit-400">Technical documentation for developers</p>
              </div>
              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">Best Practices</p>
                  <Book className="h-4 w-4 text-terrabit-400" />
                </div>
                <p className="text-xs text-terrabit-400">Recommended farming techniques</p>
              </div>
              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">Video Library</p>
                  <Video className="h-4 w-4 text-terrabit-400" />
                </div>
                <p className="text-xs text-terrabit-400">Collection of tutorial videos</p>
              </div>
              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">Support Center</p>
                  <HelpCircle className="h-4 w-4 text-terrabit-400" />
                </div>
                <p className="text-xs text-terrabit-400">Get help and contact support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 