import { useForm } from "react-hook-form";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import variaveis from "../../variables";
import { useEffect, useState } from "react";
import AlertCustom from "../AlertCustom";

type LoginFormSchema = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormSchema>();
  const [dataForm, setDataForm] = useState<LoginFormSchema>();
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataForm) return;
    fetch(`${variaveis.urlBase}user/login`, {
      ...variaveis.optionsPost,
      body: JSON.stringify(dataForm),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.message) {
          messageAlert(resp.message);
          return;
        }
        navigate(`/client/${resp.user_id}`, {
          state: { user_id: resp.user_id },
        });
      })
      .catch((err) => {
        messageAlert(err);
      });
  }, [dataForm]);

  function handleSubmitForm(data: LoginFormSchema) {
    setDataForm(data);
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

      <form className="form-login" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="content">
          <label className="label">E-mail</label>
          <input className="input" type="text" {...register("email")} />
          <br />

          <label className="label">Senha</label>
          <input className="input" type="text" {...register("password")} />
          <div className="actions">
            <button className="btn" type="submit">
              Entrar
            </button>
          </div>
        </div>
      </form>
      <div>
        <a className="link-register" href="/register">
          Clique aqui para criar uma conta
        </a>
      </div>
    </>
  );
}
