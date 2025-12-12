import { ZodError } from "zod";
import { Prisma } from "@clash-app/db/prisma-client";

export const formatError = (error: ZodError) => {
  return {
    message: "Validation failed",
    errors: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
};

export const handlePrismaError = (
  err: unknown,
  options?: { hideForAuth?: boolean }
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return options?.hideForAuth
          ? {
              status: 400,
              error: {
                code: "INVALID_CREDENTIALS",
                message: "Invalid Credentials",
              },
            }
          : {
              status: 409,
              error: {
                code: "UNIQUE_CONSTRAINT",
                message: "A record with this field already exists",
              },
            };

      case "P2003":
        return {
          status: 400,
          error: {
            code: "FOREIGN_KEY_CONSTRAINT",
            message: "Invalid reference to related data",
          },
        };

      case "P2025":
        return options?.hideForAuth
          ? {
              status: 400,
              error: {
                code: "INVALID_CREDENTIALS",
                message: "Invalid Credentials",
              },
            }
          : {
              status: 404,
              error: {
                code: "NOT_FOUND",
                message: "Record not found",
              },
            };
    }
  }

  return {
    status: 500,
    error: {
      code: "DB_ERROR",
      message: options?.hideForAuth
        ? "Invalid Credentials"
        : "An unexpected database error occurred",
    },
  };
};
