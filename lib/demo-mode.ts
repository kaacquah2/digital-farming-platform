// Check if we're in demo mode
export const isDemoMode = typeof window !== "undefined" && window.location.pathname.includes("/demo")

// Demo user data
export const demoUser = {
  uid: "demo-user-id",
  email: "demo@example.com",
  displayName: "Demo User",
  photoURL: null,
  role: "farmer",
  plan: "premium",
  profile: {
    farmName: "Demo Farm",
    location: "Demo Location",
    farmSize: "100 acres",
    primaryCrops: ["Wheat", "Corn"],
    bio: "This is a demo farm profile",
  },
  subscription: {
    plan: "premium",
    status: "active",
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  },
}

// Mock fields data
export const demoFields = [
  {
    id: "field-1",
    name: "North Field",
    area: 120,
    crop: "Corn",
    plantingDate: "2023-04-15",
    harvestDate: "2023-09-20",
    health: "good",
    soilType: "Loam",
    location: { lat: 41.8781, lng: -87.6298 },
    lastInspection: "2023-07-10",
    notes: "Good growth, some minor pest issues in the northwest corner.",
  },
  {
    id: "field-2",
    name: "South Field",
    area: 85,
    crop: "Soybeans",
    plantingDate: "2023-05-01",
    harvestDate: "2023-10-05",
    health: "excellent",
    soilType: "Clay Loam",
    location: { lat: 41.8681, lng: -87.6198 },
    lastInspection: "2023-07-12",
    notes: "Excellent growth, no issues detected.",
  },
  {
    id: "field-3",
    name: "East Field",
    area: 95,
    crop: "Wheat",
    plantingDate: "2023-03-20",
    harvestDate: "2023-08-10",
    health: "fair",
    soilType: "Sandy Loam",
    location: { lat: 41.8881, lng: -87.6198 },
    lastInspection: "2023-07-08",
    notes: "Some drought stress visible, consider additional irrigation.",
  },
]

// Mock prescriptions data
export const demoPrescriptions = [
  {
    id: "prescription-1",
    name: "Nitrogen Application - North Field",
    fieldId: "field-1",
    fieldName: "North Field",
    type: "Fertilizer",
    status: "Completed",
    createdAt: "2023-06-15",
    completedAt: "2023-06-18",
    details: "Variable rate nitrogen application based on soil test results.",
  },
  {
    id: "prescription-2",
    name: "Pest Control - South Field",
    fieldId: "field-2",
    fieldName: "South Field",
    type: "Pesticide",
    status: "Scheduled",
    createdAt: "2023-07-05",
    scheduledFor: "2023-07-20",
    details: "Targeted application to control aphid infestation in southern section.",
  },
  {
    id: "prescription-3",
    name: "Irrigation Plan - East Field",
    fieldId: "field-3",
    fieldName: "East Field",
    type: "Irrigation",
    status: "In Progress",
    createdAt: "2023-07-10",
    details: "Precision irrigation plan to address drought stress in central and eastern sections.",
  },
]

// Mock analytics data
export const demoAnalytics = {
  yieldHistory: [
    { year: 2018, yield: 156 },
    { year: 2019, yield: 162 },
    { year: 2020, yield: 145 },
    { year: 2021, yield: 170 },
    { year: 2022, yield: 175 },
    { year: 2023, yield: 168 },
  ],
  cropDistribution: [
    { crop: "Corn", percentage: 45 },
    { crop: "Soybeans", percentage: 30 },
    { crop: "Wheat", percentage: 15 },
    { crop: "Alfalfa", percentage: 10 },
  ],
  resourceUsage: {
    water: [
      { month: "Jan", amount: 120 },
      { month: "Feb", amount: 100 },
      { month: "Mar", amount: 140 },
      { month: "Apr", amount: 180 },
      { month: "May", amount: 220 },
      { month: "Jun", amount: 280 },
      { month: "Jul", amount: 320 },
      { month: "Aug", amount: 300 },
      { month: "Sep", amount: 240 },
      { month: "Oct", amount: 180 },
      { month: "Nov", amount: 140 },
      { month: "Dec", amount: 120 },
    ],
    fertilizer: [
      { month: "Jan", amount: 0 },
      { month: "Feb", amount: 0 },
      { month: "Mar", amount: 120 },
      { month: "Apr", amount: 180 },
      { month: "May", amount: 150 },
      { month: "Jun", amount: 100 },
      { month: "Jul", amount: 80 },
      { month: "Aug", amount: 60 },
      { month: "Sep", amount: 40 },
      { month: "Oct", amount: 0 },
      { month: "Nov", amount: 0 },
      { month: "Dec", amount: 0 },
    ],
    pesticides: [
      { month: "Jan", amount: 0 },
      { month: "Feb", amount: 0 },
      { month: "Mar", amount: 20 },
      { month: "Apr", amount: 40 },
      { month: "May", amount: 60 },
      { month: "Jun", amount: 80 },
      { month: "Jul", amount: 70 },
      { month: "Aug", amount: 50 },
      { month: "Sep", amount: 30 },
      { month: "Oct", amount: 10 },
      { month: "Nov", amount: 0 },
      { month: "Dec", amount: 0 },
    ],
  },
}

