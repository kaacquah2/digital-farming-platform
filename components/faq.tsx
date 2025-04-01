import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Digital Farming?",
    answer: "Digital Farming is a comprehensive platform that helps farmers make data-driven decisions by analyzing agricultural data, providing weather forecasts, and offering AI-powered insights for crop management.",
  },
  {
    question: "How does the disease detection work?",
    answer: "Our AI model analyzes images of crops to identify potential diseases. It uses machine learning to recognize patterns and symptoms, providing accurate diagnoses and treatment recommendations.",
  },
  {
    question: "What kind of data can I import?",
    answer: "You can import various types of agricultural data including crop information, soil samples, weather records, and field measurements. The platform supports multiple file formats and data sources.",
  },
  {
    question: "How accurate are the weather forecasts?",
    answer: "Our weather forecasts are powered by reliable meteorological data sources and are updated in real-time. We provide accurate predictions for temperature, precipitation, and other weather conditions.",
  },
  {
    question: "Can I export my analysis results?",
    answer: "Yes, you can export your analysis results in various formats including PDF, CSV, and Excel. This allows you to share insights with team members or use the data in other applications.",
  },
]

export function FAQ() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our platform and services.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
} 