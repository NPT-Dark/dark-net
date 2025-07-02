import { Session } from "next-auth";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

function toastUser({ session, id }: { session: Session; id?: string }) {
  return toast(
    <div className="flex items-center">
      {session?.user?.profileImage && session?.user?.profileImage !== "" ? (
        <Image
          src={session?.user?.profileImage}
          width={50}
          height={50}
          alt="avatar toast"
        />
      ) : (
        <div className="cursor-pointer flex items-center justify-center size-10 rounded-full border border-secondary text-third absolute -left-5 bg-secondary">
          <FaUser size={20} />
        </div>
      )}
      <div className="flex flex-col text-primary ml-4">
        <span className="font-semibold">{session?.user?.displayName}</span>
        <p className="text-[12px]">Welcome back to Dark Net</p>
      </div>
    </div>,
    {
      toastId: id || undefined,
    }
  );
}

function toastError({ message, id }: { message: string; id?: string }) {
  return toast.error(
    <div className="flex flex-col text-third">
      <span className="font-semibold">Oops!</span>
      <p className="text-[12px]">{message}</p>
    </div>,
    {
      className: "custom-toast-error",
      icon: false,
      toastId: id || undefined,
    }
  );
}

export { toastUser, toastError };
