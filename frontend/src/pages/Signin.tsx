import AuthForm from "../components/authform";
import SignupQuote from "../components/signupQuote";

export default function Signin() {
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 ">
      <AuthForm type="signin" />
      <SignupQuote />
    </div>
  );
}
