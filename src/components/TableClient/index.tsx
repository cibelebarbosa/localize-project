import React from "react";
import "./style.scss";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

type tableClientSchema = {
  nome: string;
  pagos: number;
  abertos: number;
  atrasados: number;
  icons: any;
};

export default function TableClient() {
  const tableData: tableClientSchema[] = [
    {
      nome: "teste1",
      pagos: 12,
      abertos: 12,
      atrasados: 12,
      icons: "",
    },
    {
      nome: "teste1",
      pagos: 12,
      abertos: 12,
      atrasados: 12,
      icons: "",
    },
    {
      nome: "teste1",
      pagos: 12,
      abertos: 12,
      atrasados: 12,
      icons: "",
    },
    {
      nome: "teste1",
      pagos: 12,
      abertos: 12,
      atrasados: 12,
      icons: "",
    },
  ];
  return (
    <>
      <div className="header__table">
        <h1 className="title__table">Clientes</h1>
        <button className="btn__sm" type="submit">
          Cadastrar
        </button>
      </div>
      <table className="_table">
        <tr>
          <th className="table_title__nome">Nome</th>
          <th className="table_title">Pagos</th>
          <th className="table_title">Abertos</th>
          <th className="table_title">Atrasados</th>
          <th className="table_title"></th>
        </tr>

        {tableData.map((item, i) => {
          if (i % 2 === 0) {
            return (
              <tr className="card__right">
                <td className="cell__nome">{item.nome}</td>
                <td className="cell container">
                  <div className="rounded">{item.pagos}</div>
                </td>
                <td className="cell">
                  <div className="rounded__blue">{item.abertos}</div>
                </td>
                <td className="cell">
                  <div className="rounded__red">{item.atrasados}</div>
                </td>
                <td className="cell">
                  <div className="">
                    <div className="table-icons">
                      <div className="square__blue">
                        <FaEdit />
                      </div>
                      <div className="square__red">
                        <RiDeleteBin6Line />
                      </div>
                      <Link to="/arrearage" state={{ nome: item.nome }}>
                        <button className="">Cobranças</button>
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            );
          } else {
            return (
              <tr className="card__right">
                <td className="cell__nome cell__gray">{item.nome}</td>
                <td className="cell__gray">
                  <div className="rounded">{item.pagos}</div>
                </td>
                <td className="cell__gray">
                  <div className="rounded__blue">{item.abertos}</div>
                </td>
                <td className="cell__gray">
                  <div className="rounded__red">{item.atrasados}</div>
                </td>
                <td className="cell__gray">
                  <div className="table-icons">
                    <div className="square__blue">
                      <FaEdit />
                    </div>
                    <div className="square__red">
                      <RiDeleteBin6Line />
                    </div>
                    <Link to="/arrearage" state={{ nome: item.nome }}>
                      <button className="">Cobranças</button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          }
        })}
      </table>
    </>
  );
}
