"use server";
import { auth, signIn } from "@/auth";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";
import { randomUUID } from "node:crypto";

export async function getUserByEmail(email: string) {
  return prisma.professional.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.professional.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch {
    return null;
  }
}

export async function gePatientById(userID: string, professionalId: string) {
  try {
    const patient = await prisma.user.findFirst({
      where: {
        userId: userID,
        Professionalid: professionalId,
      },
    });
    if (!patient) {
      throw new Error("patient not found ");
    }
    return patient;
  } catch (error) {
    throw new Error("error ");
  }
}

export async function getPatientByProfessionnal() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const datas = await prisma.patient.findMany({
    where: {
      professionalId: session.user.id as string,
    },
    select: {
      address: true,
      bloodGroup: true,
      country: true,
      createdAt: true,
      currentMedications: true,
      dateOfBirth: true,
      emailAddress: true,
      firstName: true,
      ID: true,
      lastName: true,
      patientGender: true,
      phoneNumber: true,
      profession: true,
    },
  });
  return datas;
}
export async function createSosUser(formData: FormData) {
  const session = await auth();
  if (!session) {
    return null;
  }
  const form = Object.fromEntries(formData.entries());
  // const parse = createPatientSchema.safeParse(form);

  // if (!parse.success) {
  //   return { message: "Oof Tout les champs doivent étre remplis !!" };
  // }
  const time = Date.now().toString();
  const randomN = Math.floor(Math.random() * 1000).toString();
  const result = randomUUID()+`-${time}-${randomN}-`.slice(-16)+ randomUUID();
  try {
    await prisma.user.create({
      data: {
        firstName: form.fistName as string,
        lastName: form.lastName as string,
        age: form.age as string,
        poids: form.poids as string,
        taille: form.taille as string,
        gender: form.gender as string,
        country: form.country as string,
        address: form.address as string,
        phoneNumber: form.phoneNumber as string,
        emailAddress: form.emailAddress as string,
        profession: form.profession as string,
        Professionalid: session.user.id as string,
        emergency_1_name:form.emergency_1_name as string,
        emergency_2_name:form.emergency_2_name as string,
        emergency_2_number:form.emergency_2_number as string,
        emergency_1_number:form.emergency_1_number as string,
        userId:result,

      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.cause === "P2002") {
        return {
          isError: true,
          message: "Un patient avec cette information exist deja. ",
        };
      }
    }
    return {
      isError: true,
      message: "Une erreur s'est produite lors de la creation du patient. ",
    };
  }
  revalidatePath("/dashboard/tables");
  return {
    isError: false,
    message: "la patient est enregister avec success !",
  };
}
export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = await hash(formData.get("password") as string, 12);
  try {
    await prisma.professional.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          isError: true,
          message: "Un compte avec cette email exist deja. ",
        };
      }
      console.log(error)
    }
  }

  console.info('tout est ok')
  redirect("/signin");

}

export   async function alertCheck(id: string) {
  await prisma.alert.update({
    where: {
      id: id
    },
    data: {
      isCheck: true
    }
  })
}
// ...

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type) {
        return {
          isError: true,
          message: "Invalid credentials.",
        };
      } else {
        return {
          isError: true,
          message: "Something went wrong.",
        };
      }
    }
    throw error;
  }
}