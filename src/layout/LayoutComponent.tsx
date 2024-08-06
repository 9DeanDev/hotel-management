import React from "react"
import styles from './LayoutComponent.module.scss'
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

interface IProps {
    children?: React.ReactNode
}

const LayoutComponent = ({ children }: IProps) => {

    return (
        <>
            <div className={styles.root}>
                <Header />
                <div className={styles.rootbody}>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default React.memo(LayoutComponent);