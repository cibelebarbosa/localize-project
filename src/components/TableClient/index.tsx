import React, { useEffect, useState } from "react";
import "./style.scss";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import variaveis from "../../variables";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import AlertCustom from "../AlertCustom";

type tableClientSchema = {
  client_id: number;
  nome: string;
  pago: number;
  abertos: number;
  atrasados: number;
  icons: any;
};

type formClientSchema = {
  client_id: number;
  user_id: number;
  nome: string;
  documento: number;
  telefone: number;
  endereco: number;
  icons: any;
};

export default function TableClient() {
  let { user_id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<formClientSchema>();
  const [dataForm, setDataForm] = useState<formClientSchema>();

  const [toggle, setToggle] = useState<boolean>(false);
  const [tableData, setTableData] = useState<tableClientSchema[]>();
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (!dataForm) return;
    fetch(`${variaveis.urlBase}clientes/cliente`, {
      ...variaveis.optionsPost,
      body: JSON.stringify(dataForm),
    })
      .then((resp) => JSON.stringify(resp))
      .then((resp) => messageAlert("Cadastro realizado com sucesso!"))
      .catch((err) => messageAlert(err));
  }, [dataForm]);

  useEffect(() => {
    fetch(
      `${variaveis.urlBase}clientes/clientes-info-by-user/${user_id}`,
      variaveis.optionsGet
    )
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.message) return console.log(resp.message);
        setTableData(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle, user_id]);

  function handleSubmitForm(data: formClientSchema) {
    if (user_id) data.user_id = Number(user_id);
    setDataForm(data);
  }

  function navigateBtn(client_id: number, nome: string) {
    navigate(`/arrearage/${client_id}`, {
      state: { nome: nome, user_id: user_id, url: `/client/${user_id}` },
    });
  }

  function cancel() {
    navigate("/");
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
        <h1 className="title__table">Clientes</h1>
        <button className="btn__sm btn__cancel" type="button" onClick={cancel}>
          Sair
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
            <label className="label">Nome</label>
            <input className="input" type="text" {...register("nome")} />

            <label className="label">Documento</label>
            <input className="input" type="text" {...register("documento")} />

            <label className="label">Telefone</label>
            <input className="input" type="text" {...register("telefone")} />

            <label className="label">Endereço</label>
            <input className="input" type="text" {...register("endereco")} />
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
            <th className="table_title__nome">Nome</th>
            <th className="table_title">Pagos</th>
            <th className="table_title">Abertos</th>
            <th className="table_title">Atrasados</th>
            <th className="table_title"></th>
          </tr>
        </thead>

        {tableData?.map((item, i) => {
          if (i % 2 === 0) {
            return (
              <tbody key={i}>
                <tr className="card__right">
                  <td className="cell__nome">{item.nome}</td>
                  <td className="cell container">
                    <div className="rounded">{item.pago}</div>
                  </td>
                  <td className="cell">
                    <div className="rounded__blue">{item.abertos}</div>
                  </td>
                  <td className="cell">
                    <div className="rounded__red">{item.atrasados}</div>
                  </td>
                  <td className="cell__icons">
                    <div className="">
                      <div className="table-icons">
                        <div className="square__blue">
                          <FaEdit />
                        </div>
                        <div className="square__red">
                          <RiDeleteBin6Line />
                        </div>
                        <button
                          className="btn__table"
                          onClick={() => {
                            navigateBtn(item.client_id, item.nome);
                          }}
                        >
                          Cobranças
                        </button>
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
                  <td className="cell__nome cell__gray">{item.nome}</td>
                  <td className="cell__gray">
                    <div className="rounded">{item.pago}</div>
                  </td>
                  <td className="cell__gray">
                    <div className="rounded__blue">{item.abertos}</div>
                  </td>
                  <td className="cell__gray">
                    <div className="rounded__red">{item.atrasados}</div>
                  </td>
                  <td className="cell__gray cell__icons">
                    <div className="table-icons">
                      <div className="square__blue">
                        <FaEdit />
                      </div>
                      <div className="square__red">
                        <RiDeleteBin6Line />
                      </div>

                      <button
                        className="btn__table"
                        onClick={() => {
                          navigateBtn(item.client_id, item.nome);
                        }}
                      >
                        Cobranças
                      </button>
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
