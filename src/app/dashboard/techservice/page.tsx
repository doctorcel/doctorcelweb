import PatronDesbloqueo from "@/components/dashboard/techservice/patron";
import ImeiScanner from "@/components/dashboard/techservice/verifyEmail";

export default function TechServiceMainPage(){
    return(
        <>
        <PatronDesbloqueo/>
        <ImeiScanner/>
        </>
    )
}