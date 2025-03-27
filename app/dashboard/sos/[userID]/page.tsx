import { auth } from "@/auth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import QRCodePage from "@/components/QrCode";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { userIdParmSchema } from "@/lib/zod";
import AlertCard from "@/components/common/AlertCard";

type Props = {
  params: {
    userID: string;
  };
};

const PatientInfo = async ({ params }: Props) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const userIdVerified = userIdParmSchema.safeParse(params.userID);

  if (!userIdVerified.success) {
    redirect("/dashboard/not-found");
  }

  async function userData() {
    if (session?.user.role) {
      const user = await prisma.user.findFirst({
        where: {
          userId: userIdVerified.data,
        },
        select: {
          address: true,
          country: true,
          createdAt: true,
          age: true,
          emailAddress: true,
          firstName: true,
          Id: true,
          lastName: true,
          gender: true,
          phoneNumber: true,
          profession: true,
          userId: true,
          poids: true,
          emergency_1_name: true,
          emergency_1_number: true,
          emergency_2_name: true,
          emergency_2_number: true,
          profile: true,
          taille: true,
          alert: true
        },
      });
      return user
    } else {
      const user = await prisma.user.findFirst({
        where: {
          userId: userIdVerified.data,
          Professionalid: String(session?.user.id),
        },
        select: {
          address: true,
          country: true,
          createdAt: true,
          age: true,
          emailAddress: true,
          firstName: true,
          Id: true,
          lastName: true,
          gender: true,
          phoneNumber: true,
          profession: true,
          userId: true,
          poids: true,
          emergency_1_name: true,
          emergency_1_number: true,
          emergency_2_name: true,
          emergency_2_number: true,
          profile: true,
          taille: true,
          alert: true
        },
      });
      return user

    }
  }

  const user = await userData()
  console.log(user)
  if (!user) {
    redirect("/dashboard/not-found");
  }



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tableau de Bord" />
      <div className="flex flex-col gap-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border rounded p-8">
              {/* <!-- Section d'information du patient --> */}
              <div className="col-span-1 md:col-span-3">
                <div className="flex items-center mb-4 gap-3">
                  <div className="avatar placeholder ">
                    <div className="w-14 bg-blue-600 text-neutral-content rounded-full">
                      <span className="text-4xl font-semibold text-white">
                        {user.lastName[0]}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold">
                      {user.lastName} {user.firstName}
                    </h2>
                    <p className="text-gray-600">ID: {user.Id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-medium">Age</h3>
                    <p>
                      {user.age} ans
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Poids</h3>
                    <p>
                      {user.poids} kg
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Taille</h3>
                    <p>
                      {user.taille} m
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Sexe</h3>
                    <p>{user.gender}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Pays</h3>
                    <p>{user.country}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p>{user.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p>{user.phoneNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p>{user.emailAddress}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Profession</h3>
                    <p>{user.profession}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">{user.emergency_1_name} </h3>
                    <p>{user.emergency_1_number} </p>
                  </div>
                  <div>
                    <h3 className="font-medium">{user.emergency_2_name} </h3>
                    <p>{user.emergency_2_number} </p>
                  </div>


                  <div>
                    <h3 className="font-medium">Date d&aposinscription</h3>
                    <p>

                      {`le ${user.createdAt.toLocaleString("fr", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- Section QR Code --> */}
              <QRCodePage
                userID={{
                  userID: user.userId,
                }}
              />
            </div>
          </div>
        </div>
        {
          user.alert ? (
            user.alert.map((data, key) => (
              <AlertCard data={data} key={key}/>
            ))

          ) : (
            <div role='alert' className='alert alert-warning'>
              <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
              </svg>
              <span>Warning: Invalid email address!</span>
            </div>
          )
        }

      </div>
    </DefaultLayout>
  );
};

export default PatientInfo;
