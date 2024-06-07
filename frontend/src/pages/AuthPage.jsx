import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCart";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  //   const [value, setValue] = useState("login");
  // useSetRecoilState(authScreenAtom)
  console.log(authScreenState);
  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
