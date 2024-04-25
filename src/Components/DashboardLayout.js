import Dashboardnavbar from "./DashboardNav";
import DashNav from "./Dashnav";

export default function DashboardLayout({ children }) {
    return (
        <div className="text-center row">
            <div className="col-3">
            <Dashboardnavbar />
            </div>
            <div className="col-9">
            <DashNav />
            {children}
            </div>
        </div>
    )
}