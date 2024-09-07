import { auth } from "@/auth";
import AuthButtons from "@/components/auth-buttons";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  console.log(user);
  return (
    <div>
      <AuthButtons />
      {user && <p>Welcome, {user.name}!</p>}
      {/* email */}
      {user && <p>Email: {user.email}</p>}
    </div>
  );
}
