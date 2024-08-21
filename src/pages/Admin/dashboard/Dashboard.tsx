import { useLocation } from "react-router";
import LayoutComponent from "../../../layout/LayoutComponent"
import { useEffect } from "react";


export const Dashboard = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <LayoutComponent>
            <div>
                Dashboard
            </div>
        </LayoutComponent>
    )
}