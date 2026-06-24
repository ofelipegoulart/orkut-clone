import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CURRENT_USER, FRIENDS, COMMUNITIES, PROFILE_ROWS } from "@/data/mock-data";
import OrkutCommunities from "@/components/Social/orkut-communities";
import OrkutFriends from "@/components/Social/orkut-friends";
import { OrkutMainColumn } from "@/components/ProfilePage/main-column";
import { UpdatesSection } from "@/components/ProfilePage/updates-section";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const isOwnProfile = session?.user?.userId === id;
  const displayName = session?.user?.name ?? "Usuário";

  const isMockUser = id === CURRENT_USER.id;
  const friends = isMockUser ? FRIENDS : [];
  const communities = isMockUser ? COMMUNITIES : [];
  const profileRows = isMockUser ? PROFILE_ROWS : [];

  return (
    <div className="min-h-screen w-full bg-orkut-bg">
      <div className="orkut-col-main">
        <div className="border border-orkut-border bg-white shadow-sm orkut-col-main-inner">
          <OrkutMainColumn
            displayName={displayName}
            userId={id}
            isOwnProfile={isOwnProfile}
            profileRows={profileRows}
          />
        </div>
        {isOwnProfile && (
          <div className="orkut-col-section mt-1 bg-white border border-orkut-border px-2 py-1">
            <UpdatesSection />
          </div>
        )}
      </div>
      <div className="orkut-col-right">
        <div className="border border-orkut-border bg-white shadow-sm rounded-lg">
          <OrkutFriends friends={friends} userId={id} />
        </div>
        <div className="border border-orkut-border bg-white shadow-sm rounded-lg">
          <OrkutCommunities communities={communities} userId={id} />
        </div>
      </div>
    </div>
  );
}
