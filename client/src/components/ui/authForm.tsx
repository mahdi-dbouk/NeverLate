import { useEffect, useRef, useState } from "react";
import Button from "../shared/button";
import Input from "../shared/input";
import { AxiosError, AxiosResponse } from "axios";
import Snackbar from "../shared/snackbar";
import { useNavigate } from "react-router-dom";
import validateEmail from "../../validators/vaildateEmail";
import validatePassword from "../../validators/validatePassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import { Login, Register } from "../../services/auth.service";
import { LoginRequest, RegisterRequest, LoginResponse } from "../../types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { saveAuthUser } from "../../utilities/localstorage.utilities";


const AuthForm: React.FC = () => {
  const [type, setType] = useState<string>("Login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarStatus, setSnackbarStatus] = useState<string>("");


  const navigate = useNavigate();

  useEffect(() => {
    setIsValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setIsValidPassword(validatePassword(password));
  }, [password]);

  const snackbarRef = useRef<React.ElementRef<typeof Snackbar>>(null);

  const loginMutation = useMutation<LoginResponse, unknown, LoginRequest>({
    mutationKey: ["auth"],
    mutationFn: async (data: LoginRequest) => {
      const response: AxiosResponse<LoginResponse> = await Login(data);

      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      saveAuthUser(data);
      snackbarRef.current?.show();
      setSnackbarMessage("Login Successful!");
      setSnackbarStatus("success");
      setTimeout(() => {
        snackbarRef.current?.hide();
        navigate('/dashboard', {
          replace: true
        })
      }, 3600);
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data.message;
      snackbarRef.current?.show();
      setSnackbarMessage(errorMessage);
      setSnackbarStatus("failed");
      setTimeout(() => {
        snackbarRef.current?.hide();
      }, 3600);
    },
  });
  const registerMutation = useMutation<LoginResponse, unknown, RegisterRequest>({
    mutationKey: ["auth"],
    mutationFn: async (data: RegisterRequest) => {
      const response: AxiosResponse<LoginResponse> = await Register(data);

      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      saveAuthUser(data);
      snackbarRef.current?.show();
      setSnackbarMessage("Account Created Successfully!");
      setSnackbarStatus("success");
      setTimeout(() => {
        snackbarRef.current?.hide();
        navigate('/dashboard', {
          replace: true
        })
      }, 3600);
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data.message;
      snackbarRef.current?.show();
      setSnackbarMessage(errorMessage);
      setSnackbarStatus("failed");
      setTimeout(() => {
        snackbarRef.current?.hide();
      }, 3600);
    },
  });

  const submit = async () => {
    if(type === 'Register')
      registerMutation.mutate({name, email, password})
    if(type === 'Login')
      loginMutation.mutate({email, password})

  };

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <Snackbar
        ref={snackbarRef}
        message={snackbarMessage}
        status={snackbarStatus}
      />
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
            <div className="flex w-full flex-col items-center justify-center">
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
              {name.length >= 1 ? (
                <span className="self-start px-[10%] text-xs text-green-500">
                  <FontAwesomeIcon icon={faCheck} color="#48bb78" /> Seems good!
                </span>
              ) : (
                ""
              )}
            </div>
          </>
        )}
        <div className="flex w-4/5 flex-row justify-start">
          <span className="text-md text-gray-500">Email</span>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
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
          {isValidEmail && email.length >= 1 ? (
            <span className="self-start px-[10%] text-xs text-green-500">
              <FontAwesomeIcon icon={faCheck} color="#48bb78" /> Seems good!
            </span>
          ) : (
            email.length >= 1 && (
              <span className="self-start px-[10%] text-xs text-red-500">
                <FontAwesomeIcon icon={faWarning} color="#f56565" /> Please
                enter a valid email!
              </span>
            )
          )}
        </div>
        <div className="flex w-4/5 flex-row justify-start">
          <span className="text-md text-gray-500">Password</span>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
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
          {isValidPassword && password.length >= 1 ? (
            <span className="self-start px-[10%] text-xs text-green-500">
              <FontAwesomeIcon icon={faCheck} color="#48bb78" /> Seems good!
            </span>
          ) : (
            password.length >= 1 && (
              <span className="self-start px-[10%] text-xs text-red-500">
                <FontAwesomeIcon icon={faWarning} color="#f56565" /> Password
                must be at least 6 characters long!
              </span>
            )
          )}
        </div>

        <div className="flex h-full w-full flex-col items-center">
          <Button
            height="h-10"
            width="w-4/5"
            text={type}
            disabled={!isValidEmail || !isValidPassword ? true : false}
            variant="primary"
            action={() => {
              submit();
            }}
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
