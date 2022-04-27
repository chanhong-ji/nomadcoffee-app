import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    color: {
      bg: string;
      accent: string;
      secondBg: string;
      text: string;
      border: string;
    };
  }
}
