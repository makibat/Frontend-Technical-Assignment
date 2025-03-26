import { ContextProvider } from "./ContextProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <ContextProvider>{children}</ContextProvider>;
}
