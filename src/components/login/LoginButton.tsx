import { IButtonStyles, PrimaryButton } from "@fluentui/react"
import { CustomModal } from "../modal/Modal"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Input } from "../../components"
import { ILoginButtonProps } from "./LoginButton.model"


export const LoginButton = (props: ILoginButtonProps) => {
    const [openLogin, isOpenLogin] = useState(false)
    const { control, handleSubmit } = useForm();

    const onSubmit = () => {
        console.log('data');
    };

    const buttonStyles: Partial<IButtonStyles> = {
        root: {
            width: 371,
            height: 76,
            borderRadius: 10,
            fontSize: 24,
            fontWeight: 500
        },
        rootHovered: {
            backgroundColor: '#DFAA5B',
        },
    }

    const ModalLogin = () => {
        return (
            <CustomModal
                isOpen={openLogin} title="LOGIN"
                subtitle="Welcome back! Please enter your login details"
                onDismiss={() => isOpenLogin(false)}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '8px', flexDirection: 'column', minWidth: '270px' }}>
                    <Input
                        name="email"
                        control={control}
                        placeholder="Email"
                        required={true}
                        rules={{
                            required: "This field is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address"
                            }
                        }}
                    />
                    <Input
                        name="password"
                        control={control}
                        placeholder="Password"
                        required={true}
                        rules={{ required: "This field is required", minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
                    />
                    <input type="checkbox" name="Remember me" value='Remember me' style={{ color: '#ffffff' }} />
                    <PrimaryButton type="submit" text="Login" styles={{ rootHovered: { backgroundColor: '#98814e', borderColor: '#98814e' } }} />
                </form>
            </CustomModal>
        )
    }
    return (
        <Button styles={buttonStyles} onClick={() => isOpenLogin(true)}>
            {props.text}
            {ModalLogin()}
        </Button>
    )
}