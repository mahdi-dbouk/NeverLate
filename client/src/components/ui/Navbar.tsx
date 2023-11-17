import Button from "../shared/button";

type NavbarProps = {
  email: string;
};

const Navbar: React.FC<NavbarProps> = ({ email }) => {
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
          action={() => {}}
        />
      </div>
    </div>
  );
};

export default Navbar;
