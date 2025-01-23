import { AddMemberForm } from "@/features/members/add-member-form";

export default function AddMemberPage() {
  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Ajouter un membre
          </h2>
          <div>
            <AddMemberForm />
          </div>
        </div>
      </div>
    </>
  );
}
