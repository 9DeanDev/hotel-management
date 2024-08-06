import { ActionButton, IButtonStyles, PrimaryButton } from "@fluentui/react"
import { CustomModal } from "../modal/Modal"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components"

export const RegisterButton = () => {
    const [openRegister, isOpenRegister] = useState(false)
    const { control, handleSubmit } = useForm();

    const onSubmit = () => {
        console.log('data');
    };

    const fontIconStyle: Partial<IButtonStyles> = {
        root: {
            fontSize: 14,
            color: '#c1af88'
        },
        rootHovered: {
            color: 'black'
        }
    }

    const ModalRegister = () => {
        return (
            <CustomModal
                isOpen={openRegister}
                title="REGISTER"
                onDismiss={() => isOpenRegister(false)}>
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
                        name="firstName"
                        control={control}
                        placeholder="First Name"
                        required={true}
                        rules={{ required: "This field is required" }}
                    />
                    <Input
                        name="lastName"
                        control={control}
                        placeholder="Last Name"
                        required={true}
                        rules={{ required: "This field is required" }}
                    />
                    <Input
                        name="phone"
                        control={control}
                        placeholder="Phone"
                        required={true}
                        rules={{
                            required: "This field is required",
                            pattern: {
                                value: /^[0-9]{10,11}$/,
                                message: "Invalid phone number. It should be 10-11 digits"
                            }
                        }}
                    />
                    <Input
                        name="password"
                        control={control}
                        placeholder="Password"
                        required={true}
                        rules={{
                            required: "This field is required",
                            minLength: { value: 8, message: 'Password must be at least 8 characters' }
                        }}
                    />
                    <PrimaryButton type="submit" text="Register" />
                </form>
            </CustomModal>
        )
    }

    return (
        <ActionButton styles={fontIconStyle} onClick={() => isOpenRegister(true)}>
            Register
            {ModalRegister()}
        </ActionButton>
    )
}