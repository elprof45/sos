import ClickOutside from "@/components/ClickOutside";
import { useSession } from "next-auth/react";
import { useState } from "react";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {session?.user.name}
          </span>
          <span className="block text-xs">{session?.user.specialty}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <div className="avatar placeholder ">
            <div className="w-11 bg-blue-600 text-neutral-content rounded-full">
              <span className="text-4xl font-semibold text-white">
                {session?.user?.name ? session.user?.name[0] : "Dr"}
              </span>
            </div>
          </div>
        </span>
      </button>

      {/* <!-- Dropdown Start --> */}
    
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
