import Button from "../shared/button";

type NavbarProps = {
    email: string
}

const Navbar: React.FC<NavbarProps> = ({email}) => {
  return (
    <div className="px-4 py-2 border-b flex h-14 w-full flex-row items-center justify-between shadow-sm">
      <span className="text-2xl font-bold italic text-blue-500">
        NeverLate!
      </span>
      <div className="flex flex-row justify-center items-center gap-2">
        <span className="text-lg text-black font-bold">{email}</span>
        <Button variant="primary" text="Logout" disabled={false} action={()=>{}}/>
      </div>
    </div>
  );
};

export default Navbar;
