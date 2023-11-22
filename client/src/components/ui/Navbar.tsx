import { useNavigate } from "react-router-dom";
import { deleteAuthUser } from "../../utilities/localstorage.utilities";
import Button from "../shared/button";
import { useQueryClient } from "@tanstack/react-query";

type NavbarProps = {
  email: string;
};

const Navbar: React.FC<NavbarProps> = ({ email }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const emailSplit: string[] = email.split("@");
  const username: string = emailSplit[0];
  return (
    <div className="fixed flex h-14 w-full flex-row items-center justify-between border-b bg-white px-4 py-2 shadow-sm">
      <span className="text-2xl font-bold italic text-blue-500">
        NeverLate!
      </span>
      <div className="flex flex-row items-center justify-center gap-2">
        <span className="text-sm font-bold text-black">{username}</span>
        <Button
          variant="primary"
          text="Logout"
          disabled={false}
          action={() => {
            deleteAuthUser();
            queryClient.invalidateQueries({queryKey: ['todos']})
            queryClient.invalidateQueries({queryKey: ['auth']})
            queryClient.clear();
            navigate("/auth", {
              replace: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
