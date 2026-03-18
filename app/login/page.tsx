// import { KurbanLoginForm } from "@/components/layouts/kurban/login-form";
import { LoginForm } from "@/components/layouts/login-form";

export default async function Page() {
    return (
        <>
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-sm">
                        <LoginForm />
                        {/* <KurbanLoginForm /> */}
                    </div>
                </div>
            </div>
        </>
    )
}