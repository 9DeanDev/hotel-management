import { IconButton, Modal } from "@fluentui/react";
import { ICustomModalProps } from "./Modal.model";
import styles from './Modal.module.scss';
import logo from '../../assets/logoo.jpg';

export const CustomModal = (props: ICustomModalProps) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onDismiss={props.onDismiss}
            styles={{
                main: {
                    maxWidth: '875px',
                    minHeight: '390px',
                    borderRadius: '12px'
                },
            }}
        >
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h1>Welcome!</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quod,
                        magnam eum repellat laboriosam totam qui ea facilis accusamus, ad laudantium praesentium,
                        quisquam non iusto voluptates amet minus tenetur deleniti.</p>
                </div>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <IconButton
                            iconProps={{ iconName: 'Cancel' }}
                            onClick={props.onDismiss}
                        />
                    </div>
                    <div className={styles.body}>
                        <img src={logo} alt='Logo' style={{ width: '66px', height: '66px' }} />
                        <h2>
                            {props.title}
                        </h2>
                        <p>
                            {props.subtitle}
                        </p>
                        {props.children}
                    </div>
                </div>
            </div>
        </Modal>
    )
}