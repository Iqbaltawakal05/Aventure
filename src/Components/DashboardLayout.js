import Dashboardnavbar from "./DashboardNav";

export default function LayoutDash({ children }) {
    return (
        <div className="text-center row">
            <div className="col-2">
            <Dashboardnavbar />
            </div>
            <div className="col-10">
            {children}
            </div>
        </div>
    )
}