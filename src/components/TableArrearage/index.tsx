import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import moment from "moment";
import variaveis from "../../variables";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import AlertCustom from "../AlertCustom";

type tableArrearageSchema = {
  cobranca_id: number;
  user_id: number;
  client_id: number;
  descricao: string;
  valor: string;
  data: string;
  pago: boolean;
  icons: any;
};

type formCobrancaSchema = {
  client_id: number;
  user_id: number;
  descricao: string;
  valor: number;
  data: Date;
  pago: string | boolean;
  icons: any;
};

export default function TableArrearage() {
  let { state } = useLocation();
  let { client_id } = useParams();
  const { register, handleSubmit, reset } = useForm<formCobrancaSchema>();
  const [tableData, setTableData] = useState<tableArrearageSchema[]>();
  const [dataForm, setDataForm] = useState<formCobrancaSchema>();
  const [toggle, setToggle] = useState<boolean>(false);
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (!dataForm) return;
    fetch(`${variaveis.urlBase}cobrancas/cobranca`, {
      ...variaveis.optionsPost,
      body: JSON.stringify(dataForm),
    })
      .then((resp) => JSON.stringify(resp))
      .then((resp) => messageAlert("Cadastrado com sucesso!"))
      .catch((err) => messageAlert(err));
  }, [dataForm]);

  useEffect(() => {
    fetch(`${variaveis.urlBase}cobrancas/${client_id}`, variaveis.optionsGet)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.message) return console.log(resp.message);
        setTableData(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle,client_id]);

  function handleSubmitForm(data: formCobrancaSchema) {
    data.client_id = Number(client_id);
    data.user_id = Number(state.user_id);
    data.data = new Date(moment(data.data, "DD/MM/YYYY").format("YYYY-MM-DD"));
    data.valor = Number(data.valor);
    data.pago = data.pago === "true" ? true : false;
    setDataForm(data);
    reset({
      descricao: "",
      valor: undefined,
      data: undefined,
      pago: undefined,
    });
  }

  function cancel() {
    navigate(state.url);
  }

  function dateValidation(date: string, pago: boolean) {
    return moment(new Date(date)).isAfter(new Date()) && !pago;
  }

  function messageAlert(respMsg: string) {
    setMsg(respMsg);
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }

  return (
    <>
      {msg !== "" ? <AlertCustom message={msg} /> : <></>}
      <div className="header__table">
        <h1 className="title__table">Cobranças / {state?.nome}</h1>
        <button className="btn__sm btn__cancel" type="button" onClick={cancel}>
          Cancelar
        </button>
        <button
          onClick={() => setToggle(!toggle)}
          className="btn__sm"
          type="submit"
        >
          Cadastrar
        </button>
      </div>

      <Modal toggle={toggle} title="Cadastrar cliente">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="content">
            <label className="label">Descrição</label>
            <input
              className="input"
              placeholder="Descrição"
              type="text"
              {...register("descricao")}
            />

            <label className="label">Valor</label>
            <input
              className="input"
              placeholder="10.00"
              type="text"
              {...register("valor")}
            />

            <label className="label">Data</label>
            <input
              className="input"
              placeholder="10/10/2010"
              type="text"
              {...register("data")}
            />

            <label className="label">Pago</label>
            <select className="input" {...register("pago")}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>

            <div className="button-wrapper">
              <button className="btn" type="submit">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <table className="_table">
        <thead>
          <tr>
            <th className="table_title__nome">Descrição</th>
            <th className="table_title">Valor</th>
            <th className="table_title">Vencimento</th>
            <th className="table_title"></th>
          </tr>
        </thead>

        {tableData?.map((item, i) => {
          if (i % 2 === 0) {
            return (
              <tbody key={i}>
                <tr className="card__right">
                  <td className="cell__nome">
                    <div className="attention">
                      {item.descricao}{" "}
                      {dateValidation(item.data, item.pago) ? (
                        <div className="alert">Atrasado</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                  <td className="cell  container">R$ {item.valor}</td>
                  <td className="cell">
                    {moment(item.data).format("DD/MM/YYYY")}
                  </td>
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
              </tbody>
            );
          } else {
            return (
              <tbody key={i}>
                <tr className="card__right">
                  <td className="cell__nome cell__gray">
                    <div className="attention">
                      {item.descricao}{" "}
                      {dateValidation(item.data, item.pago) ? (
                        <div className="alert">Atrasado</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                  <td className="cell__gray">R$ {item.valor}</td>
                  <td className="cell__gray ">
                    {moment(item.data).format("DD/MM/YYYY")}
                  </td>
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
              </tbody>
            );
          }
        })}
      </table>
    </>
  );
}
