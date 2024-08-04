import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import variaveis from "../../variables";
import AlertCustom from "../AlertCustom";

type RegisterFormSchema = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, reset } = useForm<RegisterFormSchema>();
  const [dataForm, setDataForm] = useState<RegisterFormSchema>();
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  function handleSubmitForm(data: RegisterFormSchema) {
    setDataForm(data);
    reset({
      username: "",
      email: "",
      password: "",
    });
  }

  useEffect(() => {
    if (!dataForm) return;
    fetch(`${variaveis.urlBase}user`, {
      ...variaveis.optionsPost,
      body: JSON.stringify(dataForm),
    })
      .then((resp) => {
        messageAlert("Cadastro realizado com sucesso!");
      })
      .catch((err) => messageAlert(err));
  }, [dataForm]);

  function messageAlert(respMsg: string) {
    setMsg(respMsg);
    setTimeout(() => {
      setMsg("");
      navigate(`/`);
    }, 2000);
  }

  return (
    <>
      {msg !== "" ? <AlertCustom message={msg} /> : <></>}
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="content">
          <label className="label">Nome</label>
          <input className="input" type="text" {...register("username")} />

          <label className="label">E-mail</label>
          <input className="input" type="email" {...register("email")} />

          <label className="label">Senha</label>
          <input className="input" type="password" {...register("password")} />
          <div className="actions">
            <button className="btn" type="submit">
              Criar Conta
            </button>
            <Link to="/">
              <button className="btn__outline" type="button">
                Cancelar
              </button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
