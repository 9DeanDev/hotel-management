// src/global.d.ts
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.gif' {
    const value: string;
    export default value;
}
