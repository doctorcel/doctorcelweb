// src/types/next-auth.d.ts

import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string; // Cambiado a string
    name: string;
    role: Role;
    email: string;
  }

  interface Session {
    user: {
      id: string; // Cambiado a string
      name: string;
      email: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Cambiado a string
    name: string;
    email: string;
    role: Role;
  }
}
