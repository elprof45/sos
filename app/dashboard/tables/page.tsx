import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SosTablUser from "@/components/Tables/TableUser";
import { Metadata } from "next";
"@/components/Tables/TableUser";

export const metadata: Metadata = {
  title: "HealEnroll",
  description: "",
};

const TablesPage = () => {
  // data =
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        <SosTablUser />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
