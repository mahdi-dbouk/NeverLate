import { useState } from "react";
import Button from "../shared/button";
import Input from "../shared/input";

const AuthForm: React.FC = () => {
  const [type, setType] = useState<string>("Login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <div className="flex h-fit w-96 flex-col items-center gap-y-4 rounded-md border-2 border-gray-300 px-2 py-4">
        <div className="flex w-full flex-row items-start justify-center">
          <span className="text-2xl font-bold italic text-blue-500">
            NeverLate!
          </span>
        </div>

        {type === "Register" && (
          <>
            <div className="flex w-4/5 flex-row justify-start">
              <span className="text-md text-gray-500">Name</span>
            </div>
            <div className="flex w-full flex-row items-center justify-center">
              <Input
                type="text"
                placeholder="Name"
                height="h-10"
                width="w-4/5"
                value={name}
                disabled={false}
                onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
              />
            </div>
          </>
        )}
        <div className="flex w-4/5 flex-row justify-start">
          <span className="text-md text-gray-500">Email</span>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <Input
            type="email"
            placeholder="Email"
            height="h-10"
            width="w-4/5"
            value={email}
            disabled={false}
            onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="flex w-4/5 flex-row justify-start">
          <span className="text-md text-gray-500">Password</span>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <Input
            type="password"
            placeholder="Password"
            height="h-10"
            width="w-4/5"
            value={password}
            disabled={false}
            onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <div className="flex h-full w-full flex-col items-center">
          <Button
            height="h-10"
            width="w-4/5"
            text={type}
            disabled={false}
            variant="primary"
            action={() => {submit()}}
          />
        </div>
        <div className="flex h-full flex-row items-center justify-center gap-2">
          <span className="text-base font-semibold text-gray-500">
            Don't have an account?
          </span>

          <Button
            variant="text"
            text={type === "Register" ? "Login" : "Register"}
            height="h-fit"
            width="w-fit"
            disabled={false}
            action={() => {
              console.log("clicked signup text button");
              if (type === "Register") setType("Login");
              else {
                setType("Register");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
