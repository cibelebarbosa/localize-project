import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";
import moment from "moment";

type tableClientSchema = {
  descricao: string;
  valor: string;
  vencimento: string;
  icons: any;
};

export default function TableArrearage() {
  let { state } = useLocation();
  const [dateValidation, setDateValidation] = useState<boolean>();
  const tableData: tableClientSchema[] = [
    {
      descricao: "teste1",
      valor: "R$ 12",
      vencimento: "15/12/2024",
      icons: "",
    },
    {
      descricao: "teste1",
      valor: "R$ 12",
      vencimento: "15/12/2024",
      icons: "",
    },
    {
      descricao: "teste1",
      valor: "R$ 12",
      vencimento: "15/12/2024",
      icons: "",
    },
    {
      descricao: "teste1",
      valor: "R$ 12",
      vencimento: "15/12/2024",
      icons: "",
    },
  ];
  useEffect(() => {
    console.log(state?.nome);
    let date1 = new Date();
    let date2 = new Date("06/15/2024");

    setDateValidation(date1 > date2);
  }, []);

  return (
    <>
      <div className="header__table">
        <h1 className="title__table">Cobranças / {state?.nome}</h1>
        <Link to="/client">
          <button className="btn__sm" type="button">
            Cancelar
          </button>
        </Link>
        <button className="btn__sm" type="submit">
          Cadastrar
        </button>
      </div>
      <table className="_table">
        <tr>
          <th className="table_title__nome">Descrição</th>
          <th className="table_title">Valor</th>
          <th className="table_title">Vencimento</th>
          <th className="table_title"></th>
        </tr>

        {tableData.map((item, i) => {
          if (i % 2 === 0) {
            return (
              <tr className="card__right">
                <td className="cell__nome">
                  <div style={{ display: "flex" }}>
                    {item.descricao} {dateValidation ? <div className="alert">Atrasado</div> : ""}
                    
                  </div>
                </td>
                <td className="cell  container">{item.valor}</td>
                <td className="cell">{item.vencimento}</td>
                <td className="cell cell__icons">
                  <div className="table-icons">
                    <div className="square__blue">
                      <FaEdit />
                    </div>
                    <div className="square__red">
                      <RiDeleteBin6Line />
                    </div>
                  </div>
                </td>
              </tr>
            );
          } else {
            return (
              <tr className="card__right">
                <td className="cell__nome cell__gray">{item.descricao}</td>
                <td className="cell__gray">{item.valor}</td>
                <td className="cell__gray ">{item.vencimento}</td>
                <td className="cell__gray cell__icons">
                  <div className="table-icons">
                    <div className="square__blue">
                      <FaEdit />
                    </div>
                    <div className="square__red">
                      <RiDeleteBin6Line />
                    </div>
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
