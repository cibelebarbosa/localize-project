import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import variaveis from "../../variables";

type RegisterFormSchema = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, reset } = useForm<RegisterFormSchema>();
  const [dataForm, setDataForm] = useState<RegisterFormSchema>();

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
    let options = {
      method: "POST",
      headers: variaveis.headers,
      body: JSON.stringify(dataForm),
    };
    fetch(variaveis.urlBase, options).then((response) => {
      alert("cadastro realizado com sucesso!");
    });
  }, [dataForm]);

  return (
    <>
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
