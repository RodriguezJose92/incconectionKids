"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, AlertTriangle, BookOpen, Zap, Music, Microscope, Palette, Dribbble } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

/** Data Estudiantes  */
const chartConfigStudent = {
  visitors: {
    label: "Visitors",
  },
  primaria: {
    label: "Primaria",
  },
  bachillerato: {
    label: "Bachillerato",
  },
  pre_escolar: {
    label: "Pre-escolar",
  },
} satisfies ChartConfig

const chartDataStudents = [
  { browser: "primaria", visitors: 275, fill: "#009834" },
  { browser: "bachillerato", visitors: 200, fill: "#ff9834" },
  { browser: "pre_escolar", visitors: 287, fill: "#aa9834" }
]

/** Data Profesores */
const chartConfigTeachers = {
  visitors: {
    label: "Visitors",
  },
  total: {
    label: "Primaria",
  }
} satisfies ChartConfig

const chartDataTeachers = [
  { browser: "totalprimaria", visitors: 375, fill: "#009834" },

]

/** Data Employes  */
const chartConfigEmployes = {
  visitors: {
    label: "Visitors",
  },
  primaria: {
    label: "Primaria",
  },
  bachillerato: {
    label: "Bachillerato",
  },
  pre_escolar: {
    label: "Pre-escolar",
  },
} satisfies ChartConfig

const chartDataEmployes = [
  { browser: "primaria", visitors: 275, fill: "#009834" },
  { browser: "bachillerato", visitors: 200, fill: "#ff9834" },
  { browser: "pre_escolar", visitors: 287, fill: "#aa9834" }
]

export function DashboardHome() {

  const totalStudent = useMemo(() => {
    return chartDataStudents.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
        <p className="text-muted-foreground">Bienvenido al sistema de gestión escolar</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/** Card de estudiantes  */}
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Estudiantes</CardTitle>
            <CardDescription>Total de estudiantes registradps</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigStudent}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartDataStudents}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalStudent.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Estudiantes
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
              Gráfica que representa la cantidad de estudiantes
            </div>
            <div className="text-muted-foreground leading-none">
              En el año académico actual
            </div>
          </CardFooter>
        </Card>

        {/** Card de padres */}
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Padres</CardTitle>
            <CardDescription>Perfiles de padres activos</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigTeachers}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartDataTeachers}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {852}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Padres
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
              Gráfica que representa la cantidad de estudiantes
            </div>
            <div className="text-muted-foreground leading-none">
              En el año académico actual
            </div>
          </CardFooter>
        </Card>

        {/** Card de empleados */}
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigEmployes}>
              <BarChart accessibilityLayer data={chartDataEmployes}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Grupos de Interés</span>
            </CardTitle>
            <CardDescription>Actividades extracurriculares</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-900">Fútbol</div>
                      <div className="text-sm text-blue-600">Deportes</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-900">45</div>
                    <div className="text-xs text-blue-600">participantes</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-purple-900">Coro</div>
                      <div className="text-sm text-purple-600">Música</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-900">32</div>
                    <div className="text-xs text-purple-600">participantes</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Microscope className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-green-900">Club de Ciencias</div>
                      <div className="text-sm text-green-600">Académico</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-900">28</div>
                    <div className="text-xs text-green-600">participantes</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Palette className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-orange-900">Arte y Pintura</div>
                      <div className="text-sm text-orange-600">Artístico</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-900">22</div>
                    <div className="text-xs text-orange-600">participantes</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <Dribbble className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-red-900">Baloncesto</div>
                      <div className="text-sm text-red-600">Deportes</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-900">38</div>
                    <div className="text-xs text-red-600">participantes</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Eventos Próximos</span>
            </CardTitle>
            <CardDescription>Próximas actividades programadas</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Reunión de Padres</div>
                    <div className="text-sm text-muted-foreground">15 de Enero - 2:00 PM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Feria de Ciencias</div>
                    <div className="text-sm text-muted-foreground">20 de Enero - 9:00 AM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Torneo Deportivo</div>
                    <div className="text-sm text-muted-foreground">25 de Enero - 8:00 AM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Presentación Musical</div>
                    <div className="text-sm text-muted-foreground">30 de Enero - 6:00 PM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Día Cultural</div>
                    <div className="text-sm text-muted-foreground">5 de Febrero - 10:00 AM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Graduación Preescolar</div>
                    <div className="text-sm text-muted-foreground">10 de Febrero - 4:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Alertas Importantes</span>
            </CardTitle>
            <CardDescription>Notificaciones que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-red-900">Sistema de calefacción</div>
                    <div className="text-sm text-red-700">Requiere mantenimiento urgente</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-orange-900">Inventario bajo</div>
                    <div className="text-sm text-orange-700">Material de laboratorio agotándose</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-yellow-900">Documentos pendientes</div>
                    <div className="text-sm text-yellow-700">15 solicitudes por revisar</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-blue-900">Actualización del sistema</div>
                    <div className="text-sm text-blue-700">Nueva versión disponible</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-purple-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-purple-900">Capacitación docente</div>
                    <div className="text-sm text-purple-700">Programar sesión mensual</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
