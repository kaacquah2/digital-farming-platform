export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Farmers Say</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from farmers who have transformed their operations with FarmInsight.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <p className="text-gray-500 italic">
                "FarmInsight has revolutionized how I manage my 2,000-acre corn and soybean operation. The yield
                analysis tools helped me increase profits by 15% in just one season."
              </p>
              <div>
                <h4 className="font-semibold">John Miller</h4>
                <p className="text-sm text-gray-500">Midwest Grain Farms, Iowa</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <p className="text-gray-500 italic">
                "The prescription creation feature saved me thousands in input costs. Being able to apply exactly what's
                needed where it's needed has been a game-changer."
              </p>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Johnson Family Farms, Nebraska</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm md:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <p className="text-gray-500 italic">
                "The satellite imagery and field health monitoring alerted me to a pest issue before it became visible
                to the naked eye. This early detection saved my entire wheat crop."
              </p>
              <div>
                <h4 className="font-semibold">Michael Rodriguez</h4>
                <p className="text-sm text-gray-500">Rodriguez Ag Enterprises, California</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

