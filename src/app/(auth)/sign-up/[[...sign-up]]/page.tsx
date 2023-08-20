import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="w-full h-full py-16  min-h-screen flex justify-center items-center">
      <SignUp
        signInUrl="/sign-in"
        afterSignUpUrl="/onboarding"
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "rgb(52 211 153)",
            colorText: "rgb(255 255 255)",
            colorBackground: "rgb(15 23 42)",
            colorInputBackground: "rgb(15 23 42)",
            colorTextOnPrimaryBackground: "rgb(2 6 23)",
          },
        }}
      />
    </div>
  );
}
