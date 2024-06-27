import { ReactNode } from "react";

export default function DotButton({ className, onClick }: { className: string, onClick: VoidFunction}) {
    return (
        <button type="button" className={className} onClick={onClick}>
        </button>
      )
}