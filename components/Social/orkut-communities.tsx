type communities = { name: string; seed: string }[]
export default function OrkutCommunities({ communities, userId }: { communities: communities; userId: string }) {
  return (
    <div>
      <div className="font-[Tahoma,Verdana,Arial,sans-serif] text-[15px] leading-5.25 mt-1.25 mb-1.5 font-bold">
        <span className="text-black">minhas comunidades </span>
        <a href={`/profile/${userId}/comunidades`} className="text-orkut-link-dark font-bold">({communities.length})</a>
      </div>

      {communities.length === 0 ? (
        <div>
          <div className="border-t border-orkut-border" />
          <div className="flex justify-end py-1.5">
            <a href="#" className="text-orkut-link-dark"
               style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif", fontSize: "11px", textDecoration: "underline" }}>
              gerenciar
            </a>
          </div>
          <div className="pb-2">
            <button
              type="button"
              className="border border-orkut-border bg-white px-3 py-0.5 text-orkut-link-dark font-bold rounded-md cursor-pointer"
              style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif", fontSize: "11px" }}
            >
              adicionar comunidades
            </button>
          </div>
        </div>
      ) : (
        <div className="-mx-0.75">
          <table
            className="w-full text-center border-separate border-spacing-0.75"
            cellPadding={0}
            cellSpacing={0}
          >
            <tbody>
              {[0, 1, 2].map((row) => (
                <tr key={row}>
                  {communities.slice(row * 3, row * 3 + 3).map((c : any) => (
                    <td
                      key={c.name}
                      className="align-top w-1/3 bg-orkut-tab-inactive px-3 py-4"
                    >
                      <img
                        src={`https://picsum.photos/seed/comm-${c.seed}/48/48`}
                        alt=""
                        width={48}
                        height={48}
                        className="mx-auto border border-orkut-border"
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
      )}
    </div>
  );
}
