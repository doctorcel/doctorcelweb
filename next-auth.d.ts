// src/types/next-auth.d.ts

import NextAuth from "next-auth";
import { Role } from "@prisma/client"; // Asegúrate de que esta ruta es correcta según tu estructura de carpetas

declare module "next-auth" {
  interface User {
    id: number;
    role: Role;
  }

  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      role: Role;
    };
  }
}
