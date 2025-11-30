"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  UserPlus,
  Settings,
  Search,
  Upload,
  Edit,
  UserMinus,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { ProfilesStore, type Profile } from "@/Stores/profilesStore";
import { createClient } from "@/lib/supabase/client";
import { InstituteStore } from "@/Stores/InstituteStore";
import { toast } from "react-toastify";
import { rolesListProps } from "./types";
import { EstudenteEnrrolledStore } from "@/Stores/studentEnrolledStore";
import { TeacherEnrrolledStore } from "@/Stores/teacherEnrolledStore";
import {
  AdminEnrrolledStore,
  type Enrolled,
} from "@/Stores/adminEnrolledStore";
import { ParentEnrolledStore } from "@/Stores/parentEnrolledStore";
import { PeriodAcademicStore } from "@/Stores/periodAcademicStore";
import { ParentHasStudentStore } from "@/Stores/ParentHasStudentStore";

export function UsersManagement() {
  /** Inciamos cliente de supaBase */
  const supabase = createClient();

  /** HTML References */
  const inputRolName = useRef<HTMLInputElement>(null);
  const inputDescriptionRol = useRef<HTMLInputElement>(null);

  /** GlobalStates */
  const institute_id = InstituteStore((t) => t.institute.id);

  /** Functionales */
  const [statusCreateRol, setStatusCreateRol] = useState<boolean>(false);
  const [rolesList, setRolesList] = useState<any>([]);

  const [activeTab, setActiveTab] = useState("usuarios");
  const [searchUsuarios, setSearchUsuarios] = useState("");
  const [searchRoles, setSearchRoles] = useState("");
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isAssignUsersOpen, setIsAssignUsersOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  /** Estados para la sección de activos */
  const [activeSubTab, setActiveSubTab] = useState<
    "estudiantes" | "profesores" | "administracion" | "padres" | "familia"
  >("estudiantes");
  const [searchActivos, setSearchActivos] = useState("");
  const [filterPeriodId, setFilterPeriodId] = useState<string>("todos");
  const [isCreateEnrolledOpen, setIsCreateEnrolledOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedAcademicPeriodId, setSelectedAcademicPeriodId] = useState("");
  const [academicPeriods, setAcademicPeriods] = useState<any[]>([]);
  const [isCreatingEnrolled, setIsCreatingEnrolled] = useState(false);

  /** Estados para el modal de relaciones padre-estudiante */
  const [isParentStudentModalOpen, setIsParentStudentModalOpen] = useState(false);
  const [parentUsers, setParentUsers] = useState<Profile[]>([]);
  const [studentUsers, setStudentUsers] = useState<Profile[]>([]);
  const [selectedParentId, setSelectedParentId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [isCreatingRelation, setIsCreatingRelation] = useState(false);



  /** Zustand stores para enrolled users */
  const studentEnrolled = EstudenteEnrrolledStore((state) => state.enrolled);
  const studentLoading = EstudenteEnrrolledStore((state) => state.loading);
  const fetchStudentEnrolled = EstudenteEnrrolledStore(
    (state) => state.fetchEnrolled
  );

  const teacherEnrolled = TeacherEnrrolledStore((state) => state.enrolled);
  const teacherLoading = TeacherEnrrolledStore((state) => state.loading);
  const fetchTeacherEnrolled = TeacherEnrrolledStore(
    (state) => state.fetchEnrolled
  );

  const adminEnrolled = AdminEnrrolledStore((state) => state.enrolled);
  const adminLoading = AdminEnrrolledStore((state) => state.loading);
  const fetchAdminEnrolled = AdminEnrrolledStore(
    (state) => state.fetchEnrolled
  );

  const parentEnrolled = ParentEnrolledStore((state) => state.enrolled);
  const parentLoading = ParentEnrolledStore((state) => state.loading);
  const fetchParentEnrolled = ParentEnrolledStore(
    (state) => state.fetchEnrolled
  );

  /** ParentHasStudentStore para obtener relaciones padre-estudiante */
  const parentStudentRelations = ParentHasStudentStore((state) => state.relations);
  const parentStudentLoading = ParentHasStudentStore((state) => state.loading);
  const fetchParentStudentRelations = ParentHasStudentStore(
    (state) => state.fetchRelations
  );

  /** ProfilesStore para obtener información de usuarios */
  const profiles = ProfilesStore((state) => state.profiles);
  const fetchProfiles = ProfilesStore((state) => state.fetchProfiles);

  /** PeriodAcademicStore para obtener información de periodos académicos */
  const periodos = PeriodAcademicStore((state) => state.periodos);
  const fetchPeriodos = PeriodAcademicStore((state) => state.fetchPeriodos);

  /** Estado para almacenar los perfiles obtenidos desde Supabase */
  const [profilesList, setProfilesList] = useState<any[]>([]);

  /** Estados para el diálogo de asignación de usuarios */
  const [usersAssignedToRole, setUsersAssignedToRole] = useState<any[]>([]);
  const [searchAssignedUsers, setSearchAssignedUsers] = useState("");
  const [searchAvailableUsers, setSearchAvailableUsers] = useState("");

  /** Función para obtener todos los registros de la tabla profiles - usuario - */
  const getAllProfiles = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        console.error("Error al obtener perfiles:", error);
        toast.error("Error al obtener perfiles desde Supabase");
        return;
      }

      setProfilesList(data || []);
    } catch (err) {
      console.error("Error inesperado al obtener perfiles:", err);
      toast.error("Error inesperado al obtener perfiles");
    }
  };

  /** Crear un nuevo usuario en Supabase */
  const createUserInSupabase = async (
    nombre: string,
    correo: string,
    roleId: string
  ) => {
    try {
      // 1. Crear el usuario en la tabla profiles
      const { data: newUser, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            full_name: nombre,
            email: correo,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single(); // .single() devuelve un objeto en lugar de un array

      if (profileError || !newUser) {
        console.error("Error al crear usuario:", profileError);
        toast.error("No se pudo crear el usuario");
        return;
      }

      // 2. Crear la relación en profiles_roles con el user_id y role_id
      const { error: roleAssignError } = await supabase
        .from("profiles_roles")
        .insert([
          {
            profile_id: newUser.id, // El UUID del usuario recién creado
            role_id: parseInt(roleId), // El ID del rol seleccionado
          },
        ]);

      if (roleAssignError) {
        console.error("Error al asignar rol:", roleAssignError);
        toast.error("Usuario creado pero no se pudo asignar el rol");
        getAllProfiles(); // Refrescar lista aunque haya fallado la asignación del rol
        return;
      }

      toast.success("Usuario creado y rol asignado correctamente");
      getAllProfiles(); // Refresca la lista
    } catch (err) {
      console.error("Error inesperado:", err);
      toast.error("Error inesperado al crear usuario");
    }
  };

  /** Obtener usuarios asignados a un rol específico */
  const getUsersAssignedToRole = async (roleId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles_roles")
        .select(
          `
          user_id,
          profiles:profiles!inner (
            id,
            full_name,
            email,
            avatar_url
          )
        `
        )
        .eq("role_id", roleId);

      if (error) {
        console.error("Error al obtener usuarios asignados:", error);
        toast.error("Error al cargar usuarios asignados");
        return [];
      }

      // Extraer solo los perfiles de los datos
      const users =
        data?.map((item: any) => item.profiles).filter(Boolean) || [];
      return users;
    } catch (err) {
      console.error("Error inesperado:", err);
      toast.error("Error inesperado al cargar usuarios");
      return [];
    }
  };

  /** Asignar un usuario a un rol */
  const assignUserToRole = async (profileId: string, roleId: number) => {
    try {
      const { error } = await supabase.from("profiles_roles").insert([
        {
          user_id: profileId,
          role_id: roleId,
        },
      ]);

      if (error) {
        console.error("Error al asignar usuario:", error);
        toast.error("No se pudo asignar el usuario al rol");
        return false;
      }

      toast.success("Usuario asignado correctamente");
      return true;
    } catch (err) {
      console.error("Error inesperado:", err);
      toast.error("Error inesperado al asignar usuario");
      return false;
    }
  };

  /** Desasignar un usuario de un rol */
  const removeUserFromRole = async (profileId: string, roleId: number) => {
    try {
      const { error } = await supabase
        .from("profiles_roles")
        .delete()
        .eq("user_id", profileId)
        .eq("role_id", roleId);

      if (error) {
        console.error("Error al desasignar usuario:", error);
        toast.error("No se pudo desasignar el usuario del rol");
        return false;
      }

      toast.success("Usuario desasignado correctamente");
      return true;
    } catch (err) {
      console.error("Error inesperado:", err);
      toast.error("Error inesperado al desasignar usuario");
      return false;
    }
  };

  /** Filtrar usuarios según búsqueda */
  const filteredUsuarios = profilesList.filter(
    (usuario) =>
      usuario.full_name?.toLowerCase().includes(searchUsuarios.toLowerCase()) ||
      usuario.email?.toLowerCase().includes(searchUsuarios.toLowerCase())
  );

  /** Filtrar usuarios asignados al rol seleccionado */
  const filteredAssignedUsers = usersAssignedToRole.filter(
    (user) =>
      user.full_name
        ?.toLowerCase()
        .includes(searchAssignedUsers.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchAssignedUsers.toLowerCase())
  );

  /** Filtrar usuarios disponibles (no asignados al rol) */
  const availableUsers = profilesList.filter(
    (profile) =>
      !usersAssignedToRole.some((assigned) => assigned.id === profile.id)
  );

  const filteredAvailableUsers = availableUsers.filter(
    (user) =>
      user.full_name
        ?.toLowerCase()
        .includes(searchAvailableUsers.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchAvailableUsers.toLowerCase())
  );

  /** Cargar perfiles al montar el componente */
  useEffect(() => {
    getAllProfiles();
  }, []);

  /** Obtener periodos académicos desde Supabase */
  const getAcademicPeriods = async () => {
    try {
      const { data, error } = await supabase
        .from("academic_period")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al obtener periodos académicos:", error);
        toast.error("Error al obtener periodos académicos");
        return;
      }

      setAcademicPeriods(data || []);
    } catch (err) {
      console.error("Error inesperado al obtener periodos académicos:", err);
      toast.error("Error inesperado al obtener periodos académicos");
    }
  };

  /** Crear nuevo registro enrolled según el tipo activo */
  const handleCreateEnrolled = async () => {
    if (!selectedUserId || !selectedAcademicPeriodId) {
      toast.error("Por favor selecciona un usuario y un periodo académico");
      return;
    }

    setIsCreatingEnrolled(true);

    try {
      const newEnrolled = {
        id: crypto.randomUUID(),
        user_id: selectedUserId,
        academic_period_id: selectedAcademicPeriodId,
        enrolled_at: new Date().toISOString(),
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Usar el método addEnrolled del store correspondiente
      if (activeSubTab === "estudiantes") {
        await EstudenteEnrrolledStore.getState().addEnrolled(newEnrolled);
      } else if (activeSubTab === "profesores") {
        await TeacherEnrrolledStore.getState().addEnrolled(newEnrolled);
      } else if (activeSubTab === "administracion") {
        await AdminEnrrolledStore.getState().addEnrolled(newEnrolled);
      } else if (activeSubTab === "padres") {
        await ParentEnrolledStore.getState().addEnrolled(newEnrolled);
      }

      toast.success("Usuario vinculado correctamente");

      // Limpiar formulario y cerrar dialog
      setSelectedUserId("");
      setSelectedAcademicPeriodId("");
      setIsCreateEnrolledOpen(false);
    } catch (error) {
      console.error("Error al crear enrolled:", error);
      toast.error("Error al vincular usuario");
    } finally {
      setIsCreatingEnrolled(false);
    }
  };

  const handleAssignUsers = async (role: any) => {
    setSelectedRole(role);
    setIsAssignUsersOpen(true);

    // Cargar usuarios asignados a este rol
    const assigned = await getUsersAssignedToRole(role.id);
    setUsersAssignedToRole(assigned);

    // Limpiar búsquedas
    setSearchAssignedUsers("");
    setSearchAvailableUsers("");
  };

  /** Obtener usuarios con rol padre */
  const getParentUsers = async () => {
    try {
      const { data: roles, error: rolesError } = await supabase
        .from("roles")
        .select("id")
        .eq("name", "padre-familia")
        .single();

      if (rolesError || !roles) {
        console.error("Error al obtener rol padre:", rolesError);
        return;
      }

      const { data, error } = await supabase
        .from("profiles_roles")
        .select(
          `
          user_id,
          profiles:profiles!inner (
            id,
            full_name,
            email,
            avatar_url
          )
        `
        )
        .eq("role_id", roles.id);

      if (error) {
        console.error("Error al obtener usuarios padre:", error);
        toast.error("Error al obtener usuarios con rol padre");
        return;
      }

      const parents = data?.map((item: any) => item.profiles).filter(Boolean) || [];
      setParentUsers(parents);
    } catch (err) {
      console.error("Error inesperado al obtener padres:", err);
      toast.error("Error inesperado al obtener padres");
    }
  };

  /** Obtener usuarios con rol estudiante */
  const getStudentUsers = async () => {
    try {
      const { data: roles, error: rolesError } = await supabase
        .from("roles")
        .select("id")
        .eq("name", "estudiante")
        .single();

      if (rolesError || !roles) {
        console.error("Error al obtener rol estudiante:", rolesError);
        return;
      }

      const { data, error } = await supabase
        .from("profiles_roles")
        .select(
          `
          user_id,
          profiles:profiles!inner (
            id,
            full_name,
            email,
            avatar_url
          )
        `
        )
        .eq("role_id", roles.id);

      if (error) {
        console.error("Error al obtener usuarios estudiante:", error);
        toast.error("Error al obtener usuarios con rol estudiante");
        return;
      }

      const students = data?.map((item: any) => item.profiles).filter(Boolean) || [];
      setStudentUsers(students);
    } catch (err) {
      console.error("Error inesperado al obtener estudiantes:", err);
      toast.error("Error inesperado al obtener estudiantes");
    }
  };

  /** Manejar creación de relación padre-estudiante */
  const handleCreateParentStudentRelation = async () => {
    if (!selectedParentId || !selectedStudentId) {
      toast.error("Por favor selecciona un padre y un estudiante");
      return;
    }

    setIsCreatingRelation(true);

    try {
      const newRelation = {
        id: crypto.randomUUID(),
        parent_id: selectedParentId,
        student_id: selectedStudentId,
        updated_at: new Date().toISOString(),
      };

      await ParentHasStudentStore.getState().addRelation(newRelation);

      toast.success("Relación padre-estudiante creada correctamente");

      // Limpiar formulario y cerrar dialog
      setSelectedParentId("");
      setSelectedStudentId("");
      setIsParentStudentModalOpen(false);

      // Refrescar relaciones
      await fetchParentStudentRelations();
    } catch (error) {
      console.error("Error al crear relación:", error);
      toast.error("Error al crear relación padre-estudiante");
    } finally {
      setIsCreatingRelation(false);
    }
  };

  /** Manejar asignación de usuario a rol */
  const handleAssignUser = async (userId: string) => {
    if (!selectedRole) return;

    const success = await assignUserToRole(userId, selectedRole.id);
    if (success) {
      // Recargar usuarios asignados
      const assigned = await getUsersAssignedToRole(selectedRole.id);
      setUsersAssignedToRole(assigned);
      // Actualizar contador de roles
      await getCurrentsRoles();
    }
  };

  /** Manejar remoción de usuario de rol */
  const handleRemoveUser = async (userId: string) => {
    if (!selectedRole) return;

    const success = await removeUserFromRole(userId, selectedRole.id);
    if (success) {
      // Recargar usuarios asignados
      const assigned = await getUsersAssignedToRole(selectedRole.id);
      setUsersAssignedToRole(assigned);
      // Actualizar contador de roles
      await getCurrentsRoles();
    }
  };

  {
    /** Construir un nuevo Rol */
  }
  const buildNewRol = async () => {
    {
      /** Iniciamos la creación del ROl  */
    }
    setStatusCreateRol(true);
    if (
      inputRolName.current?.value == "" ||
      inputDescriptionRol.current?.value == ""
    ) {
      alert("Al parecer Nombre del rol o la descripción quedaron vacias.");
      return;
    }

    /** Hacemos el INSERT a la base de datos  */
    const { data, error } = await supabase
      .from("roles")
      .insert({
        name: inputRolName.current?.value.trim(),
        slug: inputDescriptionRol.current?.value.trim(),
        institute_id: institute_id,
      })
      .select();

    /** Si hay un error lo mostramos  */
    if (error) {
      setStatusCreateRol(false);
      setIsCreateRoleOpen(false);
      inputRolName.current!.value = "";
      inputDescriptionRol.current!.value = "";
      console.error(error);
      return;
    }

    /** Si no hay error, lo demoramos un poco y avisamos que todo está ok  */
    setTimeout(() => {
      toast.success(
        <div>
          <div>Rol creado</div>
          <div className="text-muted-foreground text-sm">{`El rol “${
            inputRolName.current?.value ?? ""
          }” se creó correctamente.`}</div>
        </div>,
        {
          icon: <CheckCircle2 className="h-5 w-5" />,
        }
      );
      inputRolName.current!.value = "";
      inputDescriptionRol.current!.value = "";
      setStatusCreateRol(false);
      setIsCreateRoleOpen(false);
    }, 1500);
  };

  {
    /** Obtener los roles actuales */
  }
  const getCurrentsRoles = async () => {
    /** Consultamos los rolres por institución */
    const { data, error } = await supabase
      .from("roles")
      .select(
        `
        id,
        name,
        slug,
        users_count:profiles_roles(count)   -- LEFT JOIN + COUNT
      `
      )
      .eq("institute_id", institute_id)
      .order("name", { ascending: true });

    /** Si hay un error lo mostramos  */
    if (error) {
      console.error(error);
      return;
    }

    data && setRolesList(data);
  };

  /** Obtenemos los roles actuales */
  useEffect(() => {
    const mountedComponente = async () => {
      await getCurrentsRoles();
    };
    mountedComponente();
  }, []);

  /** Función helper para obtener el nombre del periodo académico por ID */
  const getPeriodName = (periodId: string): string => {
    const period = periodos.find((p) => p.id === periodId);
    return period?.name || periodId;
  };

  /** Cargar enrolled users cuando cambie el subtab activo */
  useEffect(() => {
    if (activeTab === "activos") {
      // Cargar profiles primero si no están cargados
      if (profiles.length === 0) {
        fetchProfiles();
      }

      // Cargar periodos académicos si no están cargados
      if (periodos.length === 0) {
        fetchPeriodos();
      }

      // Resetear filtros cuando se cambia de subtab
      setSearchActivos("");
      setFilterPeriodId("todos");

      // Cargar enrolled users según el subtab
      if (activeSubTab === "estudiantes") {
        fetchStudentEnrolled();
      } else if (activeSubTab === "profesores") {
        fetchTeacherEnrolled();
      } else if (activeSubTab === "administracion") {
        fetchAdminEnrolled();
      } else if (activeSubTab === "padres") {
        fetchParentEnrolled();
      } else if (activeSubTab === "familia") {
        fetchParentStudentRelations();
      }
    }
  }, [activeTab, activeSubTab]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Usuarios
        </h2>
      </div>

      {/* Navegación de pestañas */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "usuarios" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("usuarios")}
        >
          <Users className="w-4 h-4 mr-2" />
          Usuarios
        </Button>
        <Button
          variant={activeTab === "roles" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("roles")}
        >
          <Settings className="w-4 h-4 mr-2" />
          Roles
        </Button>
        <Button
          variant={activeTab === "activos" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("activos")}
        >
          <Settings className="w-4 h-4 mr-2" />
          Lista de usuarios Activos
        </Button>
      </div>

      {/* Vista de Usuarios */}
      {activeTab === "usuarios" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Lista de Usuarios</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchUsuarios}
                    onChange={(e) => setSearchUsuarios(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="space-y-3">
                  {filteredUsuarios.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No se encontraron usuarios</p>
                    </div>
                  ) : (
                    filteredUsuarios.map((usuario) => (
                      <div
                        key={usuario.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={usuario.avatar_url || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {usuario.full_name?.charAt(0)?.toUpperCase() ||
                                usuario.email?.charAt(0)?.toUpperCase() ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {usuario.full_name || "Sin nombre"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {usuario.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vista de Roles */}
      {activeTab === "roles" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Gestión de Roles</span>
                </div>
                <Dialog
                  open={isCreateRoleOpen}
                  onOpenChange={setIsCreateRoleOpen}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">Nuevo Rol</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="pb-4">
                      <DialogTitle>Crear Nuevo Rol</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 px-1 pb-2">
                      <div className="space-y-2">
                        <Label>Nombre del Rol</Label>
                        <Input
                          placeholder="Nombre del rol"
                          ref={inputRolName}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Input
                          placeholder="Descripción del rol"
                          ref={inputDescriptionRol}
                        />
                      </div>
                      <Button
                        className={`w-full mt-6 cursor-pointer ${
                          statusCreateRol &&
                          "text-green-800 bg-green-300 cursor-progress"
                        } hover:text-green-800 hover:bg-green-300`}
                        onClick={buildNewRol}
                      >{`${
                        statusCreateRol ? "creando..." : "Crear Rol "
                      } `}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar roles..."
                    value={searchRoles}
                    onChange={(e) => setSearchRoles(e.target.value)}
                    className="pl-10 bg-white shadow-gray-400 "
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {rolesList?.length === 0 ? (
                    <div className="col-span-full text-center text-muted-foreground py-8">
                      No hay roles disponibles.
                    </div>
                  ) : (
                    rolesList.map((rol: rolesListProps) => (
                      <div
                        key={rol.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Settings className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-foreground">
                                {rol.name}
                              </h3>
                              <Badge variant="secondary" className="text-xs">
                                Rol del Sistema
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {rol.slug}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex space-x-3">
                            <div className="text-center">
                              <div
                                className={`text-sm font-semibold ${
                                  rol.users_count[0].count == "0"
                                    ? "text-red-500"
                                    : "text-green-600"
                                } `}
                              >
                                {rol.users_count[0].count}
                              </div>
                              <div
                                className={`text-xs ${
                                  rol.users_count[0].count == "0"
                                    ? "text-red-500"
                                    : "text-green-600"
                                }`}
                              >
                                Usuarios
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent hover:bg-primary hover:text-primary-foreground"
                              onClick={() => handleAssignUsers(rol)}
                            >
                              <Users className="w-4 h-4 mr-2" />
                              Asignar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-muted"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vista de Usuarios Activos */}
      {activeTab === "activos" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5" />
                  <span>Usuarios Activos Vinculados</span>
                </div>
                <Dialog
                  open={activeSubTab === "familia" ? isParentStudentModalOpen : isCreateEnrolledOpen}
                  onOpenChange={(open) => {
                    if (activeSubTab === "familia") {
                      setIsParentStudentModalOpen(open);
                      if (open) {
                        // Cargar padres y estudiantes cuando se abre el modal
                        getParentUsers();
                        getStudentUsers();
                      } else {
                        // Limpiar selecciones cuando se cierra
                        setSelectedParentId("");
                        setSelectedStudentId("");
                      }
                    } else {
                      setIsCreateEnrolledOpen(open);
                      if (open) {
                        // Cargar periodos académicos cuando se abre el dialog
                        getAcademicPeriods();
                      } else {
                        // Limpiar selecciones cuando se cierra
                        setSelectedUserId("");
                        setSelectedAcademicPeriodId("");
                      }
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      {activeSubTab === "familia" ? "Asignar Relación" : "Vincular Usuario"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={activeSubTab === "familia" ? "sm:max-w-2xl" : "sm:max-w-md"}>
                    <DialogHeader className="pb-4">
                      <DialogTitle>
                        {activeSubTab === "familia"
                          ? "Asignar Relación Padre-Estudiante"
                          : `Vincular ${
                              activeSubTab === "estudiantes"
                                ? "Estudiante"
                                : activeSubTab === "profesores"
                                ? "Profesor"
                                : activeSubTab === "administracion"
                                ? "Administrador"
                                : "Padre"
                            }`}
                      </DialogTitle>
                    </DialogHeader>

                    {activeSubTab === "familia" ? (
                      // Modal para asignar relación padre-estudiante
                      <div className="space-y-6 px-1 pb-2">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Lista de Padres */}
                          <div className="space-y-2">
                            <Label className="text-base font-semibold">Usuario Padre</Label>
                            <Select
                              value={selectedParentId}
                              onValueChange={setSelectedParentId}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un padre" />
                              </SelectTrigger>
                              <SelectContent>
                                {parentUsers.length === 0 ? (
                                  <div className="p-2 text-sm text-muted-foreground text-center">
                                    No hay usuarios con rol padre
                                  </div>
                                ) : (
                                  parentUsers.map((parent) => (
                                    <SelectItem key={parent.id} value={parent.id}>
                                      <div className="flex items-center space-x-2">
                                        <Avatar className="w-6 h-6">
                                          <AvatarImage src={parent.avatar_url || ""} />
                                          <AvatarFallback>
                                            {parent.full_name?.charAt(0) || "P"}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                          <span className="text-sm font-medium">
                                            {parent.full_name || "Sin nombre"}
                                          </span>
                                          <span className="text-xs text-muted-foreground">
                                            {parent.email}
                                          </span>
                                        </div>
                                      </div>
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>

                            {/* Vista previa del padre seleccionado */}
                            {selectedParentId && (
                              <div className="mt-3 p-3 border rounded-lg bg-muted/30">
                                <p className="text-xs text-muted-foreground mb-2">Padre seleccionado:</p>
                                {(() => {
                                  const parent = parentUsers.find(p => p.id === selectedParentId);
                                  return parent ? (
                                    <div className="flex items-center space-x-2">
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={parent.avatar_url || ""} />
                                        <AvatarFallback>
                                          {parent.full_name?.charAt(0) || "P"}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{parent.full_name}</p>
                                        <p className="text-xs text-muted-foreground">{parent.email}</p>
                                      </div>
                                    </div>
                                  ) : null;
                                })()}
                              </div>
                            )}
                          </div>

                          {/* Lista de Estudiantes */}
                          <div className="space-y-2">
                            <Label className="text-base font-semibold">Usuario Estudiante</Label>
                            <Select
                              value={selectedStudentId}
                              onValueChange={setSelectedStudentId}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un estudiante" />
                              </SelectTrigger>
                              <SelectContent>
                                {studentUsers.length === 0 ? (
                                  <div className="p-2 text-sm text-muted-foreground text-center">
                                    No hay usuarios con rol estudiante
                                  </div>
                                ) : (
                                  studentUsers.map((student) => (
                                    <SelectItem key={student.id} value={student.id}>
                                      <div className="flex items-center space-x-2">
                                        <Avatar className="w-6 h-6">
                                          <AvatarImage src={student.avatar_url || ""} />
                                          <AvatarFallback>
                                            {student.full_name?.charAt(0) || "E"}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                          <span className="text-sm font-medium">
                                            {student.full_name || "Sin nombre"}
                                          </span>
                                          <span className="text-xs text-muted-foreground">
                                            {student.email}
                                          </span>
                                        </div>
                                      </div>
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>

                            {/* Vista previa del estudiante seleccionado */}
                            {selectedStudentId && (
                              <div className="mt-3 p-3 border rounded-lg bg-muted/30">
                                <p className="text-xs text-muted-foreground mb-2">Estudiante seleccionado:</p>
                                {(() => {
                                  const student = studentUsers.find(s => s.id === selectedStudentId);
                                  return student ? (
                                    <div className="flex items-center space-x-2">
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={student.avatar_url || ""} />
                                        <AvatarFallback>
                                          {student.full_name?.charAt(0) || "E"}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{student.full_name}</p>
                                        <p className="text-xs text-muted-foreground">{student.email}</p>
                                      </div>
                                    </div>
                                  ) : null;
                                })()}
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          className={`w-full mt-6 cursor-pointer ${
                            isCreatingRelation &&
                            "text-green-800 bg-green-300 cursor-progress"
                          } hover:text-green-800 hover:bg-green-300`}
                          onClick={handleCreateParentStudentRelation}
                          disabled={isCreatingRelation || !selectedParentId || !selectedStudentId}
                        >
                          {isCreatingRelation
                            ? "Creando Relación..."
                            : "Asignar Relación"}
                        </Button>
                      </div>
                    ) : (
                      // Modal para vincular usuarios a periodos académicos
                      <div className="space-y-6 px-1 pb-2">
                        <div className="space-y-2">
                          <Label>Usuario</Label>
                          <Select
                            value={selectedUserId}
                            onValueChange={setSelectedUserId}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un usuario" />
                            </SelectTrigger>
                            <SelectContent>
                              {profiles.map((profile) => (
                                <SelectItem key={profile.id} value={profile.id}>
                                  {profile.full_name ||
                                    profile.email ||
                                    "Sin nombre"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Periodo Académico</Label>
                          <Select
                            value={selectedAcademicPeriodId}
                            onValueChange={setSelectedAcademicPeriodId}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un periodo académico" />
                            </SelectTrigger>
                            <SelectContent>
                              {academicPeriods.map((period) => (
                                <SelectItem key={period.id} value={period.id}>
                                  {period.name || period.id}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          className={`w-full mt-6 cursor-pointer ${
                            isCreatingEnrolled &&
                            "text-green-800 bg-green-300 cursor-progress"
                          } hover:text-green-800 hover:bg-green-300`}
                          onClick={handleCreateEnrolled}
                          disabled={isCreatingEnrolled}
                        >
                          {isCreatingEnrolled
                            ? "Vinculando..."
                            : "Vincular Usuario"}
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Botones para seleccionar tipo de usuario */}
                <div className="flex space-x-2 bg-muted p-1 rounded-lg w-fit">
                  <Button
                    variant={
                      activeSubTab === "estudiantes" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => setActiveSubTab("estudiantes")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Estudiantes
                  </Button>
                  <Button
                    variant={
                      activeSubTab === "profesores" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => setActiveSubTab("profesores")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Profesores
                  </Button>
                  <Button
                    variant={
                      activeSubTab === "administracion" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => setActiveSubTab("administracion")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Administración
                  </Button>
                  {/* <Button
                    variant={
                      activeSubTab === "padres" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => setActiveSubTab("padres")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Padres
                  </Button> */}
                                    <Button
                    variant={
                      activeSubTab === "familia" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => setActiveSubTab("familia")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    grupos familiares usuarios
                  </Button>
                </div>

                {/* Barra de búsqueda y filtros */}
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar usuarios activos..."
                      value={searchActivos}
                      onChange={(e) => setSearchActivos(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={filterPeriodId}
                    onValueChange={setFilterPeriodId}
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Filtrar por periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los periodos</SelectItem>
                      {periodos.map((period) => (
                        <SelectItem key={period.id} value={period.id}>
                          {period.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista de usuarios según el subtab activo */}
                <div className="space-y-3">
                  {(() => {
                    // Si estamos en la pestaña "familia", mostrar tabla de relaciones padre-estudiante
                    if (activeSubTab === "familia") {
                      if (parentStudentLoading) {
                        return (
                          <div className="text-center py-8 text-muted-foreground">
                            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p>Cargando relaciones padre-estudiante...</p>
                          </div>
                        );
                      }

                      if (parentStudentRelations.length === 0) {
                        return (
                          <div className="text-center py-8 text-muted-foreground">
                            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No se encontraron relaciones padre-estudiante</p>
                          </div>
                        );
                      }

                      // Construir datos enriquecidos con información de profiles
                      const enrichedRelations = parentStudentRelations.map((relation) => {
                        const parent = profiles.find((p) => p.id === relation.parent_id);
                        const student = profiles.find((p) => p.id === relation.student_id);
                        return {
                          ...relation,
                          parent,
                          student,
                        };
                      });

                      // Filtrar por búsqueda
                      const filteredRelations = enrichedRelations.filter((item) => {
                        const parentName = item.parent?.full_name?.toLowerCase() || "";
                        const parentEmail = item.parent?.email?.toLowerCase() || "";
                        const studentName = item.student?.full_name?.toLowerCase() || "";
                        const studentEmail = item.student?.email?.toLowerCase() || "";
                        const searchLower = searchActivos.toLowerCase();

                        return (
                          parentName.includes(searchLower) ||
                          parentEmail.includes(searchLower) ||
                          studentName.includes(searchLower) ||
                          studentEmail.includes(searchLower)
                        );
                      });

                      return (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-muted/50 border-b">
                                <th className="text-left p-3 font-semibold">Padre/Tutor</th>
                                <th className="text-left p-3 font-semibold">Estudiante</th>
                                <th className="text-left p-3 font-semibold">Última actualización</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredRelations.map((relation) => (
                                <tr
                                  key={relation.id}
                                  className="border-b hover:bg-muted/30 transition-colors"
                                >
                                  <td className="p-3">
                                    <div className="flex items-center space-x-3">
                                      <Avatar>
                                        <AvatarImage
                                          src={relation.parent?.avatar_url || "/placeholder.svg"}
                                        />
                                        <AvatarFallback>
                                          {relation.parent?.full_name?.charAt(0)?.toUpperCase() ||
                                            relation.parent?.email?.charAt(0)?.toUpperCase() ||
                                            "P"}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">
                                          {relation.parent?.full_name || "Sin nombre"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {relation.parent?.email || "Sin correo"}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center space-x-3">
                                      <Avatar>
                                        <AvatarImage
                                          src={relation.student?.avatar_url || "/placeholder.svg"}
                                        />
                                        <AvatarFallback>
                                          {relation.student?.full_name?.charAt(0)?.toUpperCase() ||
                                            relation.student?.email?.charAt(0)?.toUpperCase() ||
                                            "E"}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">
                                          {relation.student?.full_name || "Sin nombre"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {relation.student?.email || "Sin correo"}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <div className="text-sm text-muted-foreground">
                                      {new Date(relation.updated_at).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }

                    // Para las otras pestañas, continuar con la lógica existente
                    let currentEnrolled: Enrolled[] = [];
                    let currentLoading = false;

                    if (activeSubTab === "estudiantes") {
                      currentEnrolled = studentEnrolled;
                      currentLoading = studentLoading;
                    } else if (activeSubTab === "profesores") {
                      currentEnrolled = teacherEnrolled;
                      currentLoading = teacherLoading;
                    } else if (activeSubTab === "administracion") {
                      currentEnrolled = adminEnrolled;
                      currentLoading = adminLoading;
                    } else if (activeSubTab === "padres") {
                      currentEnrolled = parentEnrolled;
                      currentLoading = parentLoading;
                    }

                    // Hacer lookup con profiles para obtener información completa
                    const enrolledWithProfiles = currentEnrolled.map(
                      (enrolled) => {
                        const profile = profiles.find(
                          (p) => p.id === enrolled.user_id
                        );
                        return {
                          ...enrolled,
                          profile: profile || null,
                        };
                      }
                    );

                    // Filtrar por búsqueda (por nombre, email o user_id) y por periodo académico
                    const filteredEnrolled = enrolledWithProfiles.filter(
                      (item) => {
                        // Filtro de búsqueda por texto
                        const matchesSearch =
                          item.profile?.full_name
                            ?.toLowerCase()
                            .includes(searchActivos.toLowerCase()) ||
                          item.profile?.email
                            ?.toLowerCase()
                            .includes(searchActivos.toLowerCase()) ||
                          item.user_id
                            ?.toLowerCase()
                            .includes(searchActivos.toLowerCase());

                        // Filtro por periodo académico
                        const matchesPeriod =
                          filterPeriodId === "todos" ||
                          item.academic_period_id === filterPeriodId;

                        return matchesSearch && matchesPeriod;
                      }
                    );

                    if (currentLoading) {
                      return (
                        <div className="text-center py-8 text-muted-foreground">
                          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                          <p>Cargando usuarios...</p>
                        </div>
                      );
                    }

                    if (filteredEnrolled.length === 0) {
                      return (
                        <div className="text-center py-8 text-muted-foreground">
                          <UserCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No se encontraron usuarios activos</p>
                        </div>
                      );
                    }

                    return filteredEnrolled.map((item) => {
                      const { profile, ...enrolled } = item;

                      return (
                        <div
                          key={enrolled.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage
                                src={profile?.avatar_url || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {profile?.full_name?.charAt(0)?.toUpperCase() ||
                                  profile?.email?.charAt(0)?.toUpperCase() ||
                                  "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {profile?.full_name || "Sin nombre"}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {profile?.email || "Sin correo"}
                              </div>
                              {profile?.phone && (
                                <div className="text-xs text-muted-foreground">
                                  Tel: {profile.phone}
                                </div>
                              )}
                              <div className="text-xs text-muted-foreground mt-1">
                                Periodo: {getPeriodName(enrolled.academic_period_id)} •
                                Matriculado:{" "}
                                {new Date(
                                  enrolled.enrolled_at
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                enrolled.is_active ? "default" : "secondary"
                              }
                              className={
                                enrolled.is_active ? "bg-green-500" : ""
                              }
                            >
                              {enrolled.is_active ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Dialog open={isAssignUsersOpen} onOpenChange={setIsAssignUsersOpen}>
        <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Gestionar Usuarios - {selectedRole?.name || "Rol"}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-hidden">
            {/* Usuarios asignados al rol */}
            <div className="space-y-4 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  Usuarios Asignados
                </h3>
                <Badge variant="secondary">
                  {filteredAssignedUsers.length}
                </Badge>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar usuarios asignados..."
                  value={searchAssignedUsers}
                  onChange={(e) => setSearchAssignedUsers(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto pr-2">
                {filteredAssignedUsers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay usuarios asignados a este rol</p>
                  </div>
                ) : (
                  filteredAssignedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-green-50 border-green-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={user.avatar_url || "/placeholder.svg"}
                          />
                          <AvatarFallback className="text-xs">
                            {user.full_name?.charAt(0)?.toUpperCase() ||
                              user.email?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {user.full_name || "Sin nombre"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <UserMinus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Usuarios disponibles para asignar */}
            <div className="space-y-4 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  Usuarios Disponibles
                </h3>
                <Badge variant="outline">{filteredAvailableUsers.length}</Badge>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar usuarios disponibles..."
                  value={searchAvailableUsers}
                  onChange={(e) => setSearchAvailableUsers(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto pr-2">
                {filteredAvailableUsers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay usuarios disponibles para asignar</p>
                  </div>
                ) : (
                  filteredAvailableUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={user.avatar_url || "/placeholder.svg"}
                          />
                          <AvatarFallback className="text-xs">
                            {user.full_name?.charAt(0)?.toUpperCase() ||
                              user.email?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {user.full_name || "Sin nombre"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleAssignUser(user.id)}
                      >
                        <UserCheck className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
