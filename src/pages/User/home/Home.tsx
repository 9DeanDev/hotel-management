import LayoutComponent from "../../../layout/LayoutComponent"
import { Button, LoginButton } from "../../../components"
import styles from './Home.module.scss'
import { FontIcon, mergeStyles } from "@fluentui/react"

export const Home = () => {
    const iconStyles = mergeStyles({
        color: '#c1af88',
        width: 60,
        height: 60,
        fontSize: 60,
        margin: '8px 0px'
    })

    const iconList = [
        {
            iconName: 'TimeSheet',
            text: 'Kitchen'
        },
        {
            iconName: 'InternetSharing',
            text: 'Wifi'
        },
        {
            iconName: 'Car',
            text: 'Taxi'
        },
        {
            iconName: 'Emoji',
            text: 'Friendly'
        },
        {
            iconName: 'Hotel',
            text: 'Bed'
        },

    ]

    const renderIcon = () => {
        return (
            <>
                {iconList.map((item, index) => {
                    return (
                        <div key={index}>
                            <FontIcon iconName={item.iconName} className={iconStyles} />
                            <p style={{ textAlign: 'center' }}>
                                {item.text}
                            </p>
                        </div>
                    )
                })}
            </>
        )
    }

    const gridItemList = [
        {
            url: './../../src/assets/anh-ks-thumb.jpeg',
            text: 'Standard Twin Room',
        },
        {
            url: './../../src/assets/StandardRoom.jpg',
            text: 'Standard Room',
        },
        {
            url: './../../src/assets/StandardViewRoom.webp',
            text: 'Standard View Room',
        },
        {
            url: './../../src/assets/ciputra-deluxe-room.jpeg',
            text: 'Deluxe Room',
        },
    ]

    const renderGridItem = () => {
        return (
            <>
                {gridItemList.map((item, index) => {
                    return (
                        <div key={index} className={styles.griditem} style={{
                            backgroundImage: `url(${item.url})`
                        }}>
                            <p>
                                {item.text}
                            </p>
                            <Button text="Check" />
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <LayoutComponent>
            <div className={styles.header}>
                <div className={styles.overlay}></div>
                <div className={styles.content}>
                    <p>
                        WELCOM TO DAEMON HOTEL
                    </p>
                    <p style={{ margin: '25px 0 41px 0', fontSize: 24, fontWeight: 400 }}>
                        Good people. Good thinking. Good feeling.
                    </p>
                    <LoginButton text="LOGIN TO EXPLORE" />
                </div>
            </div>
            <div className={styles.body}>
                <h3>Facilities</h3>
                <div className={styles.iconcontainer}>
                    {renderIcon()}
                </div>
                <h3>Rooms & Rates</h3>
                <div className={styles.gridcontainer}>
                    {renderGridItem()}
                </div>
            </div>
        </LayoutComponent>
    )
}