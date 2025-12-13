interface FormErrMsgProps {
  children: React.ReactNode;
}
export default function FormErrMsg({ children }: FormErrMsgProps) {
  return (
    <p role="alert" aria-live="assertive" className="text-xs text-red-500">
      {children}
    </p>
  );
}
