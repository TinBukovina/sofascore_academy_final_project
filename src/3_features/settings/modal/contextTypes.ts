import { LanguageType, ThemeType } from "../context/SettingsProvider";

export interface SettingsContextInterface {
  areOptionsDisplayed: boolean;
  setAreOptionsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  theme: ThemeType;
  changeTheme: (value: ThemeType) => void;
  language: LanguageType | null;
  changeLanguage: (value: LanguageType) => void;
}
