interface GlossyButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function GlossyButton({
  children,
  type = "button",
  onClick,
  className,
  disabled,
}: GlossyButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`aqua-button inline-flex items-center justify-center px-5 py-[5px] rounded-full text-white text-[13px] font-semibold select-none ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
