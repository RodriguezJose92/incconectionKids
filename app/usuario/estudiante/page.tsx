"use client"
// @ts-nocheck
/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities, @next/next/no-img-element */
import { useEffect, useState } from "react"
import {
  GraduationCap,
  MessageSquare,
  Building2,
  Clock,
  CalendarDays,
  Users,
  Layers,
  BookOpen,
  User,
  Bell,
  Search,
  Plus,
  Download,
  Settings,
  ArrowLeft,
  Calendar,
  BookOpenCheck,
  FileText,
  ListTodo,
  MessageCircle,
  BarChart3,
  Filter,
  Eye,
  CheckCircle,
  Clock3,
  Reply,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Music,
  Palette,
  MapPin,
  Star,
  Mail,
  Phone,
  Award,
  Shield,
  Lock,
  Trophy,
  Edit,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const modules = [
  {
    id: "courses",
    title: "Mis Cursos",
    description: "Accede a tus materias y contenido académico",
    icon: GraduationCap,
    color: "from-blue-400/20 to-cyan-400/20",
  },
  {
    id: "communications",
    title: "Comunicaciones",
    description: "Mensajes y notificaciones importantes",
    icon: MessageSquare,
    color: "from-purple-400/20 to-pink-400/20",
  },
  {
    id: "classrooms",
    title: "Aulas",
    description: "Encuentra tus salones y ubicaciones",
    icon: Building2,
    color: "from-green-400/20 to-emerald-400/20",
  },
  {
    id: "schedule",
    title: "Horario",
    description: "Consulta tu horario de clases diario",
    icon: Clock,
    color: "from-orange-400/20 to-yellow-400/20",
  },
  {
    id: "calendar",
    title: "Calendario",
    description: "Eventos, exámenes y fechas importantes",
    icon: CalendarDays,
    color: "from-red-400/20 to-rose-400/20",
  },
  {
    id: "social",
    title: "Social Club",
    description: "Conecta con otros estudiantes",
    icon: Users,
    color: "from-indigo-400/20 to-blue-400/20",
  },
  {
    id: "groups",
    title: "Grupos Institucionales",
    description: "Participa en actividades del colegio",
    icon: Layers,
    color: "from-teal-400/20 to-cyan-400/20",
  },
  {
    id: "library",
    title: "Biblioteca Virtual",
    description: "Recursos digitales y libros electrónicos",
    icon: BookOpen,
    color: "from-violet-400/20 to-purple-400/20",
  },
  {
    id: "profile",
    title: "Perfil",
    description: "Gestiona tu información personal",
    icon: User,
    color: "from-slate-400/20 to-gray-400/20",
  },
]

const quickActions = [
  { icon: Bell, label: "Notificaciones", color: "text-blue-600" },
  { icon: Search, label: "Buscar", color: "text-green-600" },
  { icon: Plus, label: "Nuevo", color: "text-purple-600" },
  { icon: Download, label: "Descargas", color: "text-orange-600" },
  { icon: Settings, label: "Configuración", color: "text-gray-600" },
]

const courses = [
  {
    id: "math",
    name: "Matemáticas",
    teacher: "Prof. Carlos Mendoza",
    grade: "A-",
    progress: 85,
    nextClass: "Lunes 8:00 AM",
    description: "Álgebra avanzada y cálculo diferencial. Actualmente estudiando límites y derivadas.",
    assignments: 2,
    color: "from-blue-500/20 to-cyan-500/20",
    icon: "📐",
  },
  {
    id: "physics",
    name: "Física",
    teacher: "Prof. Ana Rodríguez",
    grade: "B+",
    progress: 78,
    nextClass: "Martes 10:00 AM",
    description: "Mecánica clásica y termodinámica. Explorando las leyes de Newton y conservación de energía.",
    assignments: 1,
    color: "from-purple-500/20 to-pink-500/20",
    icon: "⚛️",
  },
  {
    id: "biology",
    name: "Biología",
    teacher: "Prof. Luis García",
    grade: "A",
    progress: 92,
    nextClass: "Miércoles 9:00 AM",
    description: "Biología molecular y genética. Estudiando la estructura del ADN y procesos de replicación.",
    assignments: 0,
    color: "from-green-500/20 to-emerald-500/20",
    icon: "🧬",
  },
  {
    id: "chemistry",
    name: "Química",
    teacher: "Prof. María López",
    grade: "B",
    progress: 73,
    nextClass: "Jueves 11:00 AM",
    description: "Química orgánica e inorgánica. Analizando reacciones químicas y enlaces moleculares.",
    assignments: 3,
    color: "from-orange-500/20 to-yellow-500/20",
    icon: "🧪",
  },
  {
    id: "literature",
    name: "Literatura",
    teacher: "Prof. Carmen Silva",
    grade: "A-",
    progress: 88,
    nextClass: "Viernes 2:00 PM",
    description: "Literatura latinoamericana contemporánea. Análisis de obras de García Márquez y Vargas Llosa.",
    assignments: 1,
    color: "from-red-500/20 to-rose-500/20",
    icon: "📚",
  },
  {
    id: "history",
    name: "Historia",
    teacher: "Prof. Roberto Díaz",
    grade: "B+",
    progress: 80,
    nextClass: "Lunes 1:00 PM",
    description: "Historia mundial del siglo XX. Estudiando las guerras mundiales y sus consecuencias sociales.",
    assignments: 2,
    color: "from-indigo-500/20 to-blue-500/20",
    icon: "🏛️",
  },
]

const conversations = [
  {
    id: 1,
    name: "Prof. María González",
    subject: "Matemáticas",
    lastMessage: "Recuerda entregar la tarea de álgebra mañana",
    time: "10:30 AM",
    unread: 2,
    avatar: "MG",
    type: "teacher",
  },
  {
    id: 2,
    name: "Administración",
    subject: "Aviso Importante",
    lastMessage: "Reunión de padres programada para el viernes",
    time: "9:15 AM",
    unread: 1,
    avatar: "AD",
    type: "admin",
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    subject: "Proyecto de Ciencias",
    lastMessage: "¿Podemos reunirnos después de clases?",
    time: "Ayer",
    unread: 0,
    avatar: "CM",
    type: "student",
  },
  {
    id: 4,
    name: "Prof. Ana Ruiz",
    subject: "Literatura",
    lastMessage: "Excelente ensayo sobre García Márquez",
    time: "Ayer",
    unread: 0,
    avatar: "AR",
    type: "teacher",
  },
]

const messages = [
  {
    id: 1,
    sender: "Prof. María González",
    content:
      "Hola, espero que estés bien. Quería recordarte que mañana es la fecha límite para entregar la tarea de álgebra.",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "Tú",
    content: "Gracias por el recordatorio, profesora. Ya tengo la tarea lista, la entregaré en la primera hora.",
    time: "10:35 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Prof. María González",
    content: "Perfecto. También quería comentarte que tu desempeño en el último examen fue excelente. ¡Sigue así!",
    time: "10:40 AM",
    isOwn: false,
  },
]

const institutionalGroups = [
  {
    id: 1,
    name: "Grupo de Guitarras",
    description: "Aprende a tocar guitarra clásica y moderna",
    teacher: "Prof. Carlos Mendoza",
    members: 24,
    schedule: "Martes y Jueves 3:00 PM - 4:30 PM",
    icon: "",
    category: "Música",
    level: "Principiante - Avanzado",
  },
  {
    id: 2,
    name: "Grupo de Baile",
    description: "Danza moderna, folclórica y contemporánea",
    teacher: "Prof. Ana Rodríguez",
    members: 32,
    schedule: "Lunes y Miércoles 4:00 PM - 5:30 PM",
    location: "Salón de Danza",
    icon: "",
    category: "Arte",
    level: "Todos los niveles",
  },
  {
    id: 3,
    name: "Banda Musical",
    description: "Conjunto musical con diversos instrumentos",
    teacher: "Prof. Miguel Torres",
    members: 18,
    schedule: "Viernes 2:00 PM - 4:00 PM",
    location: "Auditorio Principal",
    icon: "",
    category: "Música",
    level: "Intermedio - Avanzado",
  },
  {
    id: 4,
    name: "Club de Inglés",
    description: "Conversación y práctica del idioma inglés",
    teacher: "Prof. Sarah Johnson",
    members: 28,
    schedule: "Martes y Jueves 2:00 PM - 3:00 PM",
    location: "Aula 205",
    icon: "",
    category: "Idiomas",
    level: "Intermedio",
  },
  {
    id: 5,
    name: "Emisora Estudiantil",
    description: "Producción y transmisión de contenido radial",
    teacher: "Prof. Roberto Silva",
    members: 15,
    schedule: "Lunes a Viernes 12:00 PM - 1:00 PM",
    location: "Cabina de Radio",
    icon: "",
    category: "Comunicación",
    level: "Todos los niveles",
  },
  {
    id: 6,
    name: "Teatro Escolar",
    description: "Actuación, expresión corporal y montajes teatrales",
    teacher: "Prof. Laura Vásquez",
    members: 22,
    schedule: "Miércoles y Viernes 3:30 PM - 5:00 PM",
    location: "Teatro del Colegio",
    icon: "",
    category: "Arte",
    level: "Principiante - Intermedio",
  },
]

export default function StudentDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentView, setCurrentView] = useState<
    | "dashboard"
    | "courses"
    | "virtualClassroom"
    | "communications"
    | "classrooms"
    | "schedule"
    | "calendar"
    | "institutionalGroups"
    | "profile" // agregando estado para vista de perfil
  >("dashboard")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeTab, setActiveTab] = useState("contenido")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("fecha")
  const [showPendingOnly, setShowPendingOnly] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")
  const [showNewConversationModal, setShowNewConversationModal] = useState(false)
  const [newConversationRecipient, setNewConversationRecipient] = useState("")
  const [newConversationSubject, setNewConversationSubject] = useState("")
  const [newConversationMessage, setNewConversationMessage] = useState("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === "courses") {
      setCurrentView("courses")
    } else if (moduleId === "communications") {
      setCurrentView("communications")
    } else if (moduleId === "classrooms") {
      setCurrentView("classrooms")
    } else if (moduleId === "schedule") {
      setCurrentView("schedule")
    } else if (moduleId === "calendar") {
      setCurrentView("calendar")
    } else if (moduleId === "groups") {
      setCurrentView("institutionalGroups")
    } else if (moduleId === "profile") {
      // agregando manejo de click para perfil
      setCurrentView("profile")
    }
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
  }

  const handleVirtualClassroom = (course) => {
    setSelectedCourse(course)
    setCurrentView("virtualClassroom")
  }

  const courseContent = [
    {
      id: 1,
      title: "Syllabus del Curso",
      type: "Documento",
      date: "2024-01-15",
      size: "2.3 MB",
      status: "leído",
    },
    {
      id: 2,
      title: "Clase 1: Introducción a Límites",
      type: "Video",
      date: "2024-01-20",
      size: "45.2 MB",
      status: "no leído",
    },
    {
      id: 3,
      title: "Tema 2: Derivadas Básicas",
      type: "Presentación",
      date: "2024-01-25",
      size: "8.7 MB",
      status: "leído",
    },
    {
      id: 4,
      title: "Ejercicios Prácticos - Semana 3",
      type: "Documento",
      date: "2024-02-01",
      size: "1.8 MB",
      status: "no leído",
    },
  ]

  const activities = [
    {
      id: 1,
      title: "Tarea 1: Límites y Continuidad",
      description: "Resolver ejercicios del capítulo 2, problemas 1-15",
      dueDate: "2024-02-15",
      status: "Pendiente",
      progress: 0,
    },
    {
      id: 2,
      title: "Quiz: Derivadas Básicas",
      description: "Evaluación sobre conceptos fundamentales de derivación",
      dueDate: "2024-02-10",
      status: "Entregado",
      progress: 100,
    },
    {
      id: 3,
      title: "Proyecto: Aplicaciones de Cálculo",
      description: "Investigación sobre aplicaciones reales del cálculo diferencial",
      dueDate: "2024-02-20",
      status: "Atrasado",
      progress: 30,
    },
  ]

  const forumThreads = [
    {
      id: 1,
      title: "Dudas sobre límites infinitos",
      author: "Carlos Mendoza",
      replies: 12,
      views: 45,
      lastActivity: "Hace 2 horas",
      isPinned: true,
      isClosed: false,
    },
    {
      id: 2,
      title: "Recursos adicionales para derivadas",
      author: "Ana García",
      replies: 8,
      views: 23,
      lastActivity: "Hace 1 día",
      isPinned: false,
      isClosed: false,
    },
    {
      id: 3,
      title: "Fechas de exámenes parciales",
      author: "Prof. Carlos Mendoza",
      replies: 3,
      views: 67,
      lastActivity: "Hace 3 días",
      isPinned: true,
      isClosed: true,
    },
  ]

  const grades = [
    {
      activity: "Quiz 1: Límites",
      submission: "2024-01-28",
      score: "18/20",
      feedback: "Excelente comprensión de conceptos básicos",
      status: "Calificado",
    },
    {
      activity: "Tarea 1: Ejercicios",
      submission: "2024-02-05",
      score: "15/20",
      feedback: "Revisar procedimientos en problemas 8-10",
      status: "Calificado",
    },
    {
      activity: "Participación Foro",
      submission: "Continua",
      score: "10/10",
      feedback: "Participación activa y constructiva",
      status: "En revisión",
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aquí se agregaría la lógica para enviar el mensaje
      console.log("Enviando mensaje:", newMessage)
      setNewMessage("")
    }
  }

  const handleCreateConversation = () => {
    if (newConversationRecipient.trim() && newConversationSubject.trim() && newConversationMessage.trim()) {
      // Aquí se agregaría la lógica para crear la conversación
      console.log("Creando conversación:", {
        recipient: newConversationRecipient,
        subject: newConversationSubject,
        message: newConversationMessage,
      })

      // Resetear formulario y cerrar modal
      setNewConversationRecipient("")
      setNewConversationSubject("")
      setNewConversationMessage("")
      setShowNewConversationModal(false)
    }
  }

  const scheduleData = [
    {
      day: "Lunes",
      classes: [
        { time: "08:00 - 09:30", subject: "Matemáticas", teacher: "Prof. García", room: "Aula 101", pending: 2 },
        { time: "10:00 - 11:30", subject: "Física", teacher: "Prof. Rodríguez", room: "Lab. Física", pending: 1 },
        { time: "14:00 - 15:30", subject: "Literatura", teacher: "Prof. Martínez", room: "Aula 205", pending: 0 },
      ],
    },
    {
      day: "Martes",
      classes: [
        { time: "08:00 - 09:30", subject: "Química", teacher: "Prof. López", room: "Lab. Química", pending: 3 },
        { time: "10:00 - 11:30", subject: "Historia", teacher: "Prof. Fernández", room: "Aula 103", pending: 1 },
        { time: "13:00 - 14:30", subject: "Biología", teacher: "Prof. Morales", room: "Lab. Biología", pending: 0 },
      ],
    },
    {
      day: "Miércoles",
      classes: [
        { time: "08:00 - 09:30", subject: "Matemáticas", teacher: "Prof. García", room: "Aula 101", pending: 1 },
        { time: "10:00 - 11:30", subject: "Literatura", teacher: "Prof. Martínez", room: "Aula 205", pending: 2 },
        { time: "15:00 - 16:30", subject: "Educación Física", teacher: "Prof. Ruiz", room: "Gimnasio", pending: 0 },
      ],
    },
    {
      day: "Jueves",
      classes: [
        { time: "08:00 - 09:30", subject: "Física", teacher: "Prof. Rodríguez", room: "Lab. Física", pending: 0 },
        { time: "10:00 - 11:30", subject: "Química", teacher: "Prof. López", room: "Lab. Química", pending: 2 },
        { time: "14:00 - 15:30", subject: "Historia", teacher: "Prof. Fernández", room: "Aula 103", pending: 1 },
      ],
    },
    {
      day: "Viernes",
      classes: [
        { time: "08:00 - 09:30", subject: "Biología", teacher: "Prof. Morales", room: "Lab. Biología", pending: 1 },
        { time: "10:00 - 11:30", subject: "Matemáticas", teacher: "Prof. García", room: "Aula 101", pending: 0 },
        { time: "13:00 - 14:30", subject: "Arte", teacher: "Prof. Silva", room: "Taller Arte", pending: 0 },
      ],
    },
  ]

  const calendarData = {
    currentMonth: "Diciembre 2024",
    events: {
      "2024-12-02": [
        { type: "exam", title: "Examen de Matemáticas", time: "10:00 AM" },
        { type: "assignment", title: "Entrega Ensayo Historia", time: "11:59 PM" },
      ],
      "2024-12-05": [{ type: "activity", title: "Feria de Ciencias", time: "2:00 PM" }],
      "2024-12-10": [{ type: "exam", title: "Examen de Física", time: "9:00 AM" }],
      "2024-12-12": [{ type: "assignment", title: "Proyecto de Biología", time: "11:59 PM" }],
      "2024-12-15": [{ type: "holiday", title: "Vacaciones de Invierno", time: "Todo el día" }],
      "2024-12-18": [{ type: "activity", title: "Ceremonia de Graduación", time: "6:00 PM" }],
      "2024-12-20": [{ type: "exam", title: "Examen Final Literatura", time: "8:00 AM" }],
      "2024-12-25": [{ type: "holiday", title: "Navidad", time: "Todo el día" }],
    },
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const year = 2024
    const month = 11 // Diciembre (0-indexed)
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      days.push({
        day,
        dateKey,
        events: calendarData.events[dateKey] || [],
      })
    }

    return days
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-500"
      case "assignment":
        return "bg-orange-500"
      case "activity":
        return "bg-blue-500"
      case "holiday":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (currentView === "profile") {

    return (
      <div className="min-h-screen bg-[#ffffff00] w-full" style={{ backdropFilter: 'blur(10px)' }} >
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToDashboard}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-600">Gestiona tu información personal y académica</p>
              </div>
            </div>
          </header>

          {/* Perfil del usuario */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tarjeta de información personal */}
              <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                    MA
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">María Alejandra González</h2>
                    <p className="text-gray-600">Estudiante de 11° Grado</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Activo</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Información Personal</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">maria.gonzalez@colegio.edu</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">+57 300 123 4567</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Bogotá, Colombia</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">15 de Marzo, 2007</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Información Académica</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">11° Grado - Sección A</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">ID Estudiante: 2024-1101</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Promedio: 4.2/5.0</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Representante de Curso</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuraciones de cuenta */}
              <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Configuraciones de Cuenta</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Notificaciones</p>
                        <p className="text-sm text-gray-600">Recibir alertas de tareas y eventos</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Privacidad</p>
                        <p className="text-sm text-gray-600">Controlar quién puede ver tu perfil</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Seguridad</p>
                        <p className="text-sm text-gray-600">Cambiar contraseña y configurar 2FA</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Gestionar
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="space-y-6">
              {/* Estadísticas rápidas */}
              <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Estadísticas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Materias cursando</span>
                    <span className="font-bold text-blue-600">6</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tareas pendientes</span>
                    <span className="font-bold text-orange-600">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Grupos activos</span>
                    <span className="font-bold text-green-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Asistencia</span>
                    <span className="font-bold text-purple-600">95%</span>
                  </div>
                </div>
              </div>

              {/* Logros recientes */}
              <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Logros Recientes</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50/50 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-gray-900">Mejor Promedio</p>
                      <p className="text-sm text-gray-600">Octubre 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg">
                    <Star className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Participación Activa</p>
                      <p className="text-sm text-gray-600">Septiembre 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50/50 rounded-lg">
                    <Trophy className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Proyecto Destacado</p>
                      <p className="text-sm text-gray-600">Agosto 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Certificados
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Historial Académico
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "institutionalGroups") {
    return (
      <div className="min-h-screen bg-[#ffffff00] w-full" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToDashboard}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Grupos Institucionales</h1>
                <p className="text-gray-600">Únete a los grupos extracurriculares del colegio</p>
              </div>
            </div>
          </header>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grupos Disponibles</p>
                  <p className="text-xl font-semibold text-gray-900">{institutionalGroups.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Miembros</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {institutionalGroups.reduce((total, group) => total + group.members, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grupos Musicales</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {institutionalGroups.filter((group) => group.category === "Música").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grupos Artísticos</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {institutionalGroups.filter((group) => group.category === "Arte").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de grupos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutionalGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{group.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{group.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{group.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{group.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{group.members} miembros</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{group.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>{group.level}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  Unirse al Grupo
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "calendar") {
    const calendarDays = generateCalendarDays()
    const totalEvents = Object.values(calendarData.events).flat().length

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 hover:bg-white/50"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Calendario Académico</h1>
                <p className="text-gray-600">Eventos, exámenes y fechas importantes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Eventos este mes</p>
                <p className="text-2xl font-bold text-blue-600">{totalEvents}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
            </div>
          </header>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Exámenes</p>
                  <p className="text-xl font-bold text-gray-800">3</p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tareas</p>
                  <p className="text-xl font-bold text-gray-800">2</p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Actividades</p>
                  <p className="text-xl font-bold text-gray-800">2</p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Feriados</p>
                  <p className="text-xl font-bold text-gray-800">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendario */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            {/* Header del calendario */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{calendarData.currentMonth}</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Días del calendario */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dayData, index) => (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 rounded-lg border ${dayData
                    ? "bg-white/40 border-gray-200 hover:bg-white/60 transition-colors cursor-pointer"
                    : "bg-transparent border-transparent"
                    }`}
                >
                  {dayData && (
                    <>
                      <div className="text-sm font-medium text-gray-800 mb-1">{dayData.day}</div>
                      <div className="space-y-1">
                        {dayData.events.slice(0, 2).map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className={`text-xs px-2 py-1 rounded text-white ${getEventTypeColor(event.type)}`}
                            title={`${event.title} - ${event.time}`}
                          >
                            {event.title.length > 15 ? `${event.title.substring(0, 15)}...` : event.title}
                          </div>
                        ))}
                        {dayData.events.length > 2 && (
                          <div className="text-xs text-gray-500 px-2">+{dayData.events.length - 2} más</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Leyenda */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Exámenes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">Tareas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Actividades</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Feriados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "classrooms") {

    const classrooms = [
      {
        id: "A101",
        name: "Aula A-101",
        type: "Aula Regular",
        capacity: 30,
        equipment: ["Proyector", "Pizarra Digital", "Audio"],
        status: "available",
        nextReservation: "14:00 - 15:30",
        floor: "Primer Piso",
        building: "Edificio A",
      },
      {
        id: "B205",
        name: "Laboratorio B-205",
        type: "Laboratorio de Ciencias",
        capacity: 25,
        equipment: ["Microscopios", "Proyector", "Campana Extractora"],
        status: "occupied",
        currentClass: "Biología - Prof. García",
        floor: "Segundo Piso",
        building: "Edificio B",
      },
      {
        id: "C301",
        name: "Aula C-301",
        type: "Aula de Informática",
        capacity: 35,
        equipment: ["30 Computadoras", "Proyector", "Aire Acondicionado"],
        status: "reserved",
        reservedBy: "Prof. Martínez",
        reservationTime: "10:00 - 11:30",
        floor: "Tercer Piso",
        building: "Edificio C",
      },
      {
        id: "D102",
        name: "Auditorio D-102",
        type: "Auditorio",
        capacity: 150,
        equipment: ["Sistema de Audio", "Proyector HD", "Escenario", "Micrófonos"],
        status: "available",
        nextReservation: "16:00 - 18:00",
        floor: "Primer Piso",
        building: "Edificio D",
      },
      {
        id: "A203",
        name: "Aula A-203",
        type: "Aula Regular",
        capacity: 28,
        equipment: ["Proyector", "Pizarra", "Ventiladores"],
        status: "maintenance",
        maintenanceReason: "Reparación de aire acondicionado",
        floor: "Segundo Piso",
        building: "Edificio A",
      },
      {
        id: "B104",
        name: "Biblioteca B-104",
        type: "Sala de Estudio",
        capacity: 40,
        equipment: ["Mesas de Estudio", "WiFi", "Enchufes", "Silencio"],
        status: "available",
        floor: "Primer Piso",
        building: "Edificio B",
      },
    ]

    const getStatusColor = (status: string) => {
      switch (status) {
        case "available":
          return "bg-green-100 text-green-800 border-green-200"
        case "occupied":
          return "bg-red-100 text-red-800 border-red-200"
        case "reserved":
          return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "maintenance":
          return "bg-gray-100 text-gray-800 border-gray-200"
        default:
          return "bg-gray-100 text-gray-800 border-gray-200"
      }
    }

    const getStatusText = (status: string) => {
      switch (status) {
        case "available":
          return "Disponible"
        case "occupied":
          return "Ocupada"
        case "reserved":
          return "Reservada"
        case "maintenance":
          return "Mantenimiento"
        default:
          return "Desconocido"
      }
    }

    return (
      <div className="min-h-[100dvh] bg-[#ffffff00] w-full overflow-auto" style={{ backdropFilter: 'blur(10px)', position: 'absolute' }}>
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("dashboard")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 backdrop-blur-sm flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestión de Aulas</h1>
                  <p className="text-gray-600">Consulta disponibilidad y reserva aulas</p>
                </div>
              </div>
            </div>
          </header>

          {/* Filtros y estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Disponibles</p>
                  <p className="text-xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ocupadas</p>
                  <p className="text-xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reservadas</p>
                  <p className="text-xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mantenimiento</p>
                  <p className="text-xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de aulas */}
          <div className="space-y-4">
            {classrooms.map((classroom) => (
              <div
                key={classroom.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{classroom.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(classroom.status)}`}
                      >
                        {getStatusText(classroom.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Tipo</p>
                        <p className="font-medium text-gray-900">{classroom.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Capacidad</p>
                        <p className="font-medium text-gray-900">{classroom.capacity} personas</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ubicación</p>
                        <p className="font-medium text-gray-900">
                          {classroom.building} - {classroom.floor}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Equipamiento</p>
                        <p className="font-medium text-gray-900">{classroom.equipment.length} elementos</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {classroom.equipment.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                          {item}
                        </span>
                      ))}
                    </div>

                    {classroom.status === "occupied" && classroom.currentClass && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-red-800">
                          <strong>Clase actual:</strong> {classroom.currentClass}
                        </p>
                      </div>
                    )}

                    {classroom.status === "reserved" && classroom.reservedBy && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Reservada por:</strong> {classroom.reservedBy} ({classroom.reservationTime})
                        </p>
                      </div>
                    )}

                    {classroom.status === "maintenance" && classroom.maintenanceReason && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-800">
                          <strong>Motivo:</strong> {classroom.maintenanceReason}
                        </p>
                      </div>
                    )}

                    {classroom.nextReservation && classroom.status === "available" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-800">
                          <strong>Próxima reserva:</strong> {classroom.nextReservation}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {classroom.status === "available" && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        Reservar
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 bg-transparent">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "virtualClassroom" && selectedCourse) {
    return (
      <div className="min-h-screen bg-[#ffffff00] w-full" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          <header className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
              <span>Inicio</span>
              <span>/</span>
              <span>Mis cursos</span>
              <span>/</span>
              <span className="font-medium text-slate-800">{selectedCourse.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView("courses")}
                  className="backdrop-blur-md bg-white/40 border border-white/20 shadow-lg hover:bg-white/60"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Cursos
                </Button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{selectedCourse.name}</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-slate-600">Periodo 1</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-blue-500 text-white">
                          {selectedCourse.teacher
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-slate-600">{selectedCourse.teacher}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800">2</div>
                  <div className="text-xs text-slate-600">Próximas entregas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800">3</div>
                  <div className="text-xs text-slate-600">Anuncios nuevos</div>
                </div>
              </div>
            </div>
          </header>

          <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por título o etiquetas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 border-white/20"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white/50 border-white/20">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fecha">Fecha límite</SelectItem>
                    <SelectItem value="publicacion">Publicación</SelectItem>
                    <SelectItem value="actividad">Última actividad</SelectItem>
                    <SelectItem value="alfabetico">A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant={showPendingOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPendingOnly(!showPendingOnly)}
                className="bg-white/50 border-white/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Solo pendientes
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 backdrop-blur-md bg-white/40 border border-white/20">
              <TabsTrigger value="contenido" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Contenido</span>
              </TabsTrigger>
              <TabsTrigger value="actividades" className="flex items-center gap-2">
                <ListTodo className="w-4 h-4" />
                <span className="hidden sm:inline">Actividades</span>
              </TabsTrigger>
              <TabsTrigger value="foros" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Foros</span>
              </TabsTrigger>
              <TabsTrigger value="calificaciones" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Calificaciones</span>
              </TabsTrigger>
              <TabsTrigger value="planificacion" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Planificación</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contenido" className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Material del Curso</h2>
              <div className="grid gap-4">
                {courseContent.map((item) => (
                  <div
                    key={item.id}
                    className="backdrop-blur-md bg-white/40 border border-white/20 rounded-xl p-4 hover:bg-white/60 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">{item.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                            <span>{item.type}</span>
                            <span>{item.date}</span>
                            <span>{item.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === "leído" && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Leído
                          </Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="actividades" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-800">Actividades</h2>
                <div className="flex gap-2">
                  <Select defaultValue="todas">
                    <SelectTrigger className="w-32 bg-white/50 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="pendientes">Pendientes</SelectItem>
                      <SelectItem value="entregadas">Entregadas</SelectItem>
                      <SelectItem value="atrasadas">Atrasadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="backdrop-blur-md bg-white/40 border border-white/20 rounded-xl p-6 hover:bg-white/60 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-2">{activity.title}</h3>
                        <p className="text-slate-600 text-sm mb-3">{activity.description}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock3 className="w-4 h-4" />
                            <span>Fecha límite: {activity.dueDate}</span>
                          </div>
                          <Badge
                            variant={
                              activity.status === "Pendiente"
                                ? "default"
                                : activity.status === "Entregado"
                                  ? "secondary"
                                  : activity.status === "Atrasado"
                                    ? "destructive"
                                    : "default"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600 mb-2">Progreso</div>
                        <div className="text-lg font-bold text-slate-800">{activity.progress}%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="w-full bg-white/50 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${activity.status === "Entregado"
                              ? "bg-green-500"
                              : activity.status === "Atrasado"
                                ? "bg-red-500"
                                : "bg-blue-500"
                              }`}
                            style={{ width: `${activity.progress}%` }}
                          />
                        </div>
                      </div>
                      <Button size="sm">{activity.status === "Pendiente" ? "Entregar" : "Ver"}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="foros" className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Foros de Discusión</h2>
              <div className="grid gap-4">
                {forumThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="backdrop-blur-md bg-white/40 border border-white/20 rounded-xl p-4 hover:bg-white/60 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-slate-800">{thread.title}</h3>
                          {thread.isPinned && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                              Fijado
                            </Badge>
                          )}
                          {thread.isClosed && (
                            <Badge variant="outline" className="text-slate-500">
                              Cerrado
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                          <span>Por {thread.author}</span>
                          <span>{thread.replies} respuestas</span>
                          <span>{thread.views} vistas</span>
                        </div>
                        <div className="text-xs text-slate-500">Última actividad: {thread.lastActivity}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver hilo
                        </Button>
                        {!thread.isClosed && (
                          <Button size="sm">
                            <Reply className="w-4 h-4 mr-2" />
                            Participar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calificaciones" className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Calificaciones</h2>
              <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/20">
                      <tr>
                        <th className="text-left p-4 font-medium text-slate-700">Actividad</th>
                        <th className="text-left p-4 font-medium text-slate-700">Entrega</th>
                        <th className="text-left p-4 font-medium text-slate-700">Puntaje</th>
                        <th className="text-left p-4 font-medium text-slate-700">Retroalimentación</th>
                        <th className="text-left p-4 font-medium text-slate-700">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade, index) => (
                        <tr key={index} className="border-t border-white/20">
                          <td className="p-4 font-medium text-slate-800">{grade.activity}</td>
                          <td className="p-4 text-slate-600">{grade.submission}</td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-800">{grade.score}</span>
                          </td>
                          <td className="p-4 text-slate-600 max-w-xs truncate">{grade.feedback}</td>
                          <td className="p-4">
                            <Badge variant={grade.status === "Calificado" ? "secondary" : "default"}>
                              {grade.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="planificacion" className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Planificación del Curso</h2>
              <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-xl p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                    <div key={day} className="text-center font-medium text-slate-700 p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => (
                    <div
                      key={i}
                      className="aspect-square p-2 text-center text-sm border border-white/20 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      {i + 1 <= 28 ? i + 1 : ""}
                      {(i === 9 || i === 16) && <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>}
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-600">Clases programadas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-slate-600">Fechas de entrega</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  if (currentView === "courses") {
    return (
      <div className="min-h-screen bg-[#ffffff00] w-full" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToDashboard}
                className="backdrop-blur-md bg-white/40 border border-white/20 shadow-lg hover:bg-white/60"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Mis Cursos
                </h1>
                <p className="text-slate-600 mt-1 font-medium">Gestiona tus materias académicas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700">María González</p>
                <p className="text-xs text-slate-500">11° Grado - Sección A</p>
              </div>
              <Avatar className="h-12 w-12 ring-2 ring-white/50 shadow-lg">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="María González" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                  MG
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-md border border-white/20 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{course.icon}</div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{course.name}</h3>
                        <p className="text-sm text-slate-600">{course.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-800">{course.grade}</div>
                      <div className="text-xs text-slate-600">Calificación</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">Progreso</span>
                      <span className="text-sm text-slate-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{course.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>Próxima clase: {course.nextClass}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <BookOpenCheck className="w-4 h-4" />
                      <span>{course.assignments} tareas pendientes</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-300"
                    size="sm"
                    onClick={() => handleVirtualClassroom(course)}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Acceder al Aula Virtual
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">6</div>
              <div className="text-sm text-slate-600">Cursos Activos</div>
            </div>
            <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">9</div>
              <div className="text-sm text-slate-600">Tareas Pendientes</div>
            </div>
            <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">82%</div>
              <div className="text-sm text-slate-600">Progreso Promedio</div>
            </div>
            <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">B+</div>
              <div className="text-sm text-slate-600">Promedio General</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "communications") {
    return (
      <div className="min-h-screen bg-[#ffffff00] w-full" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("dashboard")}
                className="text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Comunicaciones</h1>
                <p className="text-slate-600">Mensajes y notificaciones</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowNewConversationModal(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Conversación
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                JS
              </div>
            </div>
          </header>

          {/* Interfaz de mensajería */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Lista de conversaciones */}
            <div className="lg:col-span-1">
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl h-full">
                <div className="p-6 border-b border-white/20">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">Conversaciones</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar conversaciones..."
                      className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100%-120px)]">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/20 ${selectedConversation === conversation.id ? "bg-white/30" : ""
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${conversation.type === "teacher"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600"
                            : conversation.type === "admin"
                              ? "bg-gradient-to-br from-red-500 to-red-600"
                              : "bg-gradient-to-br from-green-500 to-green-600"
                            }`}
                        >
                          {conversation.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-slate-800 text-sm truncate">{conversation.name}</h3>
                            <span className="text-xs text-slate-500">{conversation.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mb-1">{conversation.subject}</p>
                          <p className="text-xs text-slate-500 truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <div className="mt-2">
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                {conversation.unread}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Área de chat */}
            <div className="lg:col-span-2">
              <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl h-full flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Header del chat */}
                    <div className="p-6 border-b border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          MG
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">Prof. María González</h3>
                          <p className="text-sm text-slate-600">Matemáticas</p>
                        </div>
                      </div>
                    </div>

                    {/* Mensajes */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.isOwn
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                              : "bg-white/60 backdrop-blur-sm text-slate-800"
                              }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-slate-500"}`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input para nuevo mensaje */}
                    <div className="p-6 border-t border-white/20">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Escribe tu mensaje..."
                          className="flex-1 px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <Button
                          onClick={handleSendMessage}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Selecciona una conversación</h3>
                      <p className="text-slate-500">Elige una conversación para comenzar a chatear</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showNewConversationModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl w-full max-w-md">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Nueva Conversación</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewConversationModal(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Destinatario</label>
                      <input
                        type="text"
                        value={newConversationRecipient}
                        onChange={(e) => setNewConversationRecipient(e.target.value)}
                        placeholder="Nombre del profesor o estudiante..."
                        className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Asunto</label>
                      <input
                        type="text"
                        value={newConversationSubject}
                        onChange={(e) => setNewConversationSubject(e.target.value)}
                        placeholder="Asunto del mensaje..."
                        className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Mensaje</label>
                      <textarea
                        value={newConversationMessage}
                        onChange={(e) => setNewConversationMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        rows={4}
                        className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button variant="ghost" onClick={() => setShowNewConversationModal(false)} className="flex-1">
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleCreateConversation}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                    >
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#ffffff00] w-full" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        <header
          className={`flex items-center justify-between mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              ¡Hola, María!
            </h1>
            <p className="text-slate-600 mt-1 font-medium">Bienvenida a tu panel estudiantil</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">María González</p>
              <p className="text-xs text-slate-500">11° Grado - Sección A</p>
            </div>
            <Avatar className="h-12 w-12 ring-2 ring-white/50 shadow-lg">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="María González" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                MG
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div
          className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Acciones Rápidas</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Button
                  key={action.label}
                  variant="ghost"
                  size="sm"
                  className={`flex-shrink-0 backdrop-blur-md bg-white/40 border border-white/20 shadow-lg hover:bg-white/60 transition-all duration-300 delay-${index * 100}`}
                  style={{
                    animationDelay: `${(index + 3) * 100}ms`,
                    animation: isVisible ? "slideInUp 0.6s ease-out forwards" : "none",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <IconComponent className={`w-4 h-4 mr-2 ${action.color}`} />
                  {action.label}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon
            return (
              <div
                key={module.id}
                className={`group relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/40 border border-white/20 shadow-xl cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{
                  animationDelay: `${(index + 8) * 100}ms`,
                }}
                onClick={() => handleModuleClick(module.id)}
              >
                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-slate-700" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-lg mb-2">{module.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{module.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={`mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">8</div>
            <div className="text-sm text-slate-600">Materias Activas</div>
          </div>
          <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">3</div>
            <div className="text-sm text-slate-600">Tareas Pendientes</div>
          </div>
          <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">92%</div>
            <div className="text-sm text-slate-600">Asistencia</div>
          </div>
          <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">A-</div>
            <div className="text-sm text-slate-600">Promedio General</div>
          </div>
        </div>
      </div>
    </div>
  )
}
