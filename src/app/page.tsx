import { auth } from "@/auth";
import SignIn from "@/components/sign-in";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  console.log(user);
  return (
    <div>
      <SignIn />
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
}
