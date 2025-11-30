"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, TrendingUp, Award, Target, BarChart3, Download, Eye } from "lucide-react"

interface GradesContentProps {
    currentLanguage: string
    activeStudent: any
}

const gradesData = {
    subjects: [
        {
            id: "math",
            name: "Matemáticas",
            teacher: "Prof. García",
            currentGrade: 4.5,
            grades: [
                { period: "Período 1", grade: 4.2, weight: 25 },
                { period: "Período 2", grade: 4.8, weight: 25 },
                { period: "Período 3", grade: 4.5, weight: 25 },
                { period: "Final", grade: null, weight: 25 },
            ],
            assignments: [
                { name: "Quiz Álgebra", grade: 4.5, date: "2024-03-10", type: "quiz" },
                { name: "Taller Geometría", grade: 4.8, date: "2024-03-15", type: "homework" },
                { name: "Examen Parcial", grade: 4.2, date: "2024-03-20", type: "exam" },
            ],
        },
        {
            id: "spanish",
            name: "Español",
            teacher: "Prof. Martínez",
            currentGrade: 4.2,
            grades: [
                { period: "Período 1", grade: 4.0, weight: 25 },
                { period: "Período 2", grade: 4.3, weight: 25 },
                { period: "Período 3", grade: 4.4, weight: 25 },
                { period: "Final", grade: null, weight: 25 },
            ],
            assignments: [
                { name: "Ensayo Narrativo", grade: 4.0, date: "2024-03-08", type: "essay" },
                { name: "Análisis Literario", grade: 4.5, date: "2024-03-18", type: "homework" },
                { name: "Examen Gramática", grade: 4.1, date: "2024-03-22", type: "exam" },
            ],
        },
        {
            id: "science",
            name: "Ciencias Naturales",
            teacher: "Prof. López",
            currentGrade: 4.8,
            grades: [
                { period: "Período 1", grade: 4.7, weight: 25 },
                { period: "Período 2", grade: 4.9, weight: 25 },
                { period: "Período 3", grade: 4.8, weight: 25 },
                { period: "Final", grade: null, weight: 25 },
            ],
            assignments: [
                { name: "Laboratorio Química", grade: 4.9, date: "2024-03-12", type: "lab" },
                { name: "Proyecto Biología", grade: 4.8, date: "2024-03-16", type: "project" },
                { name: "Quiz Física", grade: 4.7, date: "2024-03-25", type: "quiz" },
            ],
        },
        {
            id: "english",
            name: "Inglés",
            teacher: "Prof. Smith",
            currentGrade: 4.0,
            grades: [
                { period: "Período 1", grade: 3.8, weight: 25 },
                { period: "Período 2", grade: 4.1, weight: 25 },
                { period: "Período 3", grade: 4.2, weight: 25 },
                { period: "Final", grade: null, weight: 25 },
            ],
            assignments: [
                { name: "Speaking Test", grade: 4.0, date: "2024-03-14", type: "oral" },
                { name: "Grammar Exercise", grade: 4.2, date: "2024-03-19", type: "homework" },
                { name: "Reading Comprehension", grade: 3.9, date: "2024-03-24", type: "exam" },
            ],
        },
    ],
    overall: {
        currentAverage: 4.4,
        previousAverage: 4.2,
        trend: "up",
        position: 8,
        totalStudents: 32,
    },
}

const assignmentTypes = {
    quiz: { label: "Quiz", color: "bg-blue-500" },
    homework: { label: "Tarea", color: "bg-green-500" },
    exam: { label: "Examen", color: "bg-red-500" },
    essay: { label: "Ensayo", color: "bg-purple-500" },
    lab: { label: "Laboratorio", color: "bg-yellow-500" },
    project: { label: "Proyecto", color: "bg-indigo-500" },
    oral: { label: "Oral", color: "bg-pink-500" },
}

export function GradesContent({ currentLanguage, activeStudent }: GradesContentProps) {
    const isSpanish = currentLanguage === "es"

    const getGradeColor = (grade: number) => {
        if (grade >= 4.5) return "text-green-600"
        if (grade >= 4.0) return "text-blue-600"
        if (grade >= 3.5) return "text-yellow-600"
        return "text-red-600"
    }

    const getGradeBadgeVariant = (grade: number) => {
        if (grade >= 4.5) return "default"
        if (grade >= 4.0) return "secondary"
        if (grade >= 3.5) return "outline"
        return "destructive"
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{isSpanish ? "Calificaciones" : "Grades"}</h1>
                    <p className="text-muted-foreground">
                        {isSpanish
                            ? `Rendimiento académico de ${activeStudent.firstName}`
                            : `Academic performance for ${activeStudent.firstName}`}
                    </p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    {isSpanish ? "Descargar Boletín" : "Download Report Card"}
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Promedio General" : "Overall Average"}</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${getGradeColor(gradesData.overall.currentAverage)}`}>
                            {gradesData.overall.currentAverage.toFixed(1)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {gradesData.overall.trend === "up" ? "↗" : "↘"}
                            {isSpanish ? " desde el período anterior" : " from previous period"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Posición en Clase" : "Class Rank"}</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">#{gradesData.overall.position}</div>
                        <p className="text-xs text-muted-foreground">
                            {isSpanish ? "de" : "of"} {gradesData.overall.totalStudents} {isSpanish ? "estudiantes" : "students"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Mejor Materia" : "Best Subject"}</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">4.8</div>
                        <p className="text-xs text-muted-foreground">{isSpanish ? "Ciencias Naturales" : "Natural Sciences"}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {isSpanish ? "Materias Aprobadas" : "Passed Subjects"}
                        </CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">4/4</div>
                        <p className="text-xs text-muted-foreground">100% {isSpanish ? "aprobación" : "pass rate"}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Grades */}
            <Tabs defaultValue="subjects" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="subjects">{isSpanish ? "Por Materias" : "By Subjects"}</TabsTrigger>
                    <TabsTrigger value="periods">{isSpanish ? "Por Períodos" : "By Periods"}</TabsTrigger>
                    <TabsTrigger value="assignments">{isSpanish ? "Evaluaciones" : "Assignments"}</TabsTrigger>
                </TabsList>

                <TabsContent value="subjects" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {gradesData.subjects.map((subject) => (
                            <Card key={subject.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                                        <Badge variant={getGradeBadgeVariant(subject.currentGrade)}>
                                            {subject.currentGrade.toFixed(1)}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        {subject.grades.map((grade, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="text-sm">{grade.period}</span>
                                                <div className="flex items-center gap-2">
                                                    {grade.grade ? (
                                                        <Badge variant="outline" className={getGradeColor(grade.grade)}>
                                                            {grade.grade.toFixed(1)}
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline">{isSpanish ? "Pendiente" : "Pending"}</Badge>
                                                    )}
                                                    <span className="text-xs text-muted-foreground">{grade.weight}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-2 border-t">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{isSpanish ? "Progreso del Período" : "Period Progress"}</span>
                                            <span className="text-sm text-muted-foreground">75%</span>
                                        </div>
                                        <Progress value={75} className="mt-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="periods" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                {isSpanish ? "Progreso por Períodos" : "Progress by Periods"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {["Período 1", "Período 2", "Período 3"].map((period, periodIndex) => (
                                    <div key={period} className="space-y-3">
                                        <h4 className="font-semibold">{period}</h4>
                                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                                            {gradesData.subjects.map((subject) => (
                                                <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <span className="text-sm font-medium">{subject.name}</span>
                                                    <Badge variant={getGradeBadgeVariant(subject.grades[periodIndex].grade!)}>
                                                        {subject.grades[periodIndex].grade!.toFixed(1)}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="assignments" className="space-y-4">
                    {gradesData.subjects.map((subject) => (
                        <Card key={subject.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{subject.name}</span>
                                    <Badge variant="outline">{subject.teacher}</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {subject.assignments.map((assignment, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${assignmentTypes[assignment.type as keyof typeof assignmentTypes].color}`}
                                                />
                                                <div>
                                                    <h5 className="font-medium">{assignment.name}</h5>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span>{assignmentTypes[assignment.type as keyof typeof assignmentTypes].label}</span>
                                                        <span>•</span>
                                                        <span>{new Date(assignment.date).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={getGradeBadgeVariant(assignment.grade)}>{assignment.grade.toFixed(1)}</Badge>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}
