import Dashboardnavbar from "./DashboardNav";

export default function DashboardLayout({ children }) {
    return (

        <div className="dashboard-layout">
            <div className="sidebar">
            <Dashboardnavbar />
            </div>
            <div className="content">
            {children}
            </div>
        </div>
    )
}