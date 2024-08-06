import { IModalProps } from "@fluentui/react";
import React from "react";

export interface ICustomModalProps extends IModalProps {
    title?: string
    subtitle?: string
    children?: React.ReactNode
}