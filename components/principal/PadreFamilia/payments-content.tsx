"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    CreditCard,
    Download,
    Eye,
    Calendar,
    DollarSign,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Receipt,
} from "lucide-react"

interface PaymentsContentProps {
    language: string
    activeStudent: any
}

const paymentsData = [
    {
        id: "PAY-2024-001",
        concept: "Matrícula 2024",
        amount: 850000,
        dueDate: "2024-02-15",
        paidDate: "2024-02-10",
        status: "paid",
        method: "Transferencia Bancaria",
    },
    {
        id: "PAY-2024-002",
        concept: "Pensión Marzo",
        amount: 320000,
        dueDate: "2024-03-05",
        paidDate: "2024-03-03",
        status: "paid",
        method: "Tarjeta de Crédito",
    },
    {
        id: "PAY-2024-003",
        concept: "Pensión Abril",
        amount: 320000,
        dueDate: "2024-04-05",
        paidDate: null,
        status: "pending",
        method: null,
    },
    {
        id: "PAY-2024-004",
        concept: "Seguro Estudiantil",
        amount: 150000,
        dueDate: "2024-04-15",
        paidDate: null,
        status: "overdue",
        method: null,
    },
    {
        id: "PAY-2024-005",
        concept: "Pensión Mayo",
        amount: 320000,
        dueDate: "2024-05-05",
        paidDate: null,
        status: "upcoming",
        method: null,
    },
]

const paymentSummary = {
    totalPaid: 1170000,
    totalPending: 790000,
    totalYear: 1960000,
    nextPayment: {
        concept: "Pensión Abril",
        amount: 320000,
        dueDate: "2024-04-05",
    },
}

export function PaymentsContent({ language, activeStudent }: PaymentsContentProps) {
    const isSpanish = language === "es"

    const getStatusConfig = (status: string) => {
        const configs = {
            paid: {
                label: isSpanish ? "Pagado" : "Paid",
                variant: "default" as const,
                icon: CheckCircle2,
                color: "text-green-600",
            },
            pending: {
                label: isSpanish ? "Pendiente" : "Pending",
                variant: "secondary" as const,
                icon: Clock,
                color: "text-yellow-600",
            },
            overdue: {
                label: isSpanish ? "Vencido" : "Overdue",
                variant: "destructive" as const,
                icon: AlertTriangle,
                color: "text-red-600",
            },
            upcoming: {
                label: isSpanish ? "Próximo" : "Upcoming",
                variant: "outline" as const,
                icon: Calendar,
                color: "text-blue-600",
            },
        }
        return configs[status as keyof typeof configs] || configs.pending
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const progressPercentage = (paymentSummary.totalPaid / paymentSummary.totalYear) * 100

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {isSpanish ? "Estado de Pagos" : "Payment Status"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isSpanish
                            ? `Pagos y obligaciones de ${activeStudent.firstName} ${activeStudent.lastName}`
                            : `Payments and obligations for ${activeStudent.firstName} ${activeStudent.lastName}`}
                    </p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    {isSpanish ? "Descargar Reporte" : "Download Report"}
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Total Pagado" : "Total Paid"}</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(paymentSummary.totalPaid)}</div>
                        <p className="text-xs text-muted-foreground">
                            {Math.round(progressPercentage)}% {isSpanish ? "del año" : "of the year"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Pendiente" : "Pending"}</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{formatCurrency(paymentSummary.totalPending)}</div>
                        <p className="text-xs text-muted-foreground">{isSpanish ? "Por pagar este año" : "To pay this year"}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Próximo Pago" : "Next Payment"}</CardTitle>
                        <Calendar className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{formatCurrency(paymentSummary.nextPayment.amount)}</div>
                        <p className="text-xs text-muted-foreground">{paymentSummary.nextPayment.concept}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{isSpanish ? "Total Año" : "Year Total"}</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(paymentSummary.totalYear)}</div>
                        <Progress value={progressPercentage} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            {/* Payments Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Receipt className="h-5 w-5" />
                        {isSpanish ? "Historial de Pagos" : "Payment History"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {paymentsData.map((payment) => {
                            const statusConfig = getStatusConfig(payment.status)
                            const StatusIcon = statusConfig.icon

                            return (
                                <div
                                    key={payment.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full bg-accent ${statusConfig.color}`}>
                                            <StatusIcon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{payment.concept}</h4>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>ID: {payment.id}</span>
                                                <span>
                                                    {isSpanish ? "Vence:" : "Due:"} {formatDate(payment.dueDate)}
                                                </span>
                                                {payment.paidDate && (
                                                    <span>
                                                        {isSpanish ? "Pagado:" : "Paid:"} {formatDate(payment.paidDate)}
                                                    </span>
                                                )}
                                            </div>
                                            {payment.method && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {isSpanish ? "Método:" : "Method:"} {payment.method}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-lg font-bold">{formatCurrency(payment.amount)}</div>
                                            <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                                        </div>
                                        <div className="flex gap-2">
                                            {payment.status === "paid" && (
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            {(payment.status === "pending" || payment.status === "overdue") && (
                                                <Button size="sm">
                                                    <CreditCard className="mr-2 h-4 w-4" />
                                                    {isSpanish ? "Pagar" : "Pay"}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
