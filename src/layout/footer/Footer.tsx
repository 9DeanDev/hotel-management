import styles from './Footer.module.scss'
import logo from '../../assets/logoo.jpg';
import { Button, Input } from '../../components';
import { useForm } from 'react-hook-form';
import { IButtonStyles } from '@fluentui/react';

export const Footer = () => {
    const { control, handleSubmit } = useForm();

    const onSubcribe = () => {
        console.log('');
    }

    const items = [
        {
            text: 'Home',
            url: '',
        },
        {
            text: 'Rooms',
            url: '',
        },
        {
            text: 'Facilities',
            url: '',
        },
        {
            text: 'Contact Us',
            url: '',
        },
    ]

    const buttonStyles: IButtonStyles = {
        root: { padding: 24, marginTop: 4, borderRadius: 8 },
        rootHovered: {
            backgroundColor: '#DFAA5B'
        }
    }

    return (
        <div className={styles.footer}>
            <div className={styles.grid}>
                <img src={logo} alt='Logo' style={{ width: '100px', height: '100px' }} />
                <div className={styles.info}>
                    <b>Daemon Hotels Head Office</b>
                    <p>+27 434 344 432</p>
                    <p>info@daemonhotels.com</p>
                </div>
            </div>
            <div className={styles.grid}>
                <ul className={styles.listItem}>
                    {items.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={item.url}>{item.text}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.grid} style={{ alignItems: 'start' }}>
                <h3>
                    Subcribe for Offers
                </h3>
                <form onSubmit={handleSubmit(onSubcribe)} style={{ display: 'flex', gap: '8px', flexDirection: 'column', minWidth: '100%' }}>
                    <Input
                        name='email'
                        control={control}
                        placeholder="Email Address"
                        required={true}
                        rules={{
                            required: "This field is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address"
                            }
                        }}
                    />
                    <Button type='submit' text='Subcribe Now' styles={buttonStyles} />
                </form>
            </div>
        </div>
    )
}
