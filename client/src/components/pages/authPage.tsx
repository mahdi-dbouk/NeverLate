import AuthForm from "../ui/authForm";

const AuthPage = () => {
    return (
    <div className="flex h-full w-full flex-col gap-2 items-center justify-center">
        <AuthForm title="Login" submit={() => {}}/>
      </div>
    )
}

export default AuthPage;