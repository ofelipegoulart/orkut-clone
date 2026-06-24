"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";

const DEFAULT_AVATAR = "/avatar/default.png";

export default function AvatarUpload({
  avatarUrl,
  showAddPhoto = false,
}: {
  avatarUrl?: string;
  showAddPhoto?: boolean;
}) {
  const avatar = avatarUrl || DEFAULT_AVATAR;
  const isDefault = !avatarUrl || avatarUrl === DEFAULT_AVATAR;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filePath, setFilePath] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFilePath(file.name);
    }
  }

  return (
    <>
      <div className="relative inline-block">
        <img
          src={avatar}
          alt=""
          width={120}
          height={120}
          className="mx-auto block"
        />
        {showAddPhoto && isDefault && (
          <a
            href="#"
            className="avatar-add-photo"
            onClick={(e) => {
              e.preventDefault();
              setDialogOpen(true);
            }}
          >
            adicionar foto
          </a>
        )}
      </div>

      {dialogOpen &&
        createPortal(
          <div className="xp-dialog-overlay" onClick={() => setDialogOpen(false)}>
            <div className="xp-dialog" onClick={(e) => e.stopPropagation()}>
              <h2 className="xp-dialog-title">Upload de foto</h2>

              <div className="xp-dialog-file-row">
                <input
                  type="text"
                  className="xp-file-path"
                  value={filePath}
                  readOnly
                />
                <button className="xp-btn" onClick={handleFileSelect}>
                  Arquivo...
                </button>
                <button
                  className="xp-btn"
                  onClick={() => setDialogOpen(false)}
                >
                  Fechar
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.gif,.bmp,.png"
                className="hidden"
                onChange={handleFileChange}
              />

              <p className="xp-dialog-notice">
                Você pode <strong>enviar</strong> arquivos JPG, GIF, BMP ou PNG
                (tamanho máximo de 10MB). Não envie fotos que contenham imagens
                de personagens de desenho animado, pessoas famosas, nudez,
                trabalho artístico ou material protegido por direitos autorais. O
                tamanho mínimo de imagem é de 32x32.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
