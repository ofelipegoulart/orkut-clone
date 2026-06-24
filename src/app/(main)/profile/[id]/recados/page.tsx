import { FRIENDS, COMMUNITIES, MOCK_RECADOS } from "@/data/mock-data";
import OrkutCommunities from "@/components/Social/orkut-communities";
import OrkutFriends from "@/components/Social/orkut-friends";

export default async function RecadosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen w-full bg-orkut-bg">
      <div className="orkut-col-main flex flex-col gap-[5px]">
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
                  <h1 className="orkut-edit-title text-black py-[7px] pb-[5px]">
                    Minha página de recados ({MOCK_RECADOS.length})
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

              {/* Recados list */}
              <tr>
                <td className="px-2 pb-3">
                  <div className="space-y-2 mt-2">
                    {MOCK_RECADOS.map((recado) => (
                      <div key={recado.id} className="border-l-4 border-[#e8a500] bg-[#fef8e8] p-3">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <input type="checkbox" className="mt-1" />
                          </div>
                          <div className="flex gap-3 flex-grow">
                            <div className="flex-shrink-0">
                              <a href={`/profile/${recado.authorId}`}>
                                <img
                                  src={`https://picsum.photos/seed/${recado.authorSeed}/48/48`}
                                  alt=""
                                  width={48}
                                  height={48}
                                  className="border border-orkut-border"
                                />
                              </a>
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <a href={`/profile/${recado.authorId}`} className="text-orkut-link font-bold text-[13px]">
                                    {recado.author}:
                                  </a>
                                </div>
                                <div className="text-[#999] text-[11px]">
                                  {recado.timestamp}
                                </div>
                              </div>
                              <div className="text-[#333] text-[12px] leading-[16px] mt-1">
                                {recado.content}
                              </div>
                              <div className="mt-2 flex gap-4 text-orkut-link text-[11px]">
                                <a href="#" className="underline">
                                  reply
                                </a>
                                <a href="#" className="underline">
                                  View this conversation
                                </a>
                                <a href="#" className="text-red-600 underline">
                                  delete
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
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
