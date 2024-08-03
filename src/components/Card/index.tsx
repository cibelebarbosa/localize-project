import React, { ReactNode } from "react";
import "./style.scss";
import { table } from "console";

type Props = {
  children?: ReactNode;
  title?: string;
  table?: boolean;
};

export default function CardCustom({ children, title, table }: Props) {
  return (
    <>
      <div className="card">
       
        {table === true ? (
          <>
            <div className="content__table">{children}</div>
          </>
        ) : (
          <>
            <div className="header">
              <div className="title">{title}</div>
            </div>
            <div className="content">{children}</div>
          </>
        )}
      </div>
    </>
  );
}
