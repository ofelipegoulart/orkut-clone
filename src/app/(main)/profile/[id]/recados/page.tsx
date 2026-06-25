import { FRIENDS, COMMUNITIES, MOCK_RECADOS, type Scrap } from "@/data/mock-data";
import OrkutCommunities from "@/components/Social/orkut-communities";
import OrkutFriends from "@/components/Social/orkut-friends";
import { MarkScrapsRead } from "@/components/Scraps/mark-scraps-read";

function buildThreads(scraps: Scrap[]) {
  const rootScraps = scraps.filter((s) => s.parentId === null);
  const repliesByParent = new Map<string, Scrap[]>();

  for (const scrap of scraps) {
    if (scrap.parentId === null) continue;
    const rootId = findRootId(scrap.parentId, scraps);
    const existing = repliesByParent.get(rootId) ?? [];
    existing.push(scrap);
    repliesByParent.set(rootId, existing);
  }

  return rootScraps.map((root) => ({
    root,
    replies: (repliesByParent.get(root.id) ?? []).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ),
  }));
}

function findRootId(parentId: string, scraps: Scrap[]): string {
  const parent = scraps.find((s) => s.id === parentId);
  if (!parent || parent.parentId === null) return parentId;
  return findRootId(parent.parentId, scraps);
}

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const h12 = hours % 12 || 12;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let relative: string;
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      relative = `${diffMins} min atrás`;
    } else {
      relative = `${diffHours}h atrás`;
    }
  } else if (diffDays === 1) {
    relative = "ontem";
  } else {
    relative = `${diffDays} dias atrás`;
  }

  return `${h12}:${minutes} ${ampm} (${relative})`;
}

const UNREAD_STYLES = {
  root: "border-[#e8a500] bg-[#fff3a8]",
  reply: "border-[#d4a017] bg-[#fff3a8]",
} as const;

const READ_STYLES = {
  root: "border-[#e8a500] bg-[#fef8e8]",
  reply: "border-[#c4a24a] bg-[#fdf3d7]",
} as const;

function ScrapCard({ scrap, isReply }: { scrap: Scrap; isReply?: boolean }) {
  const isUnread = scrap.readAt === null;
  const variant = isReply ? "reply" : "root";
  const styles = isUnread ? UNREAD_STYLES[variant] : READ_STYLES[variant];

  return (
    <div className={`border-l-4 ${styles} p-3 ${isReply ? "ml-8" : ""}`}>
      <div className="flex gap-3">
        <div className="shrink-0">
          <input type="checkbox" className="mt-1" />
        </div>
        <div className="flex gap-3 grow">
          <div className="shrink-0">
            <a href={`/profile/${scrap.authorId}`}>
              <img
                src={`https://picsum.photos/seed/${scrap.authorAvatar}/48/48`}
                alt=""
                width={48}
                height={48}
                className="border border-orkut-border"
              />
            </a>
          </div>
          <div className="grow">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1.5">
                <a href={`/profile/${scrap.authorId}`} className="text-orkut-link font-bold text-[13px]">
                  {scrap.authorName}:
                </a>
                {isUnread && (
                  <span className="text-[10px] font-bold text-[#b8860b]">novo</span>
                )}
                {scrap.isPrivate && (
                  <span className="text-[10px] text-[#999] italic">privado</span>
                )}
              </div>
              <div className="text-[#999] text-[11px]">
                {formatTimestamp(scrap.createdAt)}
              </div>
            </div>
            <div className="text-[#333] text-[12px] leading-4 mt-1">
              {scrap.content}
            </div>
            <div className="mt-2 flex gap-4 text-orkut-link text-[11px]">
              <a href="#" className="underline">
                reply
              </a>
              <a href="#" className="underline">
                delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function RecadosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const threads = buildThreads(MOCK_RECADOS);
  const totalCount = MOCK_RECADOS.length;
  const unreadIds = MOCK_RECADOS.filter((s) => s.readAt === null).map((s) => s.id);
  const unreadCount = unreadIds.length;

  return (
    <div className="min-h-screen w-full bg-orkut-bg">
      <MarkScrapsRead scrapIds={unreadIds} />
      <div className="orkut-col-main flex flex-col gap-1.25">
        {/* Send Scrap Box */}
        <div className="border border-orkut-border bg-white shadow-sm p-2 rounded-lg">
          <textarea
            placeholder="digite o texto ou cole HTML (HTML apenas para amigos)"
            className="w-full h-20 p-2 border border-orkut-border orkut-tahoma text-base"
          />
          <hr className="mb-2 border-0 border-t border-orkut-border" />
          <div className="flex flex-wrap gap-2 mb-0.5 items-center">
            <button className="orkut-btn-white orkut-tahoma text-[12px] px-3">
              enviar recado
            </button>
            <button className="orkut-btn-white orkut-tahoma text-[12px] px-3">
              visualizar
            </button>
            <button className="orkut-btn-white orkut-tahoma text-[12px] px-3">
              adicionar foto
            </button>
            <a href="#" className="text-orkut-link-blue underline text-[12px]">dicas de recados</a>
          </div>
        </div>

        {/* Scraps List Box */}
        <div className="border border-orkut-border bg-white shadow-sm rounded-lg">
          <table className="w-full border-collapse" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td className="flex flex-row pb-2 px-2 pt-2">
                  <h1 className="orkut-edit-title text-black py-1.75 pb-1.25">
                    Minha página de recados ({totalCount})
                    {unreadCount > 0 && (
                      <span className="text-[12px] font-normal text-[#b8860b] ml-1">
                        — {unreadCount} {unreadCount === 1 ? "novo" : "novos"}
                      </span>
                    )}
                  </h1>
                  <div className="text-[12px] ml-auto">
                    <span className="text-[#5a5a5a]">todos podem enviar recados  • </span><a href="#" className="text-orkut-link-blue underline">alterar configurações</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="flex flex-row gap-1 px-2">
                  <a href="#">Início</a>
                  {" > "}
                  <span className="text-[#5a5a5a]">Minha página de recados</span>
                </td>
              </tr>
              <tr>
                <td className="px-2 py-2">
                  <div className="flex justify-between items-center py-2 border-t border-b border-orkut-border">
                    <div className="flex justify-between items-center text-[#5a5a5a] text-[12px]">
                      <div className="flex gap-2">
                        <button className="orkut-btn-white orkut-tahoma text-[12px] px-3">
                          excluir recados selecionados
                        </button>
                        <button className="orkut-btn-white orkut-tahoma text-[12px] px-3">
                          denunciar spam
                        </button>
                      </div>
                    </div>
                    <div className="text-[#5a5a5a] text-[12px]">
                      <select className="text-[11px] border border-orkut-border px-1 py-0.5">
                        <option>Ver 10 recados</option>
                        <option>Ver 20 recados</option>
                        <option>Ver 50 recados</option>
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="flex justify-end items-center text-[#5a5a5a] text-[12px] px-2 py-2 border-b border-orkut-border">
                  <div className="flex gap-2">
                    <span>primeira</span>
                    <span className="text-[#ccc]">{"<"} anterior</span>
                    <span className="text-orkut-link-blue underline">próxima {">"}</span>
                    <span className="text-orkut-link-blue underline">última</span>
                  </div>
                </td>
              </tr>

              {/* Recados list - threaded */}
              <tr>
                <td className="px-2 pb-3">
                  <div className="space-y-2 mt-2">
                    {threads.map((thread) => (
                      <div key={thread.root.id} className="space-y-1">
                        <ScrapCard scrap={thread.root} />
                        {thread.replies.length > 0 && (
                          <>
                            {thread.replies.map((reply) => (
                              <ScrapCard key={reply.id} scrap={reply} isReply />
                            ))}
                            <div className="ml-8 text-[11px] text-[#5a5a5a] italic pl-3">
                              {thread.replies.length + 1} recados nesta conversa
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="orkut-col-right">
        <div className="border border-orkut-border bg-white shadow-sm rounded-[4px_14px_4px_4px]">
          <OrkutFriends friends={FRIENDS} userId={id} />
        </div>
        <div className="border border-orkut-border bg-white shadow-sm rounded-[4px_14px_4px_4px]">
          <OrkutCommunities communities={COMMUNITIES} userId={id} />
        </div>
      </div>
    </div>
  );
}
