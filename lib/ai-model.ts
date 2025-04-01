// This file simulates an AI model for crop yield prediction and recommendations

// Define the prediction input type
export type PredictionInput = {
  fieldId: string
  crop: string
  soilType: string
  area: number
  plantingDate: string
  weatherData?: any
  previousYields?: number[]
  soilNutrients?: {
    nitrogen: number
    phosphorus: number
    potassium: number
    ph: number
  }
}

// Define the prediction output type
export type YieldPrediction = {
  predictedYield: number
  yieldRange: {
    min: number
    max: number
  }
  confidence: number
  factors: {
    name: string
    impact: "positive" | "negative" | "neutral"
    strength: number // 0-1
    description: string
  }[]
  recommendations: {
    type: string
    description: string
    potentialImpact: number // percentage increase in yield
    priority: "high" | "medium" | "low"
  }[]
}

// Simulate AI model prediction
export function predictCropYield(input: PredictionInput): YieldPrediction {
  // In a real application, this would call a trained ML model
  // For demo purposes, we'll generate a realistic prediction

  // Base yield based on crop type (bushels per acre)
  const baseYields = {
    Corn: 180,
    Soybeans: 60,
    Wheat: 75,
    Cotton: 2.5,
    Rice: 7500, // lbs per acre
    Barley: 70,
    Oats: 85,
    Sorghum: 65,
    Alfalfa: 4.5, // tons per acre
    Potatoes: 400, // cwt per acre
  }

  // Default to corn if crop not found
  const baseYield = baseYields[input.crop] || baseYields["Corn"]

  // Soil type factors
  const soilFactors = {
    Loam: 1.1,
    "Clay Loam": 1.05,
    "Sandy Loam": 0.95,
    "Silt Loam": 1.08,
    Clay: 0.9,
    Sandy: 0.85,
    "Silty Clay": 0.95,
    Peaty: 1.0,
    Chalky: 0.9,
  }

  const soilFactor = soilFactors[input.soilType] || 1.0

  // Calculate planting date optimality (0-1)
  const plantingDate = new Date(input.plantingDate)
  const month = plantingDate.getMonth()

  // Optimal planting months vary by crop
  const optimalMonths = {
    Corn: [3, 4], // April-May
    Soybeans: [4, 5], // May-June
    Wheat: [8, 9], // Sept-Oct (winter wheat)
    Cotton: [3, 4], // April-May
    Rice: [3, 4], // April-May
    Barley: [8, 9], // Sept-Oct (winter barley)
    Oats: [2, 3], // March-April
    Sorghum: [4, 5], // May-June
    Alfalfa: [2, 7], // March or August
    Potatoes: [2, 3], // March-April
  }

  const cropOptimalMonths = optimalMonths[input.crop] || [3, 4]
  const plantingTimeliness = cropOptimalMonths.includes(month) ? 1.1 : 0.9

  // Previous yields factor (if available)
  let trendFactor = 1.0
  if (input.previousYields && input.previousYields.length > 0) {
    // Calculate trend based on previous yields
    const recentYields = input.previousYields.slice(-3) // Last 3 years
    if (recentYields.length >= 2) {
      const avgChange =
        recentYields.slice(1).reduce((sum, current, index) => {
          return sum + (current - recentYields[index]) / recentYields[index]
        }, 0) /
        (recentYields.length - 1)

      trendFactor = 1 + avgChange
    }
  }

  // Soil nutrients factor (if available)
  let nutrientFactor = 1.0
  if (input.soilNutrients) {
    // Simplified nutrient impact calculation
    const { nitrogen, phosphorus, potassium, ph } = input.soilNutrients

    // Optimal ranges vary by crop, this is simplified
    const nFactor = nitrogen > 40 ? 1.1 : nitrogen > 20 ? 1.0 : 0.9
    const pFactor = phosphorus > 30 ? 1.05 : phosphorus > 15 ? 1.0 : 0.95
    const kFactor = potassium > 200 ? 1.05 : potassium > 100 ? 1.0 : 0.95

    // pH factor (most crops prefer 6.0-7.0)
    const phFactor = ph >= 6.0 && ph <= 7.0 ? 1.05 : ph > 5.5 && ph < 7.5 ? 1.0 : 0.9

    nutrientFactor = (nFactor + pFactor + kFactor + phFactor) / 4
  }

  // Random weather variation (-10% to +10%)
  const weatherVariation = 0.9 + Math.random() * 0.2

  // Calculate predicted yield
  const predictedYield = baseYield * soilFactor * plantingTimeliness * trendFactor * nutrientFactor * weatherVariation

  // Round to appropriate precision
  const roundedYield = Math.round(predictedYield * 10) / 10

  // Generate factors that influenced the prediction
  const factors = [
    {
      name: "Soil Type",
      impact: soilFactor > 1 ? "positive" : soilFactor < 1 ? "negative" : "neutral",
      strength: Math.abs(soilFactor - 1),
      description: `${input.soilType} soil ${soilFactor > 1 ? "enhances" : soilFactor < 1 ? "reduces" : "maintains"} yield potential.`,
    },
    {
      name: "Planting Date",
      impact: plantingTimeliness > 1 ? "positive" : "negative",
      strength: Math.abs(plantingTimeliness - 1),
      description: `Planting in ${new Date(input.plantingDate).toLocaleString("default", { month: "long" })} is ${plantingTimeliness > 1 ? "optimal" : "suboptimal"} for ${input.crop}.`,
    },
  ]

  if (input.previousYields && input.previousYields.length > 0) {
    factors.push({
      name: "Historical Trend",
      impact: trendFactor > 1 ? "positive" : trendFactor < 1 ? "negative" : "neutral",
      strength: Math.abs(trendFactor - 1),
      description: `Historical yield trends show ${trendFactor > 1 ? "improvement" : trendFactor < 1 ? "decline" : "stability"} in this field.`,
    })
  }

  if (input.soilNutrients) {
    factors.push({
      name: "Soil Nutrients",
      impact: nutrientFactor > 1 ? "positive" : nutrientFactor < 1 ? "negative" : "neutral",
      strength: Math.abs(nutrientFactor - 1),
      description: `Soil nutrient levels are ${nutrientFactor > 1.05 ? "excellent" : nutrientFactor > 1 ? "good" : nutrientFactor > 0.95 ? "adequate" : "suboptimal"} for ${input.crop}.`,
    })
  }

  // Generate recommendations based on factors
  const recommendations = []

  // Soil-based recommendations
  if (soilFactor < 1) {
    recommendations.push({
      type: "Soil Amendment",
      description: `Apply organic matter to improve ${input.soilType} soil structure and water retention.`,
      potentialImpact: 5 + Math.round(Math.random() * 5),
      priority: soilFactor < 0.9 ? "high" : "medium",
    })
  }

  // Planting date recommendations
  if (plantingTimeliness < 1) {
    const optimalMonthNames = cropOptimalMonths
      .map((m) => new Date(2023, m, 1).toLocaleString("default", { month: "long" }))
      .join(" or ")

    recommendations.push({
      type: "Planting Schedule",
      description: `Adjust planting schedule to target ${optimalMonthNames} for optimal ${input.crop} development.`,
      potentialImpact: 8 + Math.round(Math.random() * 7),
      priority: "high",
    })
  }

  // Nutrient recommendations
  if (input.soilNutrients) {
    const { nitrogen, phosphorus, potassium, ph } = input.soilNutrients

    if (nitrogen < 30) {
      recommendations.push({
        type: "Fertilization",
        description: `Increase nitrogen application by ${30 - nitrogen} units per acre to optimize ${input.crop} growth.`,
        potentialImpact: 7 + Math.round(Math.random() * 8),
        priority: nitrogen < 20 ? "high" : "medium",
      })
    }

    if (phosphorus < 20) {
      recommendations.push({
        type: "Fertilization",
        description: `Apply phosphorus at ${20 - phosphorus} units per acre to support root development and energy transfer.`,
        potentialImpact: 4 + Math.round(Math.random() * 6),
        priority: phosphorus < 10 ? "high" : "medium",
      })
    }

    if (potassium < 150) {
      recommendations.push({
        type: "Fertilization",
        description: `Supplement potassium at ${Math.round((150 - potassium) / 10) * 10} units per acre to enhance crop resilience and quality.`,
        potentialImpact: 3 + Math.round(Math.random() * 5),
        priority: potassium < 100 ? "high" : "medium",
      })
    }

    if (ph < 5.8 || ph > 7.2) {
      recommendations.push({
        type: "pH Management",
        description:
          ph < 5.8
            ? `Apply lime at 1-2 tons per acre to raise soil pH from ${ph} toward the optimal range (6.0-7.0).`
            : `Apply sulfur or acidifying amendments to lower soil pH from ${ph} toward the optimal range (6.0-7.0).`,
        potentialImpact: 5 + Math.round(Math.random() * 5),
        priority: ph < 5.5 || ph > 7.5 ? "high" : "medium",
      })
    }
  }

  // Add a general recommendation if we have few specific ones
  if (recommendations.length < 2) {
    recommendations.push({
      type: "Precision Agriculture",
      description:
        "Implement variable rate technology for more efficient resource application based on field variability.",
      potentialImpact: 3 + Math.round(Math.random() * 7),
      priority: "medium",
    })
  }

  // Calculate confidence based on available data
  let confidence = 0.7 // Base confidence
  if (input.previousYields && input.previousYields.length > 0) confidence += 0.1
  if (input.soilNutrients) confidence += 0.1
  if (input.weatherData) confidence += 0.1

  // Ensure confidence doesn't exceed 1
  confidence = Math.min(confidence, 0.95)

  // Calculate yield range based on confidence
  const variability = (1 - confidence) * predictedYield
  const yieldRange = {
    min: Math.round((predictedYield - variability) * 10) / 10,
    max: Math.round((predictedYield + variability) * 10) / 10,
  }

  return {
    predictedYield: roundedYield,
    yieldRange,
    confidence,
    factors,
    recommendations,
  }
}

// Function to generate crop health assessment
export type CropHealthAssessment = {
  overallHealth: "excellent" | "good" | "fair" | "poor" | "critical"
  score: number // 0-100
  issues: {
    type: string
    severity: "low" | "medium" | "high"
    description: string
    affectedArea: number // percentage of field
    recommendations: string[]
  }[]
  growthStage: string
  estimatedMaturity: string // date
}

export function assessCropHealth(
  fieldId: string,
  crop: string,
  plantingDate: string,
  imageData?: any,
): CropHealthAssessment {
  // In a real application, this would analyze satellite/drone imagery or sensor data
  // For demo purposes, we'll generate a realistic assessment

  // Calculate days since planting
  const daysSincePlanting = Math.floor((new Date().getTime() - new Date(plantingDate).getTime()) / (1000 * 3600 * 24))

  // Determine growth stage based on days since planting and crop type
  let growthStage = ""
  let daysToMaturity = 0

  switch (crop) {
    case "Corn":
      if (daysSincePlanting < 14) growthStage = "Emergence"
      else if (daysSincePlanting < 35) growthStage = "Vegetative (V3-V6)"
      else if (daysSincePlanting < 60) growthStage = "Vegetative (V7-V12)"
      else if (daysSincePlanting < 80) growthStage = "Tasseling/Silking"
      else if (daysSincePlanting < 120) growthStage = "Grain Fill"
      else growthStage = "Maturity"
      daysToMaturity = Math.max(0, 150 - daysSincePlanting)
      break

    case "Soybeans":
      if (daysSincePlanting < 10) growthStage = "Emergence"
      else if (daysSincePlanting < 30) growthStage = "Vegetative (V1-V3)"
      else if (daysSincePlanting < 60) growthStage = "Flowering (R1-R2)"
      else if (daysSincePlanting < 90) growthStage = "Pod Development (R3-R4)"
      else if (daysSincePlanting < 120) growthStage = "Seed Fill (R5-R6)"
      else growthStage = "Maturity (R7-R8)"
      daysToMaturity = Math.max(0, 140 - daysSincePlanting)
      break

    case "Wheat":
      if (daysSincePlanting < 14) growthStage = "Emergence"
      else if (daysSincePlanting < 40) growthStage = "Tillering"
      else if (daysSincePlanting < 70) growthStage = "Stem Extension"
      else if (daysSincePlanting < 90) growthStage = "Heading"
      else if (daysSincePlanting < 120) growthStage = "Grain Fill"
      else growthStage = "Maturity"
      daysToMaturity = Math.max(0, 130 - daysSincePlanting)
      break

    default:
      if (daysSincePlanting < 14) growthStage = "Early Growth"
      else if (daysSincePlanting < 45) growthStage = "Vegetative"
      else if (daysSincePlanting < 90) growthStage = "Reproductive"
      else growthStage = "Maturity"
      daysToMaturity = Math.max(0, 120 - daysSincePlanting)
  }

  // Calculate estimated maturity date
  const maturityDate = new Date()
  maturityDate.setDate(maturityDate.getDate() + daysToMaturity)
  const estimatedMaturity = maturityDate.toISOString().split("T")[0]

  // Generate a base health score (0-100)
  // In a real application, this would be based on image analysis, sensor data, etc.
  let baseScore = 70 + Math.floor(Math.random() * 20)

  // Generate potential issues based on crop type and growth stage
  const potentialIssues = [
    {
      type: "Nutrient Deficiency",
      description: "Yellowing leaves indicating nitrogen deficiency",
      recommendations: [
        "Apply supplemental nitrogen fertilizer",
        "Consider soil testing to confirm deficiency",
        "Implement split application of nitrogen",
      ],
    },
    {
      type: "Pest Pressure",
      description: "Evidence of insect damage on leaves and stems",
      recommendations: [
        "Scout field to identify specific pest species",
        "Apply targeted insecticide if threshold is reached",
        "Consider biological control options",
      ],
    },
    {
      type: "Disease",
      description: "Fungal lesions developing on lower leaves",
      recommendations: [
        "Apply fungicide treatment",
        "Improve air circulation if possible",
        "Consider disease-resistant varieties for next season",
      ],
    },
    {
      type: "Water Stress",
      description: "Signs of drought stress with leaf curling",
      recommendations: [
        "Increase irrigation frequency",
        "Apply mulch to conserve soil moisture",
        "Consider drought-tolerant varieties for future plantings",
      ],
    },
    {
      type: "Weed Competition",
      description: "Increasing weed pressure in field sections",
      recommendations: [
        "Apply post-emergent herbicide",
        "Consider mechanical cultivation where appropriate",
        "Implement cover crops in future rotations",
      ],
    },
  ]

  // Randomly select 0-3 issues based on a weighted probability
  const issueCount = Math.random() < 0.2 ? 0 : Math.random() < 0.5 ? 1 : Math.random() < 0.8 ? 2 : 3

  // Shuffle and select issues
  const shuffledIssues = [...potentialIssues].sort(() => 0.5 - Math.random())
  const selectedIssues = shuffledIssues.slice(0, issueCount)

  // Process the selected issues
  const issues = selectedIssues.map((issue) => {
    // Random severity
    const severityRand = Math.random()
    const severity = severityRand < 0.5 ? "low" : severityRand < 0.8 ? "medium" : "high"

    // Random affected area (%)
    const affectedArea =
      severity === "low"
        ? 5 + Math.floor(Math.random() * 15)
        : severity === "medium"
          ? 20 + Math.floor(Math.random() * 30)
          : 50 + Math.floor(Math.random() * 40)

    // Adjust health score based on issue severity
    if (severity === "low") baseScore -= 5 + Math.floor(Math.random() * 5)
    else if (severity === "medium") baseScore -= 10 + Math.floor(Math.random() * 10)
    else baseScore -= 20 + Math.floor(Math.random() * 15)

    return {
      type: issue.type,
      severity,
      description: issue.description,
      affectedArea,
      recommendations: issue.recommendations,
    }
  })

  // Ensure score stays within 0-100 range
  const score = Math.max(0, Math.min(100, baseScore))

  // Determine overall health rating
  let overallHealth: "excellent" | "good" | "fair" | "poor" | "critical"
  if (score >= 90) overallHealth = "excellent"
  else if (score >= 75) overallHealth = "good"
  else if (score >= 60) overallHealth = "fair"
  else if (score >= 40) overallHealth = "poor"
  else overallHealth = "critical"

  return {
    overallHealth,
    score,
    issues,
    growthStage,
    estimatedMaturity,
  }
}

// Function to generate resource optimization recommendations
export type ResourceOptimization = {
  water: {
    currentUsage: number // gallons per acre
    recommendedUsage: number
    savings: number
    recommendations: string[]
  }
  fertilizer: {
    currentUsage: {
      nitrogen: number // lbs per acre
      phosphorus: number
      potassium: number
    }
    recommendedUsage: {
      nitrogen: number
      phosphorus: number
      potassium: number
    }
    savings: number // percentage
    recommendations: string[]
  }
  pesticides: {
    currentUsage: number // oz per acre
    recommendedUsage: number
    savings: number
    recommendations: string[]
  }
  labor: {
    currentHours: number // hours per acre
    recommendedHours: number
    savings: number
    recommendations: string[]
  }
  overallSavings: number // percentage
  carbonFootprint: {
    current: number // kg CO2 per acre
    potential: number
    reduction: number // percentage
  }
}

export function optimizeResources(fieldId: string, crop: string, currentPractices: any): ResourceOptimization {
  // In a real application, this would analyze current practices and recommend optimizations
  // For demo purposes, we'll generate realistic recommendations

  // Current water usage (gallons per acre)
  const currentWaterUsage =
    crop === "Corn" ? 3500 : crop === "Soybeans" ? 2800 : crop === "Cotton" ? 4000 : crop === "Rice" ? 12000 : 3000

  // Recommended water usage (10-20% reduction)
  const waterSavingsRate = 0.1 + Math.random() * 0.1
  const recommendedWaterUsage = Math.round(currentWaterUsage * (1 - waterSavingsRate))
  const waterSavings = Math.round(waterSavingsRate * 100)

  // Water recommendations
  const waterRecommendations = [
    "Implement soil moisture sensors to optimize irrigation timing",
    "Switch to drip irrigation for more efficient water delivery",
    "Schedule irrigation based on evapotranspiration data",
    "Apply water during early morning or evening to reduce evaporation",
  ]

  // Current fertilizer usage (lbs per acre)
  const currentFertilizer = {
    nitrogen: crop === "Corn" ? 180 : crop === "Soybeans" ? 30 : crop === "Wheat" ? 120 : 100,
    phosphorus: crop === "Corn" ? 70 : crop === "Soybeans" ? 40 : crop === "Wheat" ? 60 : 50,
    potassium: crop === "Corn" ? 90 : crop === "Soybeans" ? 80 : crop === "Wheat" ? 70 : 80,
  }

  // Recommended fertilizer usage (5-25% reduction)
  const fertilizerSavingsRate = {
    nitrogen: 0.05 + Math.random() * 0.2,
    phosphorus: 0.05 + Math.random() * 0.15,
    potassium: 0.05 + Math.random() * 0.15,
  }

  const recommendedFertilizer = {
    nitrogen: Math.round(currentFertilizer.nitrogen * (1 - fertilizerSavingsRate.nitrogen)),
    phosphorus: Math.round(currentFertilizer.phosphorus * (1 - fertilizerSavingsRate.phosphorus)),
    potassium: Math.round(currentFertilizer.potassium * (1 - fertilizerSavingsRate.potassium)),
  }

  // Overall fertilizer savings
  const avgFertilizerSavings = Math.round(
    ((fertilizerSavingsRate.nitrogen + fertilizerSavingsRate.phosphorus + fertilizerSavingsRate.potassium) / 3) * 100,
  )

  // Fertilizer recommendations
  const fertilizerRecommendations = [
    "Implement variable rate application based on soil testing",
    "Use split applications to match crop uptake patterns",
    "Consider incorporating legumes in rotation to reduce nitrogen needs",
    "Apply fertilizer based on tissue testing during critical growth stages",
  ]

  // Current pesticide usage (oz per acre)
  const currentPesticideUsage = crop === "Corn" ? 32 : crop === "Soybeans" ? 40 : crop === "Cotton" ? 48 : 36

  // Recommended pesticide usage (15-30% reduction)
  const pesticideSavingsRate = 0.15 + Math.random() * 0.15
  const recommendedPesticideUsage = Math.round(currentPesticideUsage * (1 - pesticideSavingsRate))
  const pesticideSavings = Math.round(pesticideSavingsRate * 100)

  // Pesticide recommendations
  const pesticideRecommendations = [
    "Implement integrated pest management (IPM) practices",
    "Use targeted spot treatments rather than whole-field applications",
    "Incorporate beneficial insects and biological controls",
    "Apply pesticides based on economic thresholds rather than calendar schedules",
  ]

  // Current labor hours (per acre)
  const currentLaborHours = crop === "Corn" ? 4 : crop === "Soybeans" ? 3.5 : crop === "Vegetables" ? 8 : 4.5

  // Recommended labor hours (10-20% reduction)
  const laborSavingsRate = 0.1 + Math.random() * 0.1
  const recommendedLaborHours = Math.round(currentLaborHours * (1 - laborSavingsRate) * 10) / 10
  const laborSavings = Math.round(laborSavingsRate * 100)

  // Labor recommendations
  const laborRecommendations = [
    "Implement GPS-guided equipment for reduced overlap",
    "Use automated monitoring systems to reduce scouting time",
    "Consolidate field operations where possible",
    "Adopt precision agriculture tools for more efficient resource management",
  ]

  // Overall savings calculation
  const overallSavings = Math.round(
    ((waterSavingsRate +
      (fertilizerSavingsRate.nitrogen + fertilizerSavingsRate.phosphorus + fertilizerSavingsRate.potassium) / 3 +
      pesticideSavingsRate +
      laborSavingsRate) /
      4) *
      100,
  )

  // Carbon footprint calculations
  const currentCarbonFootprint = crop === "Corn" ? 1200 : crop === "Soybeans" ? 800 : crop === "Rice" ? 2500 : 1000 // kg CO2 per acre

  const carbonReductionRate = 0.05 + Math.random() * 0.15
  const potentialCarbonFootprint = Math.round(currentCarbonFootprint * (1 - carbonReductionRate))
  const carbonReduction = Math.round(carbonReductionRate * 100)

  return {
    water: {
      currentUsage: currentWaterUsage,
      recommendedUsage: recommendedWaterUsage,
      savings: waterSavings,
      recommendations: waterRecommendations.sort(() => 0.5 - Math.random()).slice(0, 3),
    },
    fertilizer: {
      currentUsage: currentFertilizer,
      recommendedUsage: recommendedFertilizer,
      savings: avgFertilizerSavings,
      recommendations: fertilizerRecommendations.sort(() => 0.5 - Math.random()).slice(0, 3),
    },
    pesticides: {
      currentUsage: currentPesticideUsage,
      recommendedUsage: recommendedPesticideUsage,
      savings: pesticideSavings,
      recommendations: pesticideRecommendations.sort(() => 0.5 - Math.random()).slice(0, 3),
    },
    labor: {
      currentHours: currentLaborHours,
      recommendedHours: recommendedLaborHours,
      savings: laborSavings,
      recommendations: laborRecommendations.sort(() => 0.5 - Math.random()).slice(0, 3),
    },
    overallSavings,
    carbonFootprint: {
      current: currentCarbonFootprint,
      potential: potentialCarbonFootprint,
      reduction: carbonReduction,
    },
  }
}

