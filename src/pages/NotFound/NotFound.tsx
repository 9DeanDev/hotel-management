import { Stack } from "@fluentui/react"
import LayoutComponent from "../../layout/LayoutComponent"

export const NotFoundPage = () => {
    return (
        <LayoutComponent>
            <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100vh' }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
            </Stack>
        </LayoutComponent>
    )
}