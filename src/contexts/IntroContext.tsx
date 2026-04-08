import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export type IntroContextValue = {
  introComplete: boolean;
  setIntroComplete: Dispatch<SetStateAction<boolean>>;
};

export const IntroContext = createContext<IntroContextValue>({
  introComplete: true,
  setIntroComplete: () => {},
});

export function useIntroOptional() {
  return useContext(IntroContext);
}
