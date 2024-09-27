import PatronDesbloqueo from "@/components/dashboard/techservice/patron";
import ImeiScanner from "@/components/dashboard/techservice/verifyImei";

export default function TechServiceMainPage(){
    return(
        <>
        <PatronDesbloqueo/>
        <ImeiScanner/>
        </>
    )
}