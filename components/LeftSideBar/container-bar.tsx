import { ORKUT_MENU_ICONS } from "@/data/mock-data";
import OrkutMenuIcon from "./menu-icon";

export default function OrkutLeftSidebar({
  displayName,
  isOwnProfile = false,
  userId,
  avatarUrl,
}: {
  displayName: string;
  isOwnProfile?: boolean;
  userId?: string;
  avatarUrl?: string;
}) {
  const avatar = avatarUrl || "/avatar/default.png";

  const menuItems: [string, string][] = [
    [ORKUT_MENU_ICONS.perfil, "perfil"],
    [ORKUT_MENU_ICONS.recados, "recados"],
    [ORKUT_MENU_ICONS.fotos, "fotos"],
    [ORKUT_MENU_ICONS.videos, "vídeos"],
    [ORKUT_MENU_ICONS.depoimentos, "depoimentos"],
  ];

  return (
    <div>
      {/* ── Bloco 1: foto + nome + info ── */}
      <div className="pb-2 text-center">
        <img
          src={avatar}
          alt=""
          width={120}
          height={120}
          className="mx-auto"
        />
        <div className="mt-1 font-bold">
          <a href="#">{displayName}</a>
        </div>
        <div className="text-[11px] text-left" style={{color: "#5a5a5a"}}>masculino, solteiro(a)</div>
        <div className="text-[11px] text-left" style={{color: "#5a5a5a"}}>tangara da serra, Brasil</div>
      </div>

      {/* ── Divisória ── */}
      <div className="border-t border-orkut-border" />

      {/* ── Bloco 2: + amigo (somente para perfis que não são do usuário logado) ── */}
      {!isOwnProfile && (
        <>
          <div className="py-1 pl-[6px]">
            <div>
              <a href="#" className="inline-flex items-center gap-1 text-orkut-link-dark text-[12px]">
                <OrkutMenuIcon src={ORKUT_MENU_ICONS.perfil} />
                + amigo
              </a>
            </div>
            <div className="mt-[2px]">
              <a href="#" className="text-orkut-link-dark text-[12px] pl-[20px]">mais »</a>
            </div>
          </div>
          <div className="border-t border-orkut-border" />
        </>
      )}

      {/* ── Bloco 3: menu lateral ── */}
      <div className="pt-1">
        <table
          className="w-full border-collapse overflow-hidden border border-orkut-border rounded"
          cellPadding={0}
          cellSpacing={0}
        >
          <tbody>
            {menuItems.map(([iconSrc, label]) => {
              const isPerfil = label === "perfil";
              const href = userId
                ? label === "recados" ? `/profile/${userId}/recados`
                : label === "fotos" ? `/profile/${userId}/fotos`
                : label === "perfil" ? `/profile/${userId}`
                : "#"
                : "#";

              return (
                <tr
                  key={label}
                  className={isOwnProfile ? "bg-white hover:bg-[#f5f5f5]" : "bg-[#ddeeff] hover:bg-[#c8e0f5]"}
                >
                  <td className="px-[6px] py-[3px]">
                    <div className="flex items-center justify-between">
                      <a
                        href={href}
                        className="inline-flex items-center gap-[5px] !text-[#5a5a5a] text-[12px] font-[Tahoma,Verdana,Arial,sans-serif] no-underline"
                      >
                        <OrkutMenuIcon src={iconSrc} />
                        {label}
                      </a>
                      {isOwnProfile && isPerfil && (
                        <a
                          href="/profile/EditSummary"
                          className="text-orkut-link-dark text-[11px] font-[Tahoma,Verdana,Arial,sans-serif]"
                        >
                          editar
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
