import { Controller } from 'react-hook-form';
import { DatePicker, IDatePickerProps } from '@fluentui/react';
import { IFormItemProps } from '../input/Input';

export const CustomDatePicker = (props: IFormItemProps & IDatePickerProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            defaultValue={props.defaultValue || null}
            render={({ field: { onBlur, value }, fieldState: { error } }) => (
                <DatePicker
                    {...props}
                    value={value}
                    textField={{ ...props.textField, errorMessage: error?.message }}
                    onBlur={onBlur}
                    onSelectDate={(date) => {
                        props.setValue?.(props.name, date, { shouldDirty: true, shouldValidate: true });
                        props.onSelectDate?.(date);
                    }}
                />
            )}
        />
    );
};
