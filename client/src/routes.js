import Admin from "./pages/Admin";
import Report from "./pages/Report";
import Kolmogorov_Praktika from "./pages/KolmogorovPraktika";
import Pirson_Praktika from "./pages/PirsonPraktika";
import Research from "./pages/Research";
import Start_page from "./pages/StartPage";
import Teoria from "./pages/Teoria";
import ReportOne from "./pages/ReportOne"
import Auth from "./pages/Auth"
import {
    ADMIN_ROUTE,
    KOLMOGOROV_ROUTE,
    LOGIN_ROUTE,
    PIRSON_ROUTE,
    REGISTRATION_ROUTE,
    REPORTONE_ROUTE,
    REPORT_ROUTE,
    RESEARCH_ROUTE,
    STARTPAGE_ROUTE,
    TEORIA_ROUTE,
    ADMINREPORT_ROUTE
} from "./utils/consts";
import AdminReport from "./pages/AdminReport";



export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: KOLMOGOROV_ROUTE,
        Component: Kolmogorov_Praktika
    },
    {
        path: PIRSON_ROUTE,
        Component: Pirson_Praktika
    },
    {
        path: RESEARCH_ROUTE,
        Component: Research
    },
    {
        path: REPORT_ROUTE,
        Component: Report
    },
    {
        path: REPORTONE_ROUTE + '/:id',
        Component: ReportOne
    },
    {
        path: KOLMOGOROV_ROUTE,
        Component: Kolmogorov_Praktika
    },
    {
        path: PIRSON_ROUTE,
        Component: Pirson_Praktika
    },
    {
        path: RESEARCH_ROUTE,
        Component: Research
    },
    {
        path: ADMINREPORT_ROUTE,
        Component: AdminReport
    }
]

export  const publicRoutes = [
    {
        path: STARTPAGE_ROUTE,
        Component: Start_page
    },
    {
        path: TEORIA_ROUTE,
        Component: Teoria
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]