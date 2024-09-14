import React from "react";

export interface IProtectedRoute {
    children: React.ReactNode,
    role: string[]
}