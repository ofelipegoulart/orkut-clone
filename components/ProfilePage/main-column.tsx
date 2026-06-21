import OrkutMenuIcon from "@/components/LeftSideBar/menu-icon";
import { CoolIndicator } from "@/utils/cool-indicator";
import { SexyIndicator } from "@/utils/sexy-indicator";
import { TrustableIndicator } from "@/utils/trustable-indicator";
import { PROFILE_ROWS, ORKUT_MENU_ICONS } from "@/data/mock-data";
import fortunes from "@/data/fortunes.json";
import type { ReactNode } from "react";

function getFortuneOfTheDay(): string {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const keys = Object.keys(fortunes);
  const index = dayOfYear % keys.length;
  return fortunes[keys[index] as keyof typeof fortunes];
}

function FortuneOfTheDay() {
  const fortune = getFortuneOfTheDay();
  return (
    <div className="text-[14px] text-[#333] py-1" style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}>
      <span className="font-bold text-[14px]">Sorte do dia: </span>
      {fortune}
    </div>
  );
}

function IconCell({ href, label, icon, count }: { href: string; label: string; icon: string; count: number }) {
  return (
    <td className="pr-3 align-top">
      <div className="text-[#5a5a5a] text-[11px] leading-3.5">
        <a href={href} className="text-[#5a5a5a] no-underline">{label}</a>
      </div>
      <div className="leading-4">
        <OrkutMenuIcon src={icon} />
        <span className="text-[11px]">{count}</span>
      </div>
    </td>
  );
}

function OwnProfileView({ displayName, userId }: { displayName: string; userId: string }) {
  return (
    <table className="w-full border-collapse" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td className="pb-1">
            <h1
              className="font-normal text-black py-1.75 pb-1.25"
              style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "22px", lineHeight: "28px", fontWeight: "normal" }}
            >
              Bem-vindo, {displayName}
            </h1>
          </td>
        </tr>
        <tr>
          <td className="pb-2">
            <div className="flex items-center gap-2 border border-orkut-border bg-[#f5f9ff] px-2 py-1.5">
              <span
                className="flex-1 text-[#999] text-[12px]"
                style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}
              >
                Defina seu status aqui
              </span>
              <button
                type="button"
                className="border border-orkut-border bg-orkut-tab-inactive px-3 py-0.5 text-[11px] text-[#333] cursor-default"
                style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}
              >
                editar
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td className="pb-2">
            <div className="border-t border-orkut-border"></div>
            <table className="border-collapse" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr className="align-top">
                  <IconCell href={`/profile/${userId}/recados`} label="recados" icon={ORKUT_MENU_ICONS.recados} count={0} />
                  <IconCell href={`/profile/${userId}/fotos`} label="fotos" icon={ORKUT_MENU_ICONS.fotos} count={0} />
                  <IconCell href="#" label="vídeos" icon={ORKUT_MENU_ICONS.videos} count={0} />
                  <IconCell href="#" label="fãs" icon={ORKUT_MENU_ICONS.fans} count={0} />
                </tr>
              </tbody>
            </table>
            <div className="border-t border-orkut-border"></div>
          </td>
        </tr>
        <tr>
          <td className="pb-2">
            <FortuneOfTheDay />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function VisitorProfileView({ displayName, userId, profileRows }: { displayName: string; userId: string; profileRows: { label: string; value: ReactNode }[] }) {
  return (
    <table className="w-full border-collapse" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td className="pb-2">
            <h1
              className="font-normal text-black py-1.75 pb-1.25"
              style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "22px", lineHeight: "28px", fontWeight: "normal" }}
            >
              {displayName}
            </h1>
          </td>
        </tr>
        <tr>
          <td className="pb-2">
            <div className="border-t border-orkut-border"></div>
            <table className="border-collapse" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr className="align-top">
                  <IconCell href={`/profile/${userId}/recados`} label="recados" icon={ORKUT_MENU_ICONS.recados} count={114} />
                  <IconCell href={`/profile/${userId}/fotos`} label="fotos" icon={ORKUT_MENU_ICONS.fotos} count={0} />
                  <IconCell href="#" label="vídeos" icon={ORKUT_MENU_ICONS.videos} count={5} />
                  <IconCell href="#" label="fãs" icon={ORKUT_MENU_ICONS.fans} count={15} />
                  {/* confiável */}
                  <td className="pr-3 align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-3.5">confiável</div>
                    <div className="leading-4">
                      <TrustableIndicator trustablePercentage={3 / 6} />
                    </div>
                  </td>
                  {/* legal */}
                  <td className="pr-3 align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-3.5">legal</div>
                    <div className="leading-4">
                      <CoolIndicator coolPercentage={2 / 6} />
                    </div>
                  </td>
                  {/* sexy */}
                  <td className="align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-3.5">sexy</div>
                    <div className="leading-4">
                      <SexyIndicator sexyPercentage={5 / 6} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border-t border-orkut-border"></div>
          </td>
        </tr>
        <tr>
          <td className="pb-0">
            <div className="inline-block bg-orkut-header-blue px-3 py-0.5 font-bold text-[12px] border border-orkut-border border-b-0 rounded-t text-orkut-link-dark">
              social
            </div>
          </td>
        </tr>
        <tr>
          <td className="orkut-social-table-wrap pt-0">
            <table
              className="orkut-social-fields w-full border border-orkut-border"
              cellPadding={0}
              cellSpacing={0}
            >
              <colgroup>
                <col className="orkut-social-col-label" />
                <col />
              </colgroup>
              <tbody>
                {profileRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-[#E6F0FA]" : "bg-[#F5F9FF]"}
                  >
                    <td className="orkut-social-label">{row.label}</td>
                    <td className="orkut-social-value">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function OrkutMainColumn({
  displayName,
  userId,
  isOwnProfile,
  profileRows,
}: {
  displayName: string;
  userId: string;
  isOwnProfile: boolean;
  profileRows: { label: string; value: ReactNode }[];
}) {
  if (isOwnProfile) {
    return <OwnProfileView displayName={displayName} userId={userId} />;
  }
  return <VisitorProfileView displayName={displayName} userId={userId} profileRows={profileRows} />;
}
