import { css } from "../../../styled-system/css";

export function SpinnerLoader() {
  return (
    <span
      className={css({
        display: "inline-block",
        fontSize: "12px",
        width: "0.8rem",
        height: "0.8rem",
        borderRadius: "999px",
        position: "relative",
        textIndent: "-9999em",
        animation: "mulShdSpin 1.1s infinite ease",
        transform: "translateZ(0)",
      })}
    ></span>
  );
}
