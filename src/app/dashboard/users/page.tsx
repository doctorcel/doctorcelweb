import UserManagement from "@/components/dashboard/UserManagement";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function UsersPage() {
    return (

        <ProtectedRoute>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-green-600 dark:text-green-400">Panel de Administración</h1>
                <UserManagement />
            </ div>
        </ProtectedRoute>
    )
}