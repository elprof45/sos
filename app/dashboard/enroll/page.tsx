"use client";
import { createSosUser } from "@/actions/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SubmitButton from "@/components/FormButton/SubmitButton";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRef } from "react";
import { toast } from "sonner";

const EnrollerPatient = () => {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Enroller " />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b flex flex-col justify-center items-center gap-4 py-4">
                  <h2 className="text-xl font-semibold space-y-4 ">  Information Personalle</h2>
                  </div>
              <div className="p-7">
                <form
                  action={async (FormData) => {
                    const response = await createSosUser(FormData);
                    if (response?.isError === false) {
                      toast.error(response?.message);
                      ref.current?.reset();
                    } else {
                      toast.error(response?.message);
                    }
                  }}
                  ref={ref}
                >
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fistName"
                      >
                        Prénoms
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fistName"
                        id="fistName"
                        required
                        placeholder="Martin"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="lastName"
                      >
                        Nom
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        placeholder="kokou"
                      />
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="age"
                      >
                        Age
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name="age"
                        id="age"
                        placeholder="18"
                      />
                    </div>
                    <div className="w-full sm:w-1/3">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="poids"
                      >
                       Poids
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name="poids"
                        id="poids"
                        placeholder="64"
                      />
                    </div>
                    <div className="w-full sm:w-1/3">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="taille"
                      >
                        Taille
                      </label>

                      <input
                        id="taille"
                        type="number"
                        name="taille"
                        placeholder="1.20"
                        required
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/3">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="gender"
                      >
                        Sexe
                      </label>

                      <select
                        id="gender"
                        name="gender"
                        required
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      >
                        <option value="Masculin">Masculin</option>
                        <option value="Féminin">Féminin</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="country"
                      >
                        Pays
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="country"
                        id="country"
                        required
                        placeholder="Togo"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="address"
                      >
                        Addresse Ville / Province / Régien
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="address"
                        id="address"
                        required
                        placeholder="123 Rue des jo, Lomé"
                      />
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Numero de Tél
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        required
                        placeholder="+228 77 88 88 47"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Adresse Email
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="lutterking66@gmail.com"
                      />
                    </div>
                 
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="profession"
                      >
                        Profession
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="profession"
                        id="profession"
                        required
                        placeholder="Etudiant"
                      />
                    </div>

                   <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="profileImage"
                      >
                        Photo
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="file"
                        name="profileImage"
                        id="profileImage"
                        accept=".png .jpeg .svg"
                      />
                    </div>
                  </div>
                  {/* personne a prevenir section */}
                  <div className="border-b flex flex-col justify-center items-center gap-4 py-4">

                  <h2 className="text-xl font-semibold space-y-4 ">Personnes à prévenir</h2>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emergency_1_name"
                      >
                        Nom complet
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="emergency_1_name"
                        id="emergency_1_name"
                        required
                        placeholder="kokou kossi"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                    <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emergency_1_number"
                      >
                        Numero de Tél
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="emergency_1_number"
                        id="emergency_1_number"
                        required
                        placeholder="+228 79 88 88 47"
                      />
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emergency_2_name"
                      >
                        Nom complet
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="emergency_2_name"
                        id="emergency_2_name"
                        required
                        placeholder="kokou adjo"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                    <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emergency_2_number"
                      >
                        Numero de Tél
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="emergency_2_number"
                        id="emergency_2_number"
                        required
                        placeholder="+228 99 88 88 47"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <SubmitButton
                      label="Enrégistrer"
                      style="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EnrollerPatient;
