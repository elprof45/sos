import { object, string, z } from "zod";

export const signInSchema = object({
  email: string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be more than 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
});

export const signUpSchema = object({
  name: string().min(1, { message: "Name is required" }),
  email: string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be more than 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
  specialty: string().min(1, { message: "specialty is required" }),
});

// export const createSosUserSchema = object({
//   fistName: string().min(1, { message: "fistName is required" }),
//   lastName: string().min(1, { message: "lastName is required" }),
//   age: string().min(1, { message: "age is required" }),
//   gender: string().min(1, { message: "patientGender is required" }),
//   country: string().min(1, { message: "country is required" }),
//   address: string().min(1, { message: "address is required" }),
//   bloodGroup: string().min(1, { message: "BloodGroup is required" }),
//   profession: string().min(1, { message: "profession is required" }),
//   phoneNumber: string().min(1, { message: "phoneNumber is required" }),
//   emailAddress: string().email({ message: "emailAddress must be a valid email" }),
//   currentMedications: string().min(1, { message: "currentHealth is required" }),
// });


export const userIdParmSchema =z.string().min(88).max(88);
