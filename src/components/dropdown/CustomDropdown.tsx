import { Controller } from 'react-hook-form';
import { IFormItemProps } from '../input/Input';
import { Dropdown, IDropdownProps } from '@fluentui/react';

export const CustomDropdown = (props: IFormItemProps & IDropdownProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            defaultValue={props.defaultValue || ''}
            render={({ field: { value }, fieldState: { error } }) => (
                <Dropdown
                    {...props}
                    onChange={(ev, option) => {
                        props.setValue?.(props.name, option?.key, { shouldDirty: true, shouldValidate: true });
                        props.onChange?.(ev, option);
                    }}
                    errorMessage={error?.message}
                    selectedKey={value}
                />
            )}
        />
    );
};