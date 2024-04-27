import Dashboardnavbar from "./DashboardNav";

export default function DashboardLayout({ children }) {
    return (

        <div className="text-center row">
            <div className="col-3">
            <Dashboardnavbar />
            </div>
            <div className="col-9">
            {children}
            </div>
        </div>
    )
}