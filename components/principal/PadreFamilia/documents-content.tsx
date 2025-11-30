"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Eye, Upload, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

interface DocumentsContentProps {
    language: string
    activeStudent: any
}

const documentsData = [
    {
        id: 1,
        name: "Certificado de Notas 2023",
        type: "certificate",
        category: "academic",
        uploadDate: "2024-01-15",
        status: "approved",
        size: "2.3 MB",
        format: "PDF",
        description: "Certificado oficial de calificaciones del año académico 2023",
    },
    {
        id: 2,
        name: "Constancia de Matrícula",
        type: "enrollment",
        category: "administrative",
        uploadDate: "2024-02-01",
        status: "approved",
        size: "1.8 MB",
        format: "PDF",
        description: "Documento que certifica la matrícula para el año 2024",
    },
    {
        id: 3,
        name: "Certificado Médico",
        type: "medical",
        category: "health",
        uploadDate: "2024-01-20",
        status: "pending",
        size: "1.2 MB",
        format: "PDF",
        description: "Certificado médico requerido para actividades deportivas",
    },
    {
        id: 4,
        name: "Autorización Salida Pedagógica",
        type: "authorization",
        category: "permissions",
        uploadDate: "2024-03-10",
        status: "pending",
        size: "0.8 MB",
        format: "PDF",
        description: "Autorización para participar en la salida pedagógica al museo",
    },
    {
        id: 5,
        name: "Seguro Estudiantil",
        type: "insurance",
        category: "administrative",
        uploadDate: "2024-01-25",
        status: "rejected",
        size: "1.5 MB",
        format: "PDF",
        description: "Póliza de seguro estudiantil - Requiere actualización",
    },
]

export function DocumentsContent({ language, activeStudent }: DocumentsContentProps) {
    const isSpanish = language === "es"

    const getStatusConfig = (status: string) => {
        const configs = {
            approved: {
                label: isSpanish ? "Aprobado" : "Approved",
                variant: "default" as const,
                color: "text-green-600",
                icon: CheckCircle2,
            },
            pending: {
                label: isSpanish ? "Pendiente" : "Pending",
                variant: "secondary" as const,
                color: "text-yellow-600",
                icon: Clock,
            },
            rejected: {
                label: isSpanish ? "Rechazado" : "Rejected",
                variant: "destructive" as const,
                color: "text-red-600",
                icon: AlertTriangle,
            },
        }
        return configs[status as keyof typeof configs] || configs.pending
    }

    const getCategoryLabel = (category: string) => {
        const labels = {
            academic: isSpanish ? "Académico" : "Academic",
            administrative: isSpanish ? "Administrativo" : "Administrative",
            health: isSpanish ? "Salud" : "Health",
            permissions: isSpanish ? "Permisos" : "Permissions",
        }
        return labels[category as keyof typeof labels] || category
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const stats = {
        total: documentsData.length,
        approved: documentsData.filter((doc) => doc.status === "approved").length,
        pending: documentsData.filter((doc) => doc.status === "pending").length,
        rejected: documentsData.filter((doc) => doc.status === "rejected").length,
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{isSpanish ? "Documentos" : "Documents"}</h1>
                    <p className="text-muted-foreground">
                        {isSpanish
                            ? `Gestiona los documentos de ${activeStudent.firstName}`
                            : `Manage ${activeStudent.firstName}'s documents`}
                    </p>
                </div>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    {isSpanish ? "Subir Documento" : "Upload Document"}
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Total" : "Total"}</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Aprobados" : "Approved"}</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Pendientes" : "Pending"}</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Rechazados" : "Rejected"}</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Documents List */}
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">{isSpanish ? "Todos" : "All"}</TabsTrigger>
                    <TabsTrigger value="academic">{isSpanish ? "Académicos" : "Academic"}</TabsTrigger>
                    <TabsTrigger value="administrative">{isSpanish ? "Administrativos" : "Administrative"}</TabsTrigger>
                    <TabsTrigger value="health">{isSpanish ? "Salud" : "Health"}</TabsTrigger>
                    <TabsTrigger value="permissions">{isSpanish ? "Permisos" : "Permissions"}</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {documentsData.map((document) => {
                                    const statusConfig = getStatusConfig(document.status)
                                    const StatusIcon = statusConfig.icon

                                    return (
                                        <div key={document.id} className="p-4 hover:bg-accent/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-2 rounded-full bg-accent ${statusConfig.color}`}>
                                                        <FileText className="h-4 w-4" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-semibold">{document.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{document.description}</p>
                                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                            <span>
                                                                {isSpanish ? "Subido:" : "Uploaded:"} {formatDate(document.uploadDate)}
                                                            </span>
                                                            <span>{document.size}</span>
                                                            <span>{document.format}</span>
                                                            <Badge variant="outline" className="text-xs">
                                                                {getCategoryLabel(document.category)}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={statusConfig.variant}>
                                                        <StatusIcon className="h-3 w-3 mr-1" />
                                                        {statusConfig.label}
                                                    </Badge>
                                                    <div className="flex gap-1">
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
