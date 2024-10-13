import CategoryManagement from "@/components/dashboard/CategoryManagement";
import ProductManagement from "@/components/dashboard/ProductManagement";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProductsPageManag(){
    return (
        <>
        <ProtectedRoute>
        <ProductManagement />
        <CategoryManagement />
        </ProtectedRoute>
        </>
    )
}