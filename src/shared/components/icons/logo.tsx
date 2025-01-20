import { cn } from "@/shared/utils/utils";
import Link from "next/link";

export function Logo(props: { className?: string; link?: string }) {
  return (
    <Link
      href={props.link ?? "/"}
      className={cn("items-center space-x-2", props.className)}
    >
      <span className="font-semibold sm:inline-block">
        Faith<span className="font-black">Tools</span>
      </span>
    </Link>
  );
}
