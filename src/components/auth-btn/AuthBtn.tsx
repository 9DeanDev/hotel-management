import { ActionButton, IButtonStyles, PrimaryButton } from "@fluentui/react";
import { CustomModal } from "../modal/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "..";
import { IAuthButtonProps } from "./AuthBtn.model";
import axios from "axios";
import { useNavigate } from "react-router";

export const AuthBtn = (props: IAuthButtonProps) => {
  const navigate = useNavigate();
  const [openLogin, isOpenLogin] = useState(props.isOpen? props.isOpen: false);
  const [openRegister, isOpenRegister] = useState(false);
  const { control, handleSubmit } = useForm();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    if (openLogin) {
      try {
        const res = await axios.post("http://localhost:8080/auth/token", {
          username,
          password,
        });
        if (res) {
          localStorage.setItem("username", res.data.result.username);
          localStorage.setItem("token", res.data.result.token);
          localStorage.setItem("role", res.data.result.role);
          isOpenLogin(false);
          if (res.data.result.role === "user") {
            navigate(0);
          } else navigate("/Dashboard");
        }
      } catch (error) {
        alert("Có lỗi xảy ra!");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await axios.post("http://localhost:8080/users", {
          username,
          password,
          email,
          phone,
        });
        if (res) {
          localStorage.setItem("username", res.data.result.username);
          localStorage.setItem("role", res.data.result.role);
          alert("Đăng ký thành công!");
          isOpenRegister(false);

          const token = await axios.post("http://localhost:8080/auth/token", {
            username,
            password,
          })

          if (token) {
            localStorage.setItem("token", res.data.result.token);
          }

          if (res.data.result.role === "user") {
            navigate(0);
          } else navigate("/Dashboard");
        }
      } catch (error: any) {
        alert(error.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  const buttonStyles: Partial<IButtonStyles> = {
    root: {
      width: 331,
      height: 76,
      borderRadius: 10,
      fontSize: 24,
      fontWeight: 500,
      fontFamily: 'Ubuntu sans-serif'
    },
    rootHovered: {
      backgroundColor: "#DFAA5B",
    },
  };

  const ModalLogin = () => {
    return (
      <CustomModal
        isOpen={openLogin}
        title="LOGIN"
        subtitle="Welcome back! Please enter your login details"
        onDismiss={() => isOpenLogin(false)}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            minWidth: "270px",
          }}
        >
          <Input
            name="username"
            control={control}
            placeholder="Username"
            required={true}
            rules={{
              required: "This field is required",
            }}
            onChange={(
              _e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => {
              if (newValue !== undefined) {
                setUsername(newValue);
              }
            }}
          />
          <Input
            name="password"
            control={control}
            placeholder="Password"
            required={true}
            type="password"
            rules={{
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 8 characters",
              },
            }}
            onChange={(
              _e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => {
              if (newValue !== undefined) {
                setPassword(newValue);
              }
            }}
          />
          <PrimaryButton
            type="submit"
            disabled={loading}
            text={loading ? "Loging..." : "Login"}
            styles={{
              rootHovered: {
                backgroundColor: "#98814e",
                borderColor: "#98814e",
              },
            }}
          />
          <ActionButton
            styles={fontIconStyle}
            onClick={() => {
              isOpenRegister(true), isOpenLogin(false);
            }}
          >
            Create your new account.
          </ActionButton>
        </form>
      </CustomModal>
    );
  };

  const fontIconStyle: Partial<IButtonStyles> = {
    root: {
      fontSize: 14,
      color: "rgb(219 194 140)",
    },
    rootHovered: {
      color: "#98814e",
    },
  };

  const ModalRegister = () => {
    return (
      <CustomModal
        isOpen={openRegister}
        title="REGISTER"
        onDismiss={() => isOpenRegister(false)}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            minWidth: "270px",
          }}
        >
          <Input
            name="email"
            control={control}
            placeholder="Email"
            required={true}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
            onChange={(
              _e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => {
              if (newValue !== undefined) {
                setEmail(newValue);
              }
            }}
          />
          <Input
            name="userName"
            control={control}
            placeholder="User Name"
            required={true}
            rules={{ required: "This field is required" }}
            onChange={(
              _e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => {
              if (newValue !== undefined) {
                setUsername(newValue);
              }
            }}
          />
          {/* <Input
                        name="lastName"
                        control={control}
                        placeholder="Last Name"
                        required={true}
                        rules={{ required: "This field is required" }}
                    /> */}
          <Input
            name="phone"
            control={control}
            placeholder="Phone"
            required={true}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: "Invalid phone number. It should be 10-11 digits",
              },
            }}
            onChange={(
              _e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => {
              if (newValue !== undefined) {
                setPhone(newValue);
              }
            }}
          />
          <Input
            name="password"
            control={control}
            placeholder="Password"
            type="password"
            required={true}
            rules={{
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            onChange={(
              _e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => {
              if (newValue !== undefined) {
                setPassword(newValue);
              }
            }}
          />
          <PrimaryButton
            type="submit"
            text={loading ? "Registering" : "Register"}
            disabled={loading}
            styles={{
              rootHovered: {
                backgroundColor: "#98814e",
                borderColor: "#98814e",
              },
            }}
          />
        </form>
      </CustomModal>
    );
  };

  return (
    <>
      {!props.isRegister && (
        <Button styles={buttonStyles} onClick={() => isOpenLogin(true)}>
          {props.text}
        </Button>
      )}

      {props.isRegister && (
        <ActionButton
          styles={fontIconStyle}
          onClick={() => isOpenRegister(true)}
        >
          {props.text}
        </ActionButton>
      )}
      {openRegister && ModalRegister()}
      {openLogin && ModalLogin()}
    </>
  );
};
