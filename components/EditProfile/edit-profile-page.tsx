"use client";

import { useState } from "react";
import { ProfileField } from "./profile-field";
import { useTabForm } from "./use-tab-form";
import type {
  PrivacyLevel,
  ProfileGeneral,
  ProfileSocial,
  ProfileContact,
  ProfileProfessional,
  ProfilePersonal,
} from "@/data/edit-profile/types";
import {
  PRIVACY_OPTIONS,
  MESES,
  DIAS,
  RELACIONAMENTO_OPTIONS,
  PAISES,
  INTERESSADO_EM_OPTIONS,
  INTERESSADO_EM_NAMORO_OPTIONS,
  FILHOS_OPTIONS,
  ETNIA_OPTIONS,
  RELIGIAO_OPTIONS,
  VISAO_POLITICA_OPTIONS,
  ORIENTACAO_SEXUAL_OPTIONS,
  HUMOR_OPTIONS,
  ESTILO_OPTIONS,
  FUMO_OPTIONS,
  BEBO_OPTIONS,
  ANIMAIS_OPTIONS,
  MORO_OPTIONS,
  COR_OLHOS_OPTIONS,
  COR_CABELO_OPTIONS,
  TIPO_FISICO_OPTIONS,
  APARENCIA_OPTIONS,
  ARTE_CORPO_OPTIONS,
  O_QUE_ME_ATRAI_OPTIONS,
  DO_QUE_MAIS_GOSTO_OPTIONS,
  ESCOLARIDADE_OPTIONS,
  IDIOMAS_OPTIONS,
} from "@/data/edit-profile/constants";

type Tab = "geral" | "social" | "contato" | "profissional" | "pessoal";

const TABS: { key: Tab; label: string }[] = [
  { key: "geral", label: "geral" },
  { key: "social", label: "social" },
  { key: "contato", label: "contato" },
  { key: "profissional", label: "profissional" },
  { key: "pessoal", label: "pessoal" },
];

const DEFAULT_PRIVACY: PrivacyLevel = "EVERYONE";

const INITIAL_GENERAL: ProfileGeneral = {
  nome: "",
  sobrenome: "",
  genero: "",
  relacionamento: "não há resposta",
  nascimentoMes: "",
  nascimentoDia: "",
  nascimentoDataPrivacidade: DEFAULT_PRIVACY,
  nascimentoAno: "",
  nascimentoAnoPrivacidade: DEFAULT_PRIVACY,
  cidade: "",
  estado: "",
  cep: "",
  pais: "Brasil",
  idiomas: [""],
  idiomasPrivacidade: DEFAULT_PRIVACY,
  escola: "",
  escolaPrivacidade: DEFAULT_PRIVACY,
  faculdade: "",
  faculdadePrivacidade: DEFAULT_PRIVACY,
  empresa: "",
  empresaPrivacidade: DEFAULT_PRIVACY,
  interessadoEm: [],
  interessadoEmNamoro: "homens",
};

const INITIAL_SOCIAL: ProfileSocial = {
  filhos: "não há resposta",
  etnia: "não há resposta",
  religiao: "sem resposta",
  visaoPolitica: "sem resposta",
  orientacaoSexual: "sem resposta",
  orientacaoSexualPrivacidade: DEFAULT_PRIVACY,
  humor: [],
  estilo: [],
  fumo: "não",
  bebo: "não",
  animais: "não gosto de animais de estimação",
  moro: "não há resposta",
  cidadeNatal: "",
  paginaWeb: "",
  quemSouEu: "",
  paixoes: "",
  esportes: "",
  atividades: "",
  livros: "",
  musica: "",
  programasTv: "",
  cinema: "",
  cozinhas: "",
};

const INITIAL_CONTACT: ProfileContact = {
  emailPrincipal: "",
  emailPrincipalPrivacidade: DEFAULT_PRIVACY,
  emailsSecundarios: [],
  im1: "",
  im1Privacidade: DEFAULT_PRIVACY,
  im2: "",
  im2Privacidade: DEFAULT_PRIVACY,
  telefoneResidencial: "",
  telefoneResidencialPrivacidade: DEFAULT_PRIVACY,
  telefoneCelular: "",
  telefoneCelularPrivacidade: DEFAULT_PRIVACY,
  endereco1: "",
  endereco2: "",
  enderecoCidade: "",
  enderecoEstado: "",
  enderecoCep: "",
  enderecoPais: "Brasil",
};

const INITIAL_PROFESSIONAL: ProfileProfessional = {
  escolaridade: "sem resposta",
  escola: "",
  faculdade: "",
  curso: "",
  diploma: "",
  ano: "",
  profissao: "",
  setor: "",
  empresa: "",
  descricaoTrabalho: "",
  telefoneTrabalho: "",
  habilidadesProfissionais: "",
  interessesProfissionais: "",
};

const INITIAL_PERSONAL: ProfilePersonal = {
  corOlhos: "sem resposta",
  corCabelo: "sem resposta",
  altura: "",
  tipoFisico: "não há resposta",
  aparencia: "não há resposta",
  arteCorpo: "não há resposta",
  parPerfeito: "",
  oQueMeAtrai: [],
  oQueNaoSuporto: "",
  primeiroEncontroIdeal: "",
  relacionamentosAnteriores: "",
  cincoCoisas: "",
  noMeuQuarto: "",
  oQueMaisChamaAtencao: "",
  doQueMaisGosto: "não há resposta",
};

function EditTable({ children }: { children: React.ReactNode }) {
  return (
    <table className="orkut-edit-table" cellPadding={0} cellSpacing={0}>
      <colgroup>
        <col className="orkut-edit-col-label" />
        <col />
      </colgroup>
      <tbody>{children}</tbody>
    </table>
  );
}

function PrivacySelect({
  value,
  onChange,
}: {
  value: PrivacyLevel;
  onChange: (v: PrivacyLevel) => void;
}) {
  return (
    <span className="orkut-privacy-wrapper">
      <img src="/icons/i_key.gif" alt="" />
      <select
        className="orkut-privacy-select"
        value={value}
        onChange={(e) => onChange(e.target.value as PrivacyLevel)}
      >
        {PRIVACY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </span>
  );
}

function validateGeneral(data: ProfileGeneral): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.nome.trim()) errors.nome = "Este campo é obrigatório.";
  if (!data.sobrenome.trim()) errors.sobrenome = "Este campo é obrigatório.";
  if (!data.genero) errors.genero = "Este campo é obrigatório.";
  if (!data.pais) errors.pais = "Este campo é obrigatório.";
  return errors;
}

// ────────────────────────────────────────────────
// ABA GERAL
// ────────────────────────────────────────────────

function GeneralTab({
  data,
  update,
  errors,
}: {
  data: ProfileGeneral;
  update: (key: keyof ProfileGeneral, value: ProfileGeneral[keyof ProfileGeneral]) => void;
  errors: Record<string, string>;
}) {
  return (
    <EditTable>
      <ProfileField type="text" label="nome" name="nome" required value={data.nome} onChange={(v) => update("nome", v)} error={errors.nome} />
      <ProfileField type="text" label="sobrenome" name="sobrenome" required value={data.sobrenome} onChange={(v) => update("sobrenome", v)} error={errors.sobrenome} />
      <ProfileField type="radio" label="gênero" name="genero" required value={data.genero} onChange={(v) => update("genero", v)} options={["feminino", "masculino", "não binário"]} error={errors.genero} />

      <ProfileField
        type="select"
        label="relacionamento"
        name="relacionamento"
        value={data.relacionamento}
        onChange={(v) => update("relacionamento", v)}
        options={RELACIONAMENTO_OPTIONS}
      />

      <tr>
        <td className="orkut-edit-label">nascimento:</td>
        <td className="orkut-edit-field">
          <PrivacySelect
            value={data.nascimentoDataPrivacidade}
            onChange={(v) => update("nascimentoDataPrivacidade", v)}
          />
          <select className="orkut-select" value={data.nascimentoMes} onChange={(e) => update("nascimentoMes", e.target.value)}>
            {MESES.map((m) => (
              <option key={m} value={m}>{m || "mês"}</option>
            ))}
          </select>
          {" "}
          <select className="orkut-select" value={data.nascimentoDia} onChange={(e) => update("nascimentoDia", e.target.value)}>
            {DIAS.map((d) => (
              <option key={d} value={d}>{d || "dia"}</option>
            ))}
          </select>
        </td>
      </tr>

      <tr>
        <td className="orkut-edit-label">ano de nascimento:</td>
        <td className="orkut-edit-field">
          <PrivacySelect
            value={data.nascimentoAnoPrivacidade}
            onChange={(v) => update("nascimentoAnoPrivacidade", v)}
          />
          <input type="text" className="orkut-input orkut-input-sm" value={data.nascimentoAno} onChange={(e) => update("nascimentoAno", e.target.value)} maxLength={4} />
        </td>
      </tr>

      <ProfileField type="text" label="cidade" name="cidade" value={data.cidade} onChange={(v) => update("cidade", v)} />
      <ProfileField type="text" label="estado" name="estado" value={data.estado} onChange={(v) => update("estado", v)} />
      <ProfileField type="text" label="CEP" name="cep" value={data.cep} onChange={(v) => update("cep", v)} />
      <ProfileField type="select" label="país" name="pais" required value={data.pais} onChange={(v) => update("pais", v)} options={PAISES} error={errors.pais} />

      {data.idiomas.map((idioma, i) => (
        <tr key={i}>
          <td className="orkut-edit-label">{i === 0 ? "idiomas que falo:" : ""}</td>
          <td className="orkut-edit-field">
            {i === 0 && (
              <PrivacySelect
                value={data.idiomasPrivacidade}
                onChange={(v) => update("idiomasPrivacidade", v)}
              />
            )}
            <select
              className="orkut-select"
              value={idioma}
              onChange={(e) => {
                const next = [...data.idiomas];
                next[i] = e.target.value;
                update("idiomas", next);
              }}
            >
              <option value="">selecione</option>
              {IDIOMAS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {i > 0 && (
              <button
                type="button"
                className="orkut-btn-edit"
                onClick={() => update("idiomas", data.idiomas.filter((_, j) => j !== i))}
              >
                remover
              </button>
            )}
          </td>
        </tr>
      ))}
      <tr>
        <td className="orkut-edit-label">&nbsp;</td>
        <td className="orkut-edit-field">
          <button type="button" className="orkut-btn-edit" onClick={() => update("idiomas", [...data.idiomas, ""])}>
            adicionar outro idioma
          </button>
        </td>
      </tr>

      <ProfileField
        type="text"
        label="escola (ensino médio)"
        name="escola"
        value={data.escola}
        onChange={(v) => update("escola", v)}
        privacy
        privacyValue={data.escolaPrivacidade}
        onPrivacyChange={(v) => update("escolaPrivacidade", v)}
      />
      <ProfileField
        type="text"
        label="faculdade"
        name="faculdade"
        value={data.faculdade}
        onChange={(v) => update("faculdade", v)}
        privacy
        privacyValue={data.faculdadePrivacidade}
        onPrivacyChange={(v) => update("faculdadePrivacidade", v)}
      />
      <ProfileField
        type="text"
        label="empresa / organização"
        name="empresa"
        value={data.empresa}
        onChange={(v) => update("empresa", v)}
        privacy
        privacyValue={data.empresaPrivacidade}
        onPrivacyChange={(v) => update("empresaPrivacidade", v)}
      />

      <ProfileField
        type="checkbox"
        label="interessado(a) em"
        name="interessadoEm"
        value={data.interessadoEm}
        onChange={(v) => update("interessadoEm", v)}
        options={INTERESSADO_EM_OPTIONS}
      />
      {data.interessadoEm.includes("namoro") && (
        <ProfileField
          type="select"
          label="gostaria de namorar"
          name="interessadoEmNamoro"
          value={data.interessadoEmNamoro}
          onChange={(v) => update("interessadoEmNamoro", v)}
          options={INTERESSADO_EM_NAMORO_OPTIONS}
        />
      )}
    </EditTable>
  );
}

// ────────────────────────────────────────────────
// ABA SOCIAL
// ────────────────────────────────────────────────

function SocialTab({
  data,
  update,
}: {
  data: ProfileSocial;
  update: (key: keyof ProfileSocial, value: ProfileSocial[keyof ProfileSocial]) => void;
}) {
  return (
    <EditTable>
      <ProfileField type="select" label="filhos" name="filhos" value={data.filhos} onChange={(v) => update("filhos", v)} options={FILHOS_OPTIONS} />
      <ProfileField type="select" label="etnia" name="etnia" value={data.etnia} onChange={(v) => update("etnia", v)} options={ETNIA_OPTIONS} />
      <ProfileField type="select" label="religião" name="religiao" value={data.religiao} onChange={(v) => update("religiao", v)} options={RELIGIAO_OPTIONS} />
      <ProfileField type="select" label="visão política" name="visaoPolitica" value={data.visaoPolitica} onChange={(v) => update("visaoPolitica", v)} options={VISAO_POLITICA_OPTIONS} />
      <ProfileField type="checkbox" label="humor" name="humor" value={data.humor} onChange={(v) => update("humor", v)} options={HUMOR_OPTIONS} />
      <ProfileField
        type="select"
        label="orientação sexual"
        name="orientacaoSexual"
        value={data.orientacaoSexual}
        onChange={(v) => update("orientacaoSexual", v)}
        options={ORIENTACAO_SEXUAL_OPTIONS}
        privacy
        privacyValue={data.orientacaoSexualPrivacidade}
        onPrivacyChange={(v) => update("orientacaoSexualPrivacidade", v)}
      />
      <ProfileField type="checkbox" label="estilo" name="estilo" value={data.estilo} onChange={(v) => update("estilo", v)} options={ESTILO_OPTIONS} />
      <ProfileField type="select" label="fumo" name="fumo" value={data.fumo} onChange={(v) => update("fumo", v)} options={FUMO_OPTIONS} />
      <ProfileField type="select" label="bebo" name="bebo" value={data.bebo} onChange={(v) => update("bebo", v)} options={BEBO_OPTIONS} />
      <ProfileField type="select" label="animais de estimação" name="animais" value={data.animais} onChange={(v) => update("animais", v)} options={ANIMAIS_OPTIONS} />
      <ProfileField type="select" label="moro" name="moro" value={data.moro} onChange={(v) => update("moro", v)} options={MORO_OPTIONS} />
      <ProfileField type="text" label="cidade natal" name="cidadeNatal" value={data.cidadeNatal} onChange={(v) => update("cidadeNatal", v)} />
      <ProfileField type="text" label="página da web" name="paginaWeb" value={data.paginaWeb} onChange={(v) => update("paginaWeb", v)} />
      <ProfileField type="textarea" label="quem sou eu" name="quemSouEu" value={data.quemSouEu} onChange={(v) => update("quemSouEu", v)} />
      <ProfileField type="textarea" label="paixões" name="paixoes" value={data.paixoes} onChange={(v) => update("paixoes", v)} />
      <ProfileField type="textarea" label="esportes" name="esportes" value={data.esportes} onChange={(v) => update("esportes", v)} />
      <ProfileField type="textarea" label="atividades" name="atividades" value={data.atividades} onChange={(v) => update("atividades", v)} />
      <ProfileField type="textarea" label="livros" name="livros" value={data.livros} onChange={(v) => update("livros", v)} />
      <ProfileField type="textarea" label="música" name="musica" value={data.musica} onChange={(v) => update("musica", v)} />
      <ProfileField type="textarea" label="programas de tv" name="programasTv" value={data.programasTv} onChange={(v) => update("programasTv", v)} />
      <ProfileField type="textarea" label="cinema" name="cinema" value={data.cinema} onChange={(v) => update("cinema", v)} />
      <ProfileField type="textarea" label="cozinhas" name="cozinhas" value={data.cozinhas} onChange={(v) => update("cozinhas", v)} />
    </EditTable>
  );
}

// ────────────────────────────────────────────────
// ABA CONTATO
// ────────────────────────────────────────────────

function ContactTab({
  data,
  update,
}: {
  data: ProfileContact;
  update: (key: keyof ProfileContact, value: ProfileContact[keyof ProfileContact]) => void;
}) {
  return (
    <>
      <p className="px-2.5 py-2 text-[11px] text-[#333] leading-[1.4] bg-white">
        Digite todos os endereços de e-mail.
        <br />
        Quando os membros adicionam amigos, usamos os endereços de e-mail que você fornece para identificá-lo.
      </p>
      <EditTable>
        <ProfileField
          type="text"
          label="e-mail principal"
          name="emailPrincipal"
          value={data.emailPrincipal}
          onChange={(v) => update("emailPrincipal", v)}
          privacy
          privacyValue={data.emailPrincipalPrivacidade}
          onPrivacyChange={(v) => update("emailPrincipalPrivacidade", v)}
        />

        {data.emailsSecundarios.map((item, i) => (
          <tr key={i}>
            <td className="orkut-edit-label">{i === 0 ? "e-mails secundários:" : ""}</td>
            <td className="orkut-edit-field">
              <PrivacySelect
                value={item.privacidade}
                onChange={(v) => {
                  const next = [...data.emailsSecundarios];
                  next[i] = { ...next[i], privacidade: v };
                  update("emailsSecundarios", next);
                }}
              />
              <input
                type="text"
                className="orkut-input"
                value={item.email}
                onChange={(e) => {
                  const next = [...data.emailsSecundarios];
                  next[i] = { ...next[i], email: e.target.value };
                  update("emailsSecundarios", next);
                }}
              />
              {" "}
              <button
                type="button"
                className="orkut-btn-edit"
                onClick={() => update("emailsSecundarios", data.emailsSecundarios.filter((_, j) => j !== i))}
              >
                remover
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td className="orkut-edit-label">{data.emailsSecundarios.length === 0 ? "e-mails secundários:" : ""}</td>
          <td className="orkut-edit-field">
            <button
              type="button"
              className="orkut-btn-edit"
              onClick={() =>
                update("emailsSecundarios", [
                  ...data.emailsSecundarios,
                  { email: "", privacidade: DEFAULT_PRIVACY },
                ])
              }
            >
              adicionar
            </button>
          </td>
        </tr>

        <ProfileField
          type="text"
          label="Nome de usuário IM (1)"
          name="im1"
          value={data.im1}
          onChange={(v) => update("im1", v)}
          privacy
          privacyValue={data.im1Privacidade}
          onPrivacyChange={(v) => update("im1Privacidade", v)}
        />
        <ProfileField
          type="text"
          label="Nome de usuário IM (2)"
          name="im2"
          value={data.im2}
          onChange={(v) => update("im2", v)}
          privacy
          privacyValue={data.im2Privacidade}
          onPrivacyChange={(v) => update("im2Privacidade", v)}
        />
        <ProfileField
          type="text"
          label="telefone residencial"
          name="telefoneResidencial"
          value={data.telefoneResidencial}
          onChange={(v) => update("telefoneResidencial", v)}
          privacy
          privacyValue={data.telefoneResidencialPrivacidade}
          onPrivacyChange={(v) => update("telefoneResidencialPrivacidade", v)}
        />
        <ProfileField
          type="text"
          label="telefone celular"
          name="telefoneCelular"
          value={data.telefoneCelular}
          onChange={(v) => update("telefoneCelular", v)}
          privacy
          privacyValue={data.telefoneCelularPrivacidade}
          onPrivacyChange={(v) => update("telefoneCelularPrivacidade", v)}
        />
        <ProfileField type="text" label="endereço 1" name="endereco1" value={data.endereco1} onChange={(v) => update("endereco1", v)} />
        <ProfileField type="text" label="endereço 2" name="endereco2" value={data.endereco2} onChange={(v) => update("endereco2", v)} />
        <ProfileField type="text" label="cidade" name="enderecoCidade" value={data.enderecoCidade} onChange={(v) => update("enderecoCidade", v)} />
        <ProfileField type="text" label="estado" name="enderecoEstado" value={data.enderecoEstado} onChange={(v) => update("enderecoEstado", v)} />
        <ProfileField type="text" label="CEP" name="enderecoCep" value={data.enderecoCep} onChange={(v) => update("enderecoCep", v)} />
        <ProfileField type="select" label="país" name="enderecoPais" value={data.enderecoPais} onChange={(v) => update("enderecoPais", v)} options={PAISES} />
      </EditTable>
    </>
  );
}

// ────────────────────────────────────────────────
// ABA PROFISSIONAL
// ────────────────────────────────────────────────

function ProfessionalTab({
  data,
  update,
}: {
  data: ProfileProfessional;
  update: (key: keyof ProfileProfessional, value: ProfileProfessional[keyof ProfileProfessional]) => void;
}) {
  return (
    <EditTable>
      <ProfileField type="select" label="escolaridade" name="escolaridade" value={data.escolaridade} onChange={(v) => update("escolaridade", v)} options={ESCOLARIDADE_OPTIONS} />
      <ProfileField type="text" label="escola" name="escola" value={data.escola} onChange={(v) => update("escola", v)} />
      <ProfileField type="text" label="faculdade" name="faculdade" value={data.faculdade} onChange={(v) => update("faculdade", v)} />
      <ProfileField type="text" label="curso" name="curso" value={data.curso} onChange={(v) => update("curso", v)} />
      <ProfileField type="text" label="diploma" name="diploma" value={data.diploma} onChange={(v) => update("diploma", v)} />
      <ProfileField type="text" label="ano" name="ano" value={data.ano} onChange={(v) => update("ano", v)} />
      <ProfileField type="text" label="profissão" name="profissao" value={data.profissao} onChange={(v) => update("profissao", v)} />
      <ProfileField type="text" label="setor" name="setor" value={data.setor} onChange={(v) => update("setor", v)} />
      <ProfileField type="text" label="empresa" name="empresa" value={data.empresa} onChange={(v) => update("empresa", v)} />
      <ProfileField type="textarea" label="descrição do trabalho" name="descricaoTrabalho" value={data.descricaoTrabalho} onChange={(v) => update("descricaoTrabalho", v)} />
      <ProfileField type="text" label="telefone do trabalho" name="telefoneTrabalho" value={data.telefoneTrabalho} onChange={(v) => update("telefoneTrabalho", v)} />
      <ProfileField type="textarea" label="habilidades profissionais" name="habilidadesProfissionais" value={data.habilidadesProfissionais} onChange={(v) => update("habilidadesProfissionais", v)} />
      <ProfileField type="textarea" label="interesses profissionais" name="interessesProfissionais" value={data.interessesProfissionais} onChange={(v) => update("interessesProfissionais", v)} />
    </EditTable>
  );
}

// ────────────────────────────────────────────────
// ABA PESSOAL
// ────────────────────────────────────────────────

function PersonalTab({
  data,
  update,
}: {
  data: ProfilePersonal;
  update: (key: keyof ProfilePersonal, value: ProfilePersonal[keyof ProfilePersonal]) => void;
}) {
  return (
    <EditTable>
      <ProfileField type="select" label="cor dos olhos" name="corOlhos" value={data.corOlhos} onChange={(v) => update("corOlhos", v)} options={COR_OLHOS_OPTIONS} />
      <ProfileField type="select" label="cor do cabelo" name="corCabelo" value={data.corCabelo} onChange={(v) => update("corCabelo", v)} options={COR_CABELO_OPTIONS} />
      <ProfileField type="text" label="altura" name="altura" value={data.altura} onChange={(v) => update("altura", v)} />
      <ProfileField type="select" label="tipo físico" name="tipoFisico" value={data.tipoFisico} onChange={(v) => update("tipoFisico", v)} options={TIPO_FISICO_OPTIONS} />
      <ProfileField type="select" label="aparência" name="aparencia" value={data.aparencia} onChange={(v) => update("aparencia", v)} options={APARENCIA_OPTIONS} />
      <ProfileField type="select" label="arte no corpo" name="arteCorpo" value={data.arteCorpo} onChange={(v) => update("arteCorpo", v)} options={ARTE_CORPO_OPTIONS} />
      <ProfileField type="textarea" label="par perfeito" name="parPerfeito" value={data.parPerfeito} onChange={(v) => update("parPerfeito", v)} />
      <ProfileField type="checkbox" label="o que me atrai" name="oQueMeAtrai" value={data.oQueMeAtrai} onChange={(v) => update("oQueMeAtrai", v)} options={O_QUE_ME_ATRAI_OPTIONS} />
      <ProfileField type="textarea" label="o que não suporto" name="oQueNaoSuporto" value={data.oQueNaoSuporto} onChange={(v) => update("oQueNaoSuporto", v)} />
      <ProfileField type="textarea" label="primeiro encontro ideal" name="primeiroEncontroIdeal" value={data.primeiroEncontroIdeal} onChange={(v) => update("primeiroEncontroIdeal", v)} />
      <ProfileField type="textarea" label={<>com os relacionamentos<br />anteriores aprendi</>} name="relacionamentosAnteriores" value={data.relacionamentosAnteriores} onChange={(v) => update("relacionamentosAnteriores", v)} />
      <ProfileField type="textarea" label={<>o que mais chama<br />atenção em mim</>} name="oQueMaisChamaAtencao" value={data.oQueMaisChamaAtencao} onChange={(v) => update("oQueMaisChamaAtencao", v)} />
      <ProfileField type="select" label="do que mais gosto em mim" name="doQueMaisGosto" value={data.doQueMaisGosto} onChange={(v) => update("doQueMaisGosto", v)} options={DO_QUE_MAIS_GOSTO_OPTIONS} />
      <ProfileField type="textarea" label={<>cinco coisas sem as quais<br />não consigo viver</>} name="cincoCoisas" value={data.cincoCoisas} onChange={(v) => update("cincoCoisas", v)} />
      <ProfileField type="textarea" label="no meu quarto você encontra" name="noMeuQuarto" value={data.noMeuQuarto} onChange={(v) => update("noMeuQuarto", v)} />
    </EditTable>
  );
}

// ────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ────────────────────────────────────────────────

export function EditProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("geral");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const generalForm = useTabForm<ProfileGeneral>(INITIAL_GENERAL);
  const socialForm = useTabForm<ProfileSocial>(INITIAL_SOCIAL);
  const contactForm = useTabForm<ProfileContact>(INITIAL_CONTACT);
  const professionalForm = useTabForm<ProfileProfessional>(INITIAL_PROFESSIONAL);
  const personalForm = useTabForm<ProfilePersonal>(INITIAL_PERSONAL);

  function cancelCurrentTab() {
    switch (activeTab) {
      case "geral": generalForm.cancel(); break;
      case "social": socialForm.cancel(); break;
      case "contato": contactForm.cancel(); break;
      case "profissional": professionalForm.cancel(); break;
      case "pessoal": personalForm.cancel(); break;
    }
  }

  function handleTabSwitch(newTab: Tab) {
    if (newTab === activeTab) return;
    cancelCurrentTab();
    setErrors({});
    setActiveTab(newTab);
  }

  function handleUpdate() {
    setErrors({});

    switch (activeTab) {
      case "geral": {
        const errs = validateGeneral(generalForm.data);
        if (Object.keys(errs).length > 0) {
          setErrors(errs);
          return;
        }
        generalForm.getDirtyPayload();
        generalForm.commit();
        break;
      }
      case "social": {
        socialForm.getDirtyPayload();
        socialForm.commit();
        break;
      }
      case "contato": {
        contactForm.getDirtyPayload();
        contactForm.commit();
        break;
      }
      case "profissional": {
        professionalForm.getDirtyPayload();
        professionalForm.commit();
        break;
      }
      case "pessoal": {
        personalForm.getDirtyPayload();
        personalForm.commit();
        break;
      }
    }
  }

  function handleCancel() {
    setErrors({});
    cancelCurrentTab();
  }

  return (
    <div className="orkut-edit-page">
      <h2 className="orkut-edit-title">Editar perfil</h2>
      <p className="orkut-edit-breadcrumb">
        <a href="/">Início</a>
        <span className="orkut-breadcrumb-sep">&gt;</span>
        <a href="/profile">Meu perfil</a>
        <span className="orkut-breadcrumb-sep">&gt;</span>
        Editar perfil
      </p>

      {/* aba navegação */}
      <div className="orkut-edit-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={
              activeTab === tab.key
                ? "orkut-edit-tab orkut-edit-tab-active"
                : "orkut-edit-tab"
            }
            onClick={() => handleTabSwitch(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* conteúdo da aba */}
      <div className="orkut-edit-body">
        {activeTab === "geral" && <GeneralTab data={generalForm.data} update={generalForm.update} errors={errors} />}
        {activeTab === "social" && <SocialTab data={socialForm.data} update={socialForm.update} />}
        {activeTab === "contato" && <ContactTab data={contactForm.data} update={contactForm.update} />}
        {activeTab === "profissional" && <ProfessionalTab data={professionalForm.data} update={professionalForm.update} />}
        {activeTab === "pessoal" && <PersonalTab data={personalForm.data} update={personalForm.update} />}

        <div className="orkut-edit-buttons">
          <button type="button" className="orkut-btn-edit" onClick={handleUpdate}>
            atualizar
          </button>
          {" "}
          <button type="button" className="orkut-btn-edit" onClick={handleCancel}>
            cancelar
          </button>
        </div>
      </div>

    </div>
  );
}
