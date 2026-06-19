import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { FRIENDS, COMMUNITIES } from "@/data/mock-data";
import OrkutCommunities from "@/components/Social/orkut-communities";
import OrkutFriends from "@/components/Social/orkut-friends";
import { OrkutMainColumn } from "@/components/ProfilePage/main-column";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const displayName = session?.user?.name ?? "Usuário";

  return (
    <div className="min-h-screen w-full bg-[#d4e0ef]">
      <div className="orkut-col-main border border-[#bcd2e8] bg-white shadow-sm">
        <OrkutMainColumn displayName={displayName} userId={id} />
      </div>
      <div className="orkut-col-right">
        <div className="border border-[#bcd2e8] bg-white shadow-sm rounded-[4px_14px_4px_4px]">
          <OrkutFriends friends={FRIENDS} userId={id} />
        </div>
        <div className="border border-[#bcd2e8] bg-white shadow-sm rounded-[4px_14px_4px_4px]">
          <OrkutCommunities communities={COMMUNITIES} userId={id} />
        </div>
      </div>
    </div>
  );
}
