// Copyright (c) 2026 minimorphism
// For Env

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.glsl' {
  const content: string;
  export default content;
}
