import { ITextFieldProps, TextField } from "@fluentui/react";
import { Control, Controller, UseControllerProps, UseFormSetValue } from "react-hook-form"

export interface IFormItemProps {
    control?: Control;
    setValue?: UseFormSetValue<T>;
    name: string;
    rules?: UseControllerProps['rules'];
    defaultValue?: T;
}

export const Input = (props: IFormItemProps & ITextFieldProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            defaultValue={props.defaultValue || ''}
            render={({ field: { onChange, name: fieldName, value }, fieldState: { error } }) => (
                <TextField
                    {...props}
                    name={fieldName}
                    onChange={(ev, newValue) => {
                        onChange(ev)
                        props.onChange?.(ev, newValue)
                    }}
                    value={value}
                    errorMessage={error?.message}
                />
            )}
        />
    )
}