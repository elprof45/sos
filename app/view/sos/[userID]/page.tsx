import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { userIdParmSchema } from "@/lib/zod";
import ButtomClick from "@/components/common/button";
import { revalidatePath } from "next/cache";

type Props = {
  params: {
    userID: string;
  };
};

const PatientInfo = async ({ params }: Props) => {

  const userIdVerified =   userIdParmSchema.safeParse(params.userID);

  if (!userIdVerified.success) {
    redirect("/dashboard/not-found");
  }

  const user = await prisma.user.findFirst({
    where: {
      userId: userIdVerified.data,
    },

    select: {
      poids: true,
      age: true,
      taille: true,
      firstName: true,
      lastName: true,
      gender: true,
      phoneNumber: true,
      emergency_1_name: true,
      emergency_1_number: true,
      emergency_2_name: true,
      emergency_2_number: true,
      profession: true,
      userId: true,
      profile: true,
      viewTime:true
    },
  });

  if (!user) {
    redirect("/dashboard/not-found");
  }

  await prisma.user.update({
    where:{
      userId:user?.userId
    },
    data:{
      viewTime:user.viewTime + 1
    }
  })

  async function alert () {
    "use server"
    if (user?.userId){
      await prisma.alert.create({
        data:{
         UserId:user?.userId
        }
       })
    }
     revalidatePath("/dashboard/sos/"+ userIdVerified.data);

  }
  return (
    <div className="mx-auto max-w-242.5 text-gray-800 flex items-start justify-center ">
      <div className=" text-black sm:rounded-xl shadow-sm w-full md:max-w-2xl">
        <div className="relative z-20 h-30 md:h-30">
          <div className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center bg-blue-500 border-white border-b-4 " />
        </div>
        <div className="space-y-4 -mt-13">
          <div className="flex flex-col justify-center items-center">
            <div className="avatar placeholder relative z-30 ">
              <div className="w-24 bg-neutral text-neutral-content rounded-full mx-auto border border-white border-x-4 border-y-4 shadow-lg">
                {user.profile ? <img className="w-32 h-32 "
                  src={user.profile} alt="Photo de Profil" /> : <span className="text-title-xxl2 font-bold space-y-4 ">{user.firstName[0].toUpperCase()} </span>}
              </div>
            </div>
            <p className="text-center text-xl font-bold  mt-2">{user.lastName} {user.firstName} </p>
            <p className="text-center">{user.age} ans</p>
            <p className="text-center">Poids : {user.poids}  kg | Taille : {user.taille} m</p>
          </div>


          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-xl font-semibold space-y-4 ">Personnes à prévenir</h2>
            <div className="flex flex-row justify-evenly gap-4 items-center">
              <p>{user.emergency_1_name} </p>
              <div className="flex justify-center">
                <a href={`tel:${user.emergency_1_number}`}>
                  <button className="bg-blue-500 text-white  font-semibold py-2 px-4 rounded-lg w-full">
                    Appeler
                  </button>
                </a>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-4 items-center">
              <p>{user.emergency_2_name} </p>
              <div className="flex justify-center">
                <a href={`tel:${user.emergency_2_number}`}>
                  <button className="bg-blue-500 text-white  font-semibold py-2 px-4 rounded-lg w-full">
                    Appeler
                  </button>
                </a>
              </div>
            </div>
          </div>

         <ButtomClick alert={alert}/>
        </div>

        <div className="mt-4">
          <p className="text-xl font-semibold space-y-4 text-center">Numéros d'urgence :</p>
          <div className="flex justify-center my-4">
            <a href="tel:118">
              <button className="bg-blue-500 text-white  font-semibold py-2 px-4 rounded-lg w-full">
                Police
              </button>
            </a>
          </div>
          <div className="flex justify-center my-4">
            <a href="tel:117">
              <button className="bg-blue-500 text-white  font-semibold py-2 px-4 rounded-lg w-full">
                Pompier
              </button>
            </a>
          </div>
          <div className="flex justify-center my-4">
            <a href="tel:999">
              <button className="bg-blue-500 text-white  font-semibold py-2 px-4 rounded-lg w-full">
                Service d'Urgence Médical
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>

  );
};

export default PatientInfo;
