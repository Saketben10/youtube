import { Button } from "@/components/ui/button";

import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
        {/* TODO: add menu items and user profile */}
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button
            variant={"outline"}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none []"
          >
            <UserCircleIcon />
            sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
