import { OrkutHeader } from "@/components/orkut-header";
import { CoolIndicator } from "@/utils/cool-indicator";
import { SexyIndicator } from "@/utils/sexy-indicator";
import { TrustableIndicator } from "@/utils/trustable-indicator";
import { PROFILE_ROWS, FRIENDS, COMMUNITIES, ORKUT_MENU_ICONS } from "@/data/mock-data";

type Props = {
  params: Promise<{ username: string }>;
};

function displayNameFromUsername(username: string) {
  try {
    return decodeURIComponent(username)
      .replace(/\+/g, " ")
      .replace(/-/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  } catch {
    return username;
  }
}

function emailLocalFromUsername(username: string) {
  try {
    const raw = decodeURIComponent(username).toLowerCase().replace(/\+/g, "");
    const slug = raw.replace(/[^a-z0-9._-]/g, "").slice(0, 32);
    return slug || "usuario";
  } catch {
    return "usuario";
  }
}

function OrkutMenuIcon({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={16}
      height={16}
      className="mr-1 inline-block align-middle"
    />
  );
}

function OrkutLeftSidebar({ displayName }: { displayName: string }) {
  const avatar = `https://picsum.photos/seed/profile-main/120/120`;
  return (
    <div>
      {/* ── Bloco 1: foto + nome + info ── */}
      <div className="pb-2 text-center">
        <img
          src={avatar}
          alt=""
          width={120}
          height={120}
          className="mx-auto border border-[#bcd2e8]"
        />
        <div className="mt-1 font-bold">
          <a href="#">{displayName}</a>
        </div>
        <div className="text-[11px] text-left" style={{color: "#5a5a5a"}}>masculino, solteiro(a)</div>
        <div className="text-[11px] text-left" style={{color: "#5a5a5a"}}>tangara da serra, Brasil</div>
      </div>

      {/* ── Divisória ── */}
      <div className="border-t border-[#d4e0ef]" />

      {/* ── Bloco 2: + amigo (com ícone) e mais » um abaixo do outro ── */}
      <div className="py-1 pl-[6px]">
        <div>
          <a href="#" className="inline-flex items-center gap-1 text-[#02679c] text-[12px]">
            <OrkutMenuIcon src={ORKUT_MENU_ICONS.perfil} />
            + amigo
          </a>
        </div>
        <div className="mt-[2px]">
          <a href="#" className="text-[#02679c] text-[12px] pl-[20px]">mais »</a>
        </div>
      </div>

      {/* ── Divisória ── */}
      <div className="border-t border-[#d4e0ef]" />

      {/* ── Bloco 3: menu lateral (sem título "atalhos") ── */}
      <div className="pt-1">
        <table
          className="w-full border-collapse overflow-hidden border border-[#bcd2e8] rounded"
          cellPadding={0}
          cellSpacing={0}
        >
          <tbody>
            {[
              [ORKUT_MENU_ICONS.perfil, "perfil"],
              [ORKUT_MENU_ICONS.recados, "recados"],
              [ORKUT_MENU_ICONS.fotos, "fotos"],
              [ORKUT_MENU_ICONS.videos, "vídeos"],
              [ORKUT_MENU_ICONS.depoimentos, "depoimentos"],
            ].map(([iconSrc, label]) => (
              <tr key={label} className="bg-[#ddeeff] hover:bg-[#c8e0f5]">
                <td className="border-t border-[#bcd2e8] px-[6px] py-[3px]">
                  <a
                    href="#"
                    className="inline-flex items-center gap-[5px] !text-[#5a5a5a] text-[12px] font-[Tahoma,Verdana,Arial,sans-serif] no-underline"
                  >
                    <OrkutMenuIcon src={iconSrc} />
                    {label}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrkutMainColumn({ displayName }: { displayName: string }) {
  return (
    <table className="w-full border-collapse" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td className="pb-2">
            {/* Profile name heading — Arial, traço fino, sem negrito, como no Orkut 2009 */}
            <h1
              className="font-normal text-black py-[7px] pb-[5px]"
              style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "22px", lineHeight: "28px", fontWeight: "normal" }}
            >
              {displayName}
            </h1>
          </td>
        </tr>
        <tr>
          <td className="pb-2">
            <div className="border-t border-[#d4e0ef]"></div>
            {/* recados / fotos / vídeos / fãs / confiável / legal / sexy */}
            <table className="border-collapse" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr className="align-top">
                  {/* recados */}
                  <td className="pr-[12px] align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-[14px]">
                      <a href="#" className="text-[#5a5a5a] no-underline">recados</a>
                    </div>
                    <div className="leading-[16px]">
                      <OrkutMenuIcon src={ORKUT_MENU_ICONS.recados} />
                      <span className="text-[11px]">114</span>
                    </div>
                  </td>
                  {/* fotos */}
                  <td className="pr-[12px] align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-[14px]">
                      <a href="#" className="text-[#5a5a5a] no-underline">fotos</a>
                    </div>
                    <div className="leading-[16px]">
                      <OrkutMenuIcon src={ORKUT_MENU_ICONS.fotos} />
                      <span className="text-[11px]">0</span>
                    </div>
                  </td>
                  {/* vídeos */}
                  <td className="pr-[12px] align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-[14px]">
                      <a href="#" className="text-[#5a5a5a] no-underline">vídeos</a>
                    </div>
                    <div className="leading-[16px]">
                      <OrkutMenuIcon src={ORKUT_MENU_ICONS.videos} />
                      <span className="text-[11px]">5</span>
                    </div>
                  </td>
                  {/* fãs */}
                  <td className="pr-[20px] align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-[14px]">
                      <a href="#" className="text-[#5a5a5a] no-underline">fãs</a>
                    </div>
                    <div className="leading-[16px]">
                      <OrkutMenuIcon src={ORKUT_MENU_ICONS.fans} />
                      <span className="text-[11px]">15</span>
                    </div>
                  </td>
                  {/* confiável */}
                  <td className="pr-[12px] align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-[14px]">confiável</div>
                    <div className="leading-[16px]">
                      <TrustableIndicator trustablePercentage={3 / 6} />
                    </div>
                  </td>
                  {/* legal */}
                  <td className="pr-[12px] align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-[14px]">legal</div>
                    <div className="leading-[16px]">
                      <CoolIndicator coolPercentage={2 / 6} />
                    </div>
                  </td>
                  {/* sexy */}
                  <td className="align-top">
                    <div className="text-[#5a5a5a] text-[11px] leading-[14px]">sexy</div>
                    <div className="leading-[16px]">
                      <SexyIndicator sexyPercentage={5 / 6} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border-t border-[#d4e0ef]"></div>
          </td>
        </tr>
        <tr>
          <td className="pb-0">
            {/* "social" tab */}
            <div className="inline-block bg-[#6b8cba] px-3 py-0.5 font-bold text-[12px] border border-[#5a7aaa] border-b-0 rounded-t" style={{ color: "#fff" }}>
              social
            </div>
          </td>
        </tr>
        <tr>
          <td className="orkut-social-table-wrap pt-0">
            <table
              className="orkut-social-fields w-full border border-[#bcd2e8]"
              cellPadding={0}
              cellSpacing={0}
            >
              <colgroup>
                <col className="orkut-social-col-label" />
                <col />
              </colgroup>
              <tbody>
                {PROFILE_ROWS.map((row, i) => (
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

function OrkutFriends() {
  return (
    <div>
      <div className="font-[Tahoma,Verdana,Arial,sans-serif] text-[15px] leading-[21px] mt-[5px] mb-[6px] font-bold">
        <span className="text-black">amigos </span>
        <a href="#" className="text-[#02679c] font-bold">(51)</a>
      </div>

      <div className="-mx-[3px]">
        <table
          className="w-full text-center border-separate border-spacing-[3px]"
          cellPadding={0}
          cellSpacing={0}
        >
          <tbody>
            {[0, 1, 2].map((row) => (
              <tr key={row}>
                {FRIENDS.slice(row * 3, row * 3 + 3).map((f) => (
                  <td
                    key={f.name}
                    className="align-top w-1/3 bg-[#e8edf2] px-[3px] py-[4px]"
                  >
                    <img
                      src={`https://picsum.photos/seed/${f.seed}/48/48`}
                      alt=""
                      width={48}
                      height={48}
                      className="mx-auto border border-[#bcd2e8]"
                    />
                    <div className="orkut-uname mt-1">
                      <a href="#">{f.name}</a>{" "}
                      <span className="text-[#8c8c8c]">({f.count})</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#d4e0ef] pt-[4px] mt-[2px]">
        <a href="#" className="underline">ver todos</a>
      </div>
    </div>
  );
}

function OrkutCommunities() {
  return (
    <div>
      <div className="font-[Tahoma,Verdana,Arial,sans-serif] text-[15px] leading-[21px] mt-[5px] mb-[6px] font-bold">
        <span className="text-black">comunidades </span>
        <a href="#" className="text-[#02679c] font-bold">(313)</a>
      </div>

      <div className="-mx-[3px]">
        <table
          className="w-full text-center border-separate border-spacing-[3px]"
          cellPadding={0}
          cellSpacing={0}
        >
          <tbody>
            {[0, 1, 2].map((row) => (
              <tr key={row}>
                {COMMUNITIES.slice(row * 3, row * 3 + 3).map((c) => (
                  <td
                    key={c.name}
                    className="align-top w-1/3 bg-[#e8edf2] px-[3px] py-[4px]"
                  >
                    <img
                      src={`https://picsum.photos/seed/comm-${c.seed}/48/48`}
                      alt=""
                      width={48}
                      height={48}
                      className="mx-auto border border-[#bcd2e8]"
                    />
                    <div className="orkut-uname mt-1">
                      <a href="#">{c.name}</a>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const displayName = displayNameFromUsername(username);
  const email = `${emailLocalFromUsername(username)}@gmail.com`;

  return (
    <div className="min-h-screen w-full bg-[#d4e0ef]">
      <OrkutHeader email={email} />

      <div className="orkut-shell">
        <div className="orkut-three-col">
          <div className="orkut-col-left border border-[#bcd2e8] bg-white shadow-sm">
            <OrkutLeftSidebar displayName={displayName} />
          </div>
          <div className="orkut-col-main border border-[#bcd2e8] bg-white shadow-sm">
            <OrkutMainColumn displayName={displayName} />
          </div>
          <div className="orkut-col-right">
            <div className="border border-[#bcd2e8] bg-white shadow-sm rounded-[4px_14px_4px_4px]">
              <OrkutFriends />
            </div>
            <div className="border border-[#bcd2e8] bg-white shadow-sm rounded-[4px_14px_4px_4px]">
              <OrkutCommunities />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
