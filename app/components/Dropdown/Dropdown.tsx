/* eslint-disable jsx-a11y/no-static-element-interactions */

// REACT
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
// REMIX
import { useNavigation } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
// STYLES
import styles from "./Dropdown.module.css";

export type DropdownRef = {
  closeMenu: () => void;
};

export default forwardRef<
  DropdownRef,
  {
    selected: string;
    children: ReactNode;
    className?: string;
  }
>(function Dropdown({ selected, children, className }, ref) {
  const { location } = useNavigation();
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);

  useEffect(() => {
    location && setMenuVisibility(false);
  }, [location]);

  useImperativeHandle(
    ref,
    () => {
      return {
        closeMenu: () => setMenuVisibility(false),
      };
    },
    []
  );

  const toggleMenuVisibility = () => {
    setMenuVisibility((prev) => !prev);
  };

  return (
    <>
      <div className={`${styles.dropdown} ${className && styles[className]}`}>
        <button className={styles.trigger} onClick={toggleMenuVisibility}>
          {selected}
          <Icons type="caret-down" />
        </button>
        {menuVisibility && (
          <menu className={styles["dropdown-menu"]}>{children}</menu>
        )}
      </div>
      {menuVisibility && (
        <div
          className={styles.overlay}
          onClick={toggleMenuVisibility}
          onKeyDown={toggleMenuVisibility}
        />
      )}
    </>
  );
});
