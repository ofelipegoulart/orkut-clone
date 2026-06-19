import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { OrkutHeader } from "@/components/Header/orkut-header";
import OrkutLeftSidebar from "@/components/LeftSideBar/container-bar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email ?? "";
  const displayName = session?.user?.name ?? "";

  return (
    <>
      <OrkutHeader email={email} />
      <div className="min-h-screen w-full bg-[#d4e0ef]">
        <div className="orkut-shell">
          <div className="flow-root">
            <div className="orkut-col-left border border-[#bcd2e8] bg-white shadow-sm">
              <OrkutLeftSidebar displayName={displayName} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
