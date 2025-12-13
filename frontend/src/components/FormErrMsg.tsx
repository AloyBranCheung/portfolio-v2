interface FormErrMsgProps {
  children: React.ReactNode;
}
export default function FormErrMsg({ children }: FormErrMsgProps) {
  return <p className="text-xs text-red-500">{children}</p>;
}
