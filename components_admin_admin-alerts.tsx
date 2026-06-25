"use client";

interface AdminAlertProps {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
}

/**
 * Exibe alerta de feedback no painel administrativo.
 * @param message - Texto a mostrar.
 * @param type - Estilo success ou error.
 * @param onClose - Callback opcional ao fechar.
 */
export function AdminAlert({ message, type, onClose }: AdminAlertProps) {
  const className: string =
    type === "success"
      ? "border-green-300 bg-green-50 text-green-900"
      : "border-red-300 bg-red-50 text-red-900";
  return (
    <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <span>{message}</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="font-semibold opacity-70 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
