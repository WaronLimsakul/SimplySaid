import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const SignInButton = () => {
    return (
        <div>
            <form
                action={async () => {
                    "use server";
                    redirect("/signin");
                }}
            >
                <Button
                    className="md:block hidden m-2 bg-secondary hover:bg-green-700 text-secondary-foreground"
                    type="submit"
                >
                    Sign in
                </Button>
                <Button
                    className="md:hidden rounded-full [&_svg]:h-auto [&_svg]:w-auto"
                    type="submit"
                    variant="ghost"
                    size="icon"
                >
                    <LogIn size={24} strokeWidth={2} />
                </Button>
            </form>
        </div>
    );
};

export default SignInButton;
