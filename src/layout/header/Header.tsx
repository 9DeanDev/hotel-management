import {
    CommandBar,
    CommandBarButton,
    IButtonProps,
    IButtonStyles,
    ICommandBarItemProps,
    IDropdownOption,
    ISearchBoxStyles,
    SearchBox,
    Stack,
} from "@fluentui/react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.jpg";
import {
    Button,
    CustomDatePicker,
    CustomDropdown,
    CustomModal,
} from "../../components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const Header = () => {
    const navigate = useNavigate();
    const [user, _setUser] = useState(localStorage.getItem("username"));
    const { control, handleSubmit } = useForm();
    const [openCheckForm, isOpenCheckForm] = useState(false);

    const onSubmit = () => {
        console.log("");
    };

    const rooms: IDropdownOption[] = [
        { key: "Standard", text: "Standard" },
        { key: "Deluxe", text: "Deluxe" },
        { key: "Luxury", text: "Luxury" },
        { key: "Twin", text: "Twin" },
    ];

    const itemBar: ICommandBarItemProps[] = [
        {
            key: "Our hotel",
            text: "Our Hotel",
        },
        {
            key: "Rooms",
            text: "Rooms",
        },
        {
            key: "Facilities",
            text: "Facilities",
        },
        {
            key: "Contact Us",
            text: "Contact Us",
        },
    ];

    const itemBarStyles: Partial<IButtonStyles> = {
        label: { fontSize: 24, color: "#957554", fontFamily: 'Ubuntu, sans-serif' },
    };

    const CustomBarButton: React.FunctionComponent<IButtonProps> = (props) => {
        return <CommandBarButton {...props} styles={itemBarStyles}/>;
    };

    const checkButtonStyles: IButtonStyles = {
        root: {
            width: 202,
            height: 60,
            borderRadius: 10,
        },
        rootHovered: {
            backgroundColor: "#DFAA5B",
        },
        label: {
            fontSize: 20,
        },
    };

    const searchButtonStyles: ISearchBoxStyles = {
        root: {
            width: 202,
            height: 60,
            borderRadius: 10,
        },
        icon: {
            fontSize: 20,
        },
        field: {
            fontSize: 20,
        },
    };

    const checkForm = () => {
        return (
            <CustomModal
                isOpen={openCheckForm}
                onDismiss={() => isOpenCheckForm(false)}
            >
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <CustomDropdown
                        name="rooms"
                        control={control}
                        required={true}
                        rules={{ required: "This field is required" }}
                        placeholder="Select a City"
                        options={rooms}
                    />
                    <CustomDatePicker
                        name="check in"
                        placeholder="Check in"
                        ariaLabel="Check in"
                        control={control}
                        isRequired={true}
                        rules={{ required: "this field is required" }}
                    />
                    <CustomDatePicker
                        name="check out"
                        placeholder="Check out"
                        ariaLabel="Check out"
                        control={control}
                        isRequired={true}
                        rules={{ required: "this field is required" }}
                    />
                    <Button type="submit" text="Check Availability" />
                </form>
            </CustomModal>
        );
    };

    const handleLogout = () => {
        if (window.confirm("Are you are to logout?")) {
            localStorage.removeItem("username")
            localStorage.removeItem("role")
            localStorage.removeItem("token")
            _setUser(localStorage.getItem("username"))
            navigate(0)
        }
    }

    return (
        <div className={styles.header}>
            <img
                src={logo}
                alt="Logo"
                style={{ width: "100px", height: "100px" }}
            />
            <Stack horizontal horizontalAlign="center" wrap verticalAlign="center">
                <CommandBar
                    items={
                        user
                            ? [
                                ...itemBar,
                                {
                                    key: "Logout",
                                    text: "Logout",
                                    onClick: handleLogout,
                                },
                            ]
                            : itemBar
                    }
                    buttonAs={CustomBarButton}
                />
            </Stack>
            { }
            {/* <div className={styles.heading}>
                <Button
                    type="submit"
                    text="Check Availability"
                    onClick={() => isOpenCheckForm(true)} styles={checkButtonStyles}
                />
                <SearchBox styles={searchButtonStyles} />
                {openCheckForm && checkForm()}
            </div> */}
        </div>
    );
};
