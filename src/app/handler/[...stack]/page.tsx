import { stackServerApp } from "@/features/auth/stack";
import { StackHandler } from "@stackframe/stack";

export default function Handler(props: {
  params: unknown;
  searchParams: unknown;
}) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
