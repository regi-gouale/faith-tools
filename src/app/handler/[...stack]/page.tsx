import { stackServerApp } from "@/features/auth/stack";
import { StackHandler } from "@stackframe/stack";

export default function Handler(props: any) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
