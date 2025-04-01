"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Plus, Trash2, Edit2, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { format, isToday, isPast, isFuture } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Task {
  id: string
  title: string
  description: string
  date: Date
  type: "planting" | "harvesting" | "maintenance" | "other"
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tasks, setTasks] = useState<Task[]>([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    type: "other",
  })
  const [loading, setLoading] = useState(false)

  const handleAddTask = () => {
    if (!date || !newTask.title) {
      toast.error("Please fill in all required fields")
      return
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || "",
      date: date,
      type: newTask.type as Task["type"],
    }

    setTasks([...tasks, task])
    setShowAddTask(false)
    setNewTask({
      title: "",
      description: "",
      type: "other",
    })
    toast.success("Task added successfully")
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    toast.success("Task deleted successfully")
  }

  const getTasksForDate = (date: Date) => {
    return tasks.filter(
      task => format(task.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    )
  }

  const getTypeColor = (type: Task["type"]) => {
    switch (type) {
      case "planting":
        return "bg-green-500/20 text-green-400"
      case "harvesting":
        return "bg-yellow-500/20 text-yellow-400"
      case "maintenance":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Farming Calendar</h1>
        <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
          <DialogTrigger asChild>
            <Button className="bg-terrabit-600 hover:bg-terrabit-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-terrabit-900 border-terrabit-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Task</DialogTitle>
              <DialogDescription className="text-terrabit-400">
                Add a new farming task to your calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-white">Task Type</Label>
                <select
                  id="type"
                  value={newTask.type}
                  onChange={(e) => setNewTask({ ...newTask, type: e.target.value as Task["type"] })}
                  className="w-full px-3 py-2 bg-terrabit-800 border border-terrabit-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-terrabit-600"
                >
                  <option value="planting">Planting</option>
                  <option value="harvesting">Harvesting</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddTask(false)}
                className="border-terrabit-700 text-white hover:bg-terrabit-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddTask}
                className="bg-terrabit-600 hover:bg-terrabit-700"
              >
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-7 min-h-0">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)] overflow-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-terrabit-700 bg-terrabit-800"
              modifiers={{
                today: (date) => isToday(date),
                past: (date) => isPast(date),
                future: (date) => isFuture(date),
              }}
              modifiersStyles={{
                today: { backgroundColor: "var(--terrabit-500)", color: "white" },
                past: { backgroundColor: "var(--gray-500)", color: "white" },
                future: { backgroundColor: "var(--blue-500)", color: "white" },
              }}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">
              Tasks for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)] overflow-auto">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-terrabit-400 mx-auto mb-4 animate-spin" />
                  <p className="text-terrabit-400">Loading tasks...</p>
                </div>
              ) : date && getTasksForDate(date).length > 0 ? (
                getTasksForDate(date).map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-lg bg-terrabit-800/50 border border-terrabit-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-white">{task.title}</h3>
                        <p className="text-sm text-terrabit-400 mt-1">{task.description}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${getTypeColor(task.type)}`}>
                          {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-terrabit-400 hover:text-terrabit-300"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-terrabit-400 mx-auto mb-4" />
                  <p className="text-terrabit-400">No tasks scheduled for this date</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 