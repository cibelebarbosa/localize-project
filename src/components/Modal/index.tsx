import React, { ReactNode } from "react";

import "./style.scss";

type Props = {
  children?: ReactNode;
  title?: string;
  toggle: boolean;
};

export default function Modal({ children, title, toggle }: Props) {
  return (
    <>
      {toggle ? (
        <div className="modal-card">
          <p className="modal-heading">{title}</p>
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
